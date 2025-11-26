import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AccountView.css'
import Button from '../components/Button' 

interface User {
  id: string
  name?: string
  email: string
  career: string
  role: string
  password: string 
}

function AccountView() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId')
      
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      setUser(data)
    }
    
    fetchUser()
  }, [])

  const handleBack = () => {
    window.history.back()
  }
  
  const pageBackgroundColor = '#e6f2e8'; 
  const primaryGreen = '#388e3c';

  return (
    <div 
      className="full-screen-page"
      style={{
        backgroundColor: pageBackgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="account-card"> 
        
        <Button 
          text="✕" 
          onClick={handleBack}
          style={{
            position: 'absolute', 
            top: '15px',
            right: '15px',
            padding: '5px 10px',
            fontSize: '1.2rem',
            backgroundColor: 'transparent',
            color: '#333',
            border: 'none',
          }}
        />
        
        <h1>My Account</h1>
        
        <div className="account-info">
          <p><strong>Name:</strong> {user?.name || 'Not set'}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Career:</strong> {user?.career}</p>
        </div>
      </div>
    </div>
  )
}

export default AccountView