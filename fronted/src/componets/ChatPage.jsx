import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdAttachFile, MdSend } from 'react-icons/md';
 
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { baseURL } from '../config/AxiosHelper';
import useChatContext from '../context/chatContext';
import { getmessages } from '../servcies/RoomService';
import timeAgo from '../config/helper';
import { useNavigate } from 'react-router';

const ChatPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    


    const { roomId, connected, setConnected, currentUser } = useChatContext();
    const messagesEndRef = useRef(null);

    // WebSocket connection setup
    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new SockJS(`${baseURL}/chat`);
            const client = over(socket);
            client.debug = null;

            client.connect({}, () => {
                setConnected(true);
                setStompClient(client);

                if (currentUser) {
                    // Notify server about user joining
                    client.send(
                        `/app/userstatus/${roomId}`,
                        {},
                        JSON.stringify({ user: currentUser, action: 'JOIN' })
                    );
                }

                // Subscribe to room messages
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                });

                // Subscribe to user status updates
                client.subscribe(`/topic/userstatus/${roomId}`, (message) => {
                    const statusUpdate = JSON.parse(message.body);
                    if (statusUpdate.user !== currentUser && statusUpdate.user) {
                        if (statusUpdate.action === 'JOIN') {
                            toast.success(`${statusUpdate.user} joined the room`);
                        } else if (statusUpdate.action === 'LEAVE') {
                            toast.error(`${statusUpdate.user} left the room`);
                        }
                    }
                });
            });

            client.onclose = () => {
                toast.error('WebSocket disconnected');
                setConnected(false);
            };
        };

        connectWebSocket();

        return () => {
            if (stompClient) {
                if (currentUser) {
                    stompClient.send(
                        `/app/userstatus/${roomId}`,
                        {},
                        JSON.stringify({ user: currentUser, action: 'LEAVE' })
                    );
                }
                stompClient.disconnect();
            }
        };
    }, [roomId]);

    // Ensure user is connected or redirect to home
    useEffect(() => {
        if (!connected) {
            navigate('/');
        }
    }, [connected]);

    // Fetch chat history
    useEffect(() => {
        async function loadMessages() {
            try {
                const loadedMessages = await getmessages(roomId);
                setMessages(loadedMessages);
            } catch (error) {
                toast.error(error?.response?.data || 'Failed to load messages');
            }
        }
        loadMessages();
    }, [roomId]);

    // Scroll to the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && messageInput.trim()) {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (messageInput.trim() && stompClient) {
            const message = {
                sender: currentUser,
                content: messageInput.trim(),
                roomId,
            };
            stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
            setMessageInput('');
        }
    };

    const leaveRoom = () => {
        if (stompClient && currentUser) {
            stompClient.send(
                `/app/userstatus/${roomId}`,
                {},
                JSON.stringify({ user: currentUser, action: 'LEAVE' })
            );
        }
        navigate('/');
    };

    // Notify server on page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (stompClient && currentUser) {
                stompClient.send(
                    `/app/userstatus/${roomId}`,
                    {},
                    JSON.stringify({ user: currentUser, action: 'LEAVE' })
                );
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [stompClient, roomId, currentUser]);

    return (
        <div>
            {/* Header */}
            <header className="flex fixed w-full h-[3rem] justify-around items-center dark:bg-gray-900 shadow py-5">
                <div>
                    <h1 className="text-xl font-semibold">
                        Room: <span>{roomId || 'Random'}</span>
                    </h1>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">
                        User: <span>{currentUser || 'Guest'}</span>
                    </h1>
                </div>
                <div>
                    <button
                        onClick={leaveRoom}
                        className="dark:bg-red-500 dark:hover:bg-red-700 px-[.5rem] m-2 font-semibold py-[.2rem] rounded-full"
                    >
                        Leave Room
                    </button>
                </div>
            </header>

            {/* Chat Messages */}
            <main className="messages-container h-screen pt-[3.5rem] pb-[3.5rem] overflow-y-auto dark:bg-slate-800 mx-auto w-2/3">
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={`my-2 mx-1 px-3 flex ${
                            message.sender === currentUser ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div className="flex flex-row gap-2">
                            {message.sender !== currentUser && (
                                <img
                                    className="h-9 w-9"
                                    src={`https://avatar.iran.liara.run/username?username=${message.sender}&bold=false&length=1`}
                                    alt="User Avatar"
                                />
                            )}
                            <div
                                className={`${
                                    message.sender === currentUser
                                        ? 'bg-[#004f8086]'
                                        : 'bg-gray-500'
                                } rounded p-2 flex flex-col gap-1`}
                            >
                                <p className="text-sm font-bold">{message.sender}</p>
                                <p>{message.content}</p>
                                <p className="text-[0.5rem] text-[#000000b7]">
                                    {timeAgo(message.timeStamp)}
                                </p>
                            </div>
                            {message.sender === currentUser && (
                                <img
                                    className="h-9 w-9"
                                    src={`https://avatar.iran.liara.run/username?username=${message.sender}&bold=false&length=1`}
                                    alt="User Avatar"
                                />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            {/* Message Input */}
            <div className="fixed bottom-0 dark:bg-transparent w-full h-[3.2rem]">
                <div className="h-full px-1 gap-2 w-2/3 flex items-center justify-between mx-auto dark:bg-slate-800">
                    <input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        type="text"
                        placeholder="Type your message here..."
                        className="dark:bg-gray-900 px-5 py-2 h-[2.5rem] w-full focus:outline-none focus:ring-1 focus:ring-gray-700 shadow rounded-full"
                    />
                    <button className="dark:bg-purple-500 px-3 py-2 h-10 w-10 rounded-full">
                        <MdAttachFile size={20} />
                    </button>
                    <button
                        className="dark:bg-green-600 px-3 py-2 h-10 w-10 rounded-full"
                        onClick={sendMessage}
                    >
                        <MdSend size={20} />
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ChatPage;
