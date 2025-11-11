import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { supabase } from '../supabaseClient'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState<'mentor' | 'mentee' | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        setError('')

        if (!email || !password || !selectedRole) {
            setError('Please fill in all fields and select a role')
            alert('Please fill in all fields and select a role')
            return
        }

        setLoading(true)

        try {
            const { data, error: queryError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password', password)
                .eq('role', selectedRole)
                .single()

            if (queryError || !data) {
                console.error('Login error:', queryError)
                setError('Invalid email, password, or role')
                alert('Invalid email, password, or role')
                setLoading(false)
                return
            }

            console.log('Login successful:', data)
            
            localStorage.setItem('userId', data.id)
            localStorage.setItem('userRole', data.role)
            localStorage.setItem('userEmail', data.email)

            if (selectedRole === 'mentor') {
                navigate('/mentor-home')
            } else if (selectedRole === 'mentee') {
                navigate('/mentee-home')
            }
        } catch (err) {
            console.error('Unexpected error:', err)
            setError('An unexpected error occurred')
            alert('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }
    
    const handleCreateAccount = () => {
        navigate('/create-profile') 
    }

    return (
        <div className="login-page"> 
            <Button text="Mentor" onClick={() => setSelectedRole('mentor')}></Button>
            <Button text="Mentee" onClick={() => setSelectedRole('mentee')}></Button>
            
            <h1>MentorConnect</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <br />
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            <br />
            <Button 
                text={loading ? "Logging in..." : "Login"} 
                onClick={handleLogin}
            />
            <br />
            <Button 
                text="Create Account" 
                onClick={handleCreateAccount}
            />
        </div>
    )
}

export default Login