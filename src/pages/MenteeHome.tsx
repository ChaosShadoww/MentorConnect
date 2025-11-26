import { useEffect, useState } from 'react'
import BoxesBar from '../components/BoxesBar'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ActiveChatsList from '../components/ActiveChatsList'

function MenteeHome() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      navigate('/')
      return
    }
    setUserId(storedUserId)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate('/')
  }
   
  const handleAccount = () => {
    navigate('/view-account')
  }

  if (!userId) {
    return <div>Loading...</div>
  }

  return (
    <div style={{backgroundColor: '#82c293'}}className="full-screen-page">
      <header className="header">
        <h1 style={{color: 'white',backgroundColor: 'green', fontFamily: 'Sans'}}>Mentee HomePage</h1>
      </header>
      
      <Button text="My Account" onClick={handleAccount} />
      <Button text="Logout" onClick={handleLogout} />

      <div id="Bar-Section" style={{ padding: '0 16px', marginTop: '30px' }}>
        <h2>Mentors</h2>
        <BoxesBar onCardClick={(m) => console.log('Clicked on:', m.name)} />
      </div>

      <div id="Chat-Section" style={{ marginTop: '30px' }}>
        <h2>Active Chats</h2>
        <ActiveChatsList currentUserId={userId} userRole="mentee" />
      </div>
    </div>
  )
}

export default MenteeHome
