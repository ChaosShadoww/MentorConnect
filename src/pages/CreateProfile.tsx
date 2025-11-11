import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function CreateProfile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee' | null>(null)
  const [career, setCareer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

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
        .single()

      if (existingUser) {
        alert('Email already exists. Please use a different email or login.')
        setLoading(false)
        return
      }

      // Insert new user into database
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([
          {
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

  return (
    <div className="createProfile-page">
      <Button text="Mentor" onClick={() => setSelectedRole('mentor')}></Button>
      <Button text="Mentee" onClick={() => setSelectedRole('mentee')}></Button>
      
      <h1>Create MentorConnect Profile</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
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
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input 
        id="confirmPass"
        type="password" 
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br/>
      <input 
        id="career"
        type="text" 
        placeholder="Your Career/Major"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
      />
      <br/>
      <Button 
        text={loading ? "Creating Account..." : "Create Account"} 
        onClick={handleSubmit}
      />
    </div>
  )
}

export default CreateProfile