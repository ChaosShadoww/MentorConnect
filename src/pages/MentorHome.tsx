import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'


function MentorHome() {
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
      <h1>Mentor HomePage</h1>
    </header>
    <Button text="My Account" onClick={handleAccount} />

    <Button text="Logout" onClick={handleLogout} />
    

    <div id="Chat-Section">
      <h2>Chats: </h2>
      <h3>Active Chats</h3>
    </div>
  </div>
  )
}

export default MentorHome