import React from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import ChatBox from '../components/ChatBox'

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const location = useLocation()
  // try to get current user from navigation state; fallback to auth or empty string
  const currentUserId = (location.state as any)?.currentUserId ?? 'fallback-user-id'

  if (!chatId) return <Navigate to="/" replace />

  return <ChatBox chatId={chatId} currentUserId={currentUserId} />
}