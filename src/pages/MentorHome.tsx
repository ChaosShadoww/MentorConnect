import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import ActiveChatsList from '../components/ActiveChatsList'

function MentorHome() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // Get the logged-in mentor's user ID
    const storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      // If no user ID, redirect to login
      navigate('/')
      return
    }
    setUserId(storedUserId)
  }, [navigate])

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  const handleAccount = () => {
    navigate('/view-account')
  }

  // Don't render until we have the userId
  if (!userId) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <header className="header">
        <h1>Mentor HomePage</h1>
      </header>
      
      <Button text="My Account" onClick={handleAccount} />
      <Button text="Logout" onClick={handleLogout} />

      <div id="Chat-Section" style={{ marginTop: '30px' }}>
        <h2>Active Chats</h2>
        <ActiveChatsList currentUserId={userId} userRole="mentor" />
      </div>
    </div>
  )
}

export default MentorHome
