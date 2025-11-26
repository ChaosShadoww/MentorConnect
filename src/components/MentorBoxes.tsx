import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export type Mentor = {
  name: string;
  title?: string;
  id?: string;
};

type Props = {
  mentor: Mentor;
  onClick?: (mentor: Mentor) => void
};

export default function MentorBoxes({ mentor, onClick}: Props) {

  const navigate = useNavigate()

  const handleClick = () => {
    if(onClick){
      onClick(mentor);
    }
    
    const currentUserId = localStorage.getItem('userId');
    
    if (!currentUserId) {
      alert('Please log in to start a chat');
      return;
    }
    
    if (!mentor.id) {
      alert('Cannot start chat: Mentor ID is missing');
      return;
    }


    navigate(`/chat/${mentor.id}`, { 
      state: { currentUserId } 
    });
  }

  const handleProfile = () => {
    if (mentor.id) {
      navigate(`/mentor-profile/${mentor.id}`)
    } else {
      console.error('Mentor ID is missing')
      alert('Cannot view profile: Mentor ID is missing')
    }
  }

  return (
    <div className="mentor-box">
      {}
      
      {}
      <div className="avatar-placeholder">
        {mentor.name.substring(0, 1)}
      </div>

      {}
      <div className="mentor-info">
        <h3 className="mentor-name">{mentor.name}</h3>
        <p className="mentor-title">{mentor.title || 'No Title'}</p>
      </div>

      {}
      <div className="mentor-actions">
        {}
        <Button 
          text="Start Chat" 
          onClick={handleClick} 
          style={{ 
            backgroundColor: '#388e3c', 
            color: 'white', 
            border: 'none', 
          }}
        />
        {}
        <Button 
          text="Profile" 
          onClick={handleProfile} 
          style={{ 
            backgroundColor: 'transparent', 
            color: '#388e3c', 
            border: '1px solid #388e3c',
          }} 
        />
      </div>
    </div>
  )
}