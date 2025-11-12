//import React from 'react';
import BoxesBar from '../components/BoxesBar';
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function MenteeHome() {
  
  const navigate = useNavigate()

  const handleLogout = async () => {
      navigate('/')
  }
   
  const handleAccount = async () => {
    navigate('/view-account')
  }

  return (
  <div>
    <header className="header">
      <h1>Mentee HomePage</h1>
    </header>
    
    <Button text="My Account" onClick={handleAccount} />
    <Button text="Logout" onClick={handleLogout} />
    

    <div id="Bar-Section" style={{ padding: '0 16px' }}>
        <h2> Mentors </h2>
        <BoxesBar onCardClick={(m) => console.log('Clicked on:', m.name)} />
    </div>

    <div id="Chat-Section">
      <h2>Chats: </h2>
      <h3>Active Chats</h3>

    </div>
  </div>
  )
}

export default MenteeHome
