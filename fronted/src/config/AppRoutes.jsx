import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../componets/ChatPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}  />
      <Route path="/chat" element={<ChatPage />}  />
      {/* <Route path="/" element={<App />}  /> */}
    </Routes>
  )
}

export default AppRoutes