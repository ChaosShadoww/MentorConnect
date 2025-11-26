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
      {}
      <header className="header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px', 
        backgroundColor: 'green'
      }}>
        <h1 style={{color: 'white', fontFamily: 'Sans', margin: 0}}>
          Mentee HomePage
        </h1>
        
        {}
        <div style={{display: 'flex', gap: '10px'}}>
          {}
          <Button 
            text="My Account" 
            onClick={handleAccount} 
            style={{ 
              backgroundColor: 'transparent', 
              color: 'white', 
              border: '1px solid white', 
              padding: '8px 16px' 
            }} 
          />
          <Button 
            text="Logout" 
            onClick={handleLogout} 
            style={{ 
              backgroundColor: '#d9534f', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px'
            }} 
          />
        </div>
      </header>
      
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