// chatpage.tsx
import React from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import ChatBox from '../components/ChatBox'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'


export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const currentUserId = (location.state as any)?.currentUserId ?? 'fallback-user-id'

  if (!chatId) return <Navigate to="/" replace />

  const handleBack = () => {
    navigate(-1) 
  }

  // Define the primary color for buttons (coordinating green)
  const primaryGreen = '#388e3c'; 
  
  return ( 
    <div 
      className="full-screen-page chat-page-wrapper" 
      style={{backgroundColor: '#97dfaaff'}}
    > 
      <div className="chat-content-container"> {/* Container for the chat box and header */}
        
        <header className="chat-header">
          <h2 style={{color: '#333', margin: 0}}>Chat with Mentor/Mentee</h2>
          <Button 
            text="Exit Chat" 
            onClick={handleBack}
            // Modern, clean styling for the exit button
            style={{
              backgroundColor: primaryGreen, 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px'
            }}
          />
        </header>
        
        <ChatBox chatId={chatId} currentUserId={currentUserId} /> 
      </div>
    </div>
  )
}