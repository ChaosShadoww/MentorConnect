import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './MentorProfileView.css'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'


interface Mentor {
  id: string
  name?: string
  email: string
  career: string
  role: string
}

function MentorProfileView() {
  const { mentorId } = useParams<{ mentorId: string }>()
  const [mentor, setMentor] = useState<Mentor | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMentor = async () => {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', mentorId)
        .eq('role', 'mentor')
        .single()

      setMentor(data)
    }
    
    fetchMentor()
  }, [mentorId])

  const handleBack = () => {
    navigate(-1) 
  }



  return (
    <div 
      className="full-screen-page"
      style={{
        backgroundColor: '#82c293',
        display: 'flex',            
        justifyContent: 'center',  
        alignItems: 'center',       
      }}
    >
      <div className="mentor-profile-card"> {}
        
        {}
        <Button 
          text="x" 
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
        
        <h1>Mentor Profile</h1>
        
        <div className="profile-info">
          <p><strong>Name:</strong> {mentor?.name || 'Not set'}</p>
          <p><strong>Email:</strong> {mentor?.email}</p>
          <p><strong>Career:</strong> {mentor?.career}</p>
        </div>

       
      </div>
    </div>
  )
}

export default MentorProfileView