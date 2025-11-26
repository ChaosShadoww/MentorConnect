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
    
    
    // --- Styles for Tab Switching (Rounds the buttons) ---
    const baseButtonStyle = {
        borderRadius: '10px', // Apply rounding to buttons
        margin: '5px',
    };

    const selectedStyle = {
        ...baseButtonStyle,
        backgroundColor: 'white',
        color: 'green',
        border: '2px solid green',
        fontWeight: 'bold',
    };
    
    // Explicitly setting unselected style for robustness
    const unselectedStyle = { 
        ...baseButtonStyle,
        backgroundColor: '#1a1a1a', 
        color: 'rgba(255, 255, 255, 0.87)', 
    };

    // --- Rounded Input Style ---
    const inputStyle = {
        width: "350px", 
        height: "16px",
        borderRadius: '8px', // Added: Rounded corners for inputs
        padding: '10px',     // Added: Padding for a better look
        margin: '5px 0',     // Added: Vertical spacing
    }
    // --- End Styles ---


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
        <div 
            style={{backgroundColor: '#82c293'}}
            className="login-page full-screen-page" // Added full-screen-page for full background coverage
        > 

            {/* Added borderRadius to h1 for a rounded header look */}
            <h1 style={{
                color: 'white',
                backgroundColor: 'green', 
                fontFamily: 'Sans', 
                borderRadius: '15px', 
                padding: '10px'
            }}>
                MentorConnect
            </h1>

            <h5>Please select a role before logging in : </h5>

            {/* Buttons with conditional style and correct syntax */}
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
             <br/>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Inputs using the new rounded inputStyle */}
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
                type="password" 
                placeholder="Password" 
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            <br />
            <br/ >
            <Button 
                text={loading ? "Logging in..." : "Login"} 
                onClick={handleLogin}
            />
            
            <Button 
                text="Create Account" 
                onClick={handleCreateAccount}
            />
        </div>
    )
}

export default Login