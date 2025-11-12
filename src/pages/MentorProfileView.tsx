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
    navigate(-1) // Goes back one page in history
  }

  return (
    <div className="mentor-profile-page">
      <Button text="x" onClick={handleBack}></Button>
      
      <h1>Mentor Profile</h1>
      
      <div className="profile-info">
        <p><strong>Name:</strong> {mentor?.name || 'Not set'}</p>
        <p><strong>Email:</strong> {mentor?.email}</p>
        <p><strong>Career:</strong> {mentor?.career}</p>
      </div>
    </div>
  )
}

export default MentorProfileView