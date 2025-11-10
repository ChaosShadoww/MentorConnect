import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate  } from 'react-router-dom'


function CreateProfile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee' | null>(null)
  const [career, setCareer] = useState('')
  const navigate = useNavigate() 

  const handleSubmit = () =>{

    if(password === confirmPassword && password.length >= 8 && password !== "" && confirmPassword !== "" && email !== "" && career !== ""){
      if (selectedRole === 'mentor') {
          //sent to table for mentor
        } else if ( selectedRole === 'mentee') {
          //sent to table for mentor
        }
        console.log('Profile created!')
        navigate('/')
    }else{
      if(password.length < 8){ alert('Passwords is less than 8 digits'); console.log('Passwords is less than 8 digits');}
      if(password !== confirmPassword){ alert('Passwords do not match'); console.log('Passwords do not match');}
      if(career === ""){ alert('Please enter your Career/Major'); console.log('Please enter your Career/Major');}
      if(email === "" ){ alert('Please enter an email'); console.log('Please enter an email');}
    }
  }

  return (
    <div className="createProfile-page">
    <Button text="Mentor" onClick={() => setSelectedRole('mentor')}></Button>
    <Button text="Mentee" onClick={() => setSelectedRole('mentee')}></Button>
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
      <input 
        id="career"
        type="career" 
        placeholder="Your Career/Major"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
      />
      <br/>
      <Button text="Create Account" onClick={handleSubmit}></Button>
    </div>
  )
}

export default CreateProfile