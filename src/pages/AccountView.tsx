import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AccountView.css'

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

  return (
    <div className="account-page">
      <button className="close-btn" onClick={handleBack}>✕</button>
      
      <h1>Account</h1>
      
      <p><strong>Name:</strong> {user?.name || 'Not set'}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Career:</strong> {user?.career}</p>

      
    </div>
  )
}

export default AccountView