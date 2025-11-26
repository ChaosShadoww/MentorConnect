import React from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import ChatBox from '../components/ChatBox'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'



export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  // try to get current user from navigation state; fallback to auth or empty string
  const currentUserId = (location.state as any)?.currentUserId ?? 'fallback-user-id'

  if (!chatId) return <Navigate to="/" replace />

  const handleBack = () => {
    navigate(-1) // Goes back one page in history
  }

  return ( 
    <div style={{backgroundColor: '#d7d0f8ff'}}className="full-screen-page"> 
      <Button text="Exit Chat" onClick={handleBack}></Button>
      <ChatBox chatId={chatId} currentUserId={currentUserId} /> 
    </div>
    
  )
}