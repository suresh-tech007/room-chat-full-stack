import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router'
import AppRoutes from './config/AppRoutes.jsx'
import { ChatProvider } from './context/chatContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </BrowserRouter>
  
)
