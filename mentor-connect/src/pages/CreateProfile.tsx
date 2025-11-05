import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate  } from 'react-router-dom'


function CreateProfile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() 

  const handleSubmit = () =>{
    console.log('Profile created!')
    navigate('/')
  }

  return (
    <div className="createProfile-page">
    <Button text="Mentor" onClick={() => console.log('Mentor Selecter')}></Button>
    <Button text="Mentee" onClick={() => console.log('Mentee Selected')}></Button>
      <h1>Create MentorConnect Profile</h1>
      <input 
        type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button text="Create Account" onClick={handleSubmit}></Button>
    </div>
  )
}

export default CreateProfile