import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function CreateProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee' | null>(null)
  const [career, setCareer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const inputStyle = {
    width: "350px", 
    height: "16px",
    borderRadius: '8px', 
    padding: '10px',     
    margin: '5px 0',     
    textAlign: 'center' as const, 
  }
  
  const baseButtonStyle = {
    borderRadius: '10px',
    margin: '5px',
  };

  const selectedStyle = {
    ...baseButtonStyle,
    backgroundColor: 'white',
    color: 'green',
    border: '2px solid green',
    fontWeight: 'bold',
  };
  
  const unselectedStyle = { 
    ...baseButtonStyle,
    backgroundColor: '#1a1a1a', 
    color: 'rgba(255, 255, 255, 0.87)', 
  };
  


  const handleSubmit = async () => {
    setError('')

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      console.log('Passwords do not match')
      return
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
      console.log('Password is less than 8 digits')
      return
    }
    if (!name) {
      alert('Please enter your name')
      console.log('Please enter your name')
      return
    }
    if (!email) {
      alert('Please enter an email')
      console.log('Please enter an email')
      return
    }
    if (!career) {
      alert('Please enter your Career/Major')
      console.log('Please enter your Career/Major')
      return
    }
    if (!selectedRole) {
      alert('Please select Mentor or Mentee')
      console.log('Please select a role')
      return
    }

    setLoading(true)

    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle() 

      if (existingUser) {
        alert('Email already exists. Please use a different email or login.')
        setLoading(false)
        return
      }

      
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            name: name,
            email: email,
            password: password,
            role: selectedRole,
            career: career
          }
        ])
        .select()

      if (insertError) {
        console.error('Error creating profile:', insertError)
        alert('Error creating profile: ' + insertError.message)
        setLoading(false)
        return
      }

      console.log('Profile created successfully:', data)
      alert('Account created successfully!')
      
      navigate('/') 
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate(-1) 
  }

  return (
    <div 
      style={{backgroundColor: '#82c293'}}
      className="createProfile-page full-screen-page"
    >
      <h1 style={{
        color: 'white',
        backgroundColor: 'green', 
        fontFamily: 'Sans', 
        borderRadius: '15px', 
        padding: '10px'
      }}>
        Create MentorConnect Profile
      </h1>

      <h5>Please select a role to create an account:</h5>

      <Button 
        text="Mentor" 
        onClick={() => setSelectedRole('mentor')}
        style={selectedRole === 'mentor' ? selectedStyle : unselectedStyle}
      />
      <Button 
        text="Mentee" 
        onClick={() => setSelectedRole('mentee')}
        style={selectedRole === 'mentee' ? selectedStyle : unselectedStyle} 
      />
      
      <br/>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <input 
        id="name"
        type="name" 
        placeholder="Name" 
        style={inputStyle}
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <br />
      <input 
        type="email" 
        placeholder="Email" 
        style={inputStyle}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <br />
      <input 
        id="firstPass"
        type="password" 
        placeholder="Password (min 8 characters)"
        style={inputStyle}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <br />
      <input 
        id="confirmPass"
        type="password" 
        placeholder="Confirm Password" 
        style={inputStyle}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={loading}
      />
      <br/>
      <input 
        id="career"
        type="text" 
        placeholder="Your Career/Major" 
        style={inputStyle}
        value={career}
        onChange={(e) => setCareer(e.target.value)}
        disabled={loading}
      />
      <br/>
      <Button 
        text={loading ? "Creating Account..." : "Create Account"} 
        onClick={handleSubmit}
        disabled={loading}
      />
      <br/>
      <Button
        text="Cancel" 
        onClick={handleBack}
        disabled={loading}
      />
    </div>
  )
}

export default CreateProfile