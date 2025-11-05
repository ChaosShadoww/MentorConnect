import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate() 

    const handleLogin = () => {
        console.log('Email:', email)
        console.log('Password:', password)
    }
    
    const handleCreateAccount = () => {
        navigate('/create-profile') 
    }

    return (
    <div className="login-page"> 
    <Button text="Mentor" onClick={() => console.log('Mentor clicked')}></Button>
    <Button text="Mentee" onClick={() => console.log('Mentee clicked')}></Button>
      
      <h1>MentorConnect</h1>
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
      <Button text="Login" onClick={handleLogin}></Button>
      <br />
      <Button text="Create Account" onClick={handleCreateAccount}></Button>
    </div>
  )
}

export default Login