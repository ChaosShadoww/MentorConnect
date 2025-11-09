import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate  } from 'react-router-dom'


function CreateProfile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee' | null>(null)
  const navigate = useNavigate() 

  const handleSubmit = () =>{
    if(password === confirmPassword && password !== "" && confirmPassword !== ""){
      if (selectedRole === 'mentor') {
          //sent to table for mentor
        } else if ( selectedRole === 'mentee') {
          //sent to table for mentor
        }
        console.log('Profile created!')
        navigate('/')
    }else{
      console.log('Passwords do not match')
    }
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
        id="firstPass"
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input 
        id="confirmPass"
        type="password" 
        placeholder="Confrim Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br/>
      <Button text="Create Account" onClick={handleSubmit}></Button>
    </div>
  )
}

export default CreateProfile