import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export type Mentor = {
  name: string;
  title?: string;
  id?: string;
};

/**
 *  careerFields: String[]
+location: String
+experience: Number
+bio: String

 */



type Props = {
  mentor: Mentor;
  onClick?: (mentor: Mentor) => void
};

export default function MentorBoxes({ mentor, onClick}: Props) {

  const navigate = useNavigate()

  const handleClick = () => {
    if(onClick){
      onClick(mentor);
        // If mentor.id exists, use it as the chat id
      const chatId = mentor.id ?? `mentor-${mentor.name.replace(/\s+/g, '-')}`;

      // Try to read current user id from localStorage (or replace with your auth)
      const currentUserId = localStorage.getItem('currentUserId') ?? 'unknown-user';
      navigate(`/chat/${chatId}`, { state: { currentUserId } });

    }
  }
  return (
    <div className="mentor-box">
      <h3 className="mentor-name">{mentor.name}</h3>
      <p className="mentor-career">{mentor.title}</p>
      <Button text="Start Chat" onClick={handleClick}></Button>
    </div>
  )
}

