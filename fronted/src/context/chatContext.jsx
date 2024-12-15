import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext();
export const ChatProvider = ({children}) => {
    const [roomId, setRoomId] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const [connected, setConnected] = useState("")
  return (
    <ChatContext.Provider value={{roomId,setRoomId,connected, setConnected,currentUser,setCurrentUser}}>{children}</ChatContext.Provider>
  )
}
const  useChatContext = ()=>useContext(ChatContext)
 export default useChatContext;