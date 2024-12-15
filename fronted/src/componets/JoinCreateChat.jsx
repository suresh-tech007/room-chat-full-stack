import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createRoomreq, joinRoomreq } from '../servcies/RoomService';
import useChatContext from '../context/chatContext';
import { useNavigate } from 'react-router';
import Load from './Load';

const JoinCreateChat = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState();
  const [details, setDetails] = useState({
    roomId: '',
    userName: '',
    password: '',
  });

  const { setRoomId, setConnected, setCurrentUser } = useChatContext();
  

  const handleFormInputChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    if (!details.roomId || !details.userName || !details.password) {
      toast.error('Invalid Input !!');
      return false;
    }
    return true;
  };

  const joinChat = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const roomdata = {
          roomId: details.roomId,
          password: details.password,
        };
        setLoading(true);
        await joinRoomreq(roomdata);
        toast.success('Room joined!');
        setCurrentUser(details.userName);
        setRoomId(details.roomId);
        setConnected(true);
        setLoading(false);
        navigate('/chat');
      } catch (error) {
        setLoading(false)
        toast.error(error?.response?.data || 'An error occurred');
      }
    }
  };

  const createRoom = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const roomdata = {
          roomId: details.roomId,
          password: details.password,
        };
        setLoading(true)
        await createRoomreq(roomdata);
        toast.success('Room created successfully!');
        setCurrentUser(details.userName);
        setRoomId(details.roomId);
        setConnected(true);
        setLoading(false)
        navigate('/chat');
      } catch (error) {
        setLoading(false)
        toast.error(error?.response?.data || 'An error occurred');
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {loading && <Load />}
      <div className='p-10 border border-gray-800 w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow'>
        <h1 className='text-2xl font-semibold text-center'>
          Join Room / Create Room
        </h1>
        <form onSubmit={joinChat} className=' flex flex-col shadow-lg  gap-4'>
          <div>
            <label htmlFor='userName' className='block font-medium mb-2'>
              Your name
            </label>
            <input
              onChange={handleFormInputChange}
              placeholder='Enter the name'
              type='text'
              id='userName'
              name='userName'
               
              value={details.userName}
              className='w-full autofill:bg-transparent dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label htmlFor='roomid' className='block font-medium mb-2'>
              Room ID / New Room ID
            </label>
            <input
              type='text'
              onChange={handleFormInputChange}
              placeholder='Enter the RoomId'
              id='roomid'
              name='roomId'
              value={details.roomId}
              className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label htmlFor='password' className='block font-medium mb-2'>
              Enter Room Password
            </label>
            <input
              type='password'
              onChange={handleFormInputChange}
              placeholder='Enter the Password'
              id='password'
              name='password'
              value={details.password}
              className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <button
              type='submit'
              className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full'>
              Join Room
            </button>
            <button
              type='button'
              onClick={createRoom}
              className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full'>
              Create Room
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default JoinCreateChat;
