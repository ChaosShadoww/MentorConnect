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
    
    // Get the logged-in user's ID from localStorage
    const currentUserId = localStorage.getItem('userId');
    
    if (!currentUserId) {
      alert('Please log in to start a chat');
      return;
    }
    
    if (!mentor.id) {
      alert('Cannot start chat: Mentor ID is missing');
      return;
    }

    // Navigate to chat page with mentor's ID as chatId
    // The ChatBox component will use this to identify the mentor
    navigate(`/chat/${mentor.id}`, { 
      state: { currentUserId } 
    });
  }

  const handleProfile = () => {
    // Pass the mentor ID in the URL
    if (mentor.id) {
      navigate(`/mentor-profile/${mentor.id}`)
    } else {
      console.error('Mentor ID is missing')
      alert('Cannot view profile: Mentor ID is missing')
    }
  }

  return (
    <div className="mentor-box">
      <h3 className="mentor-name">{mentor.name}</h3>
      <p className="mentor-career">{mentor.title}</p>
      <Button text="Start Chat" onClick={handleClick}></Button>
      <Button text="Profile" onClick={handleProfile}></Button>
    </div>
  )
}
