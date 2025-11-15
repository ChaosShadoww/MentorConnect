import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ActiveChatsList.css';

interface ChatRecord {
  id: string;
  mentor_id: string;
  mentee_id: string;
  created_at: string;
  updated_at: string;
}

interface UserRecord {
  id: string;
  name: string;
  career: string;
}

interface ChatWithUser {
  chatId: string;
  otherUserId: string;
  otherUserName: string;
  otherUserCareer: string;
  lastUpdated: Date;
}

interface ActiveChatsListProps {
  currentUserId: string;
  userRole: 'mentor' | 'mentee';
}

export default function ActiveChatsList({ currentUserId, userRole }: ActiveChatsListProps) {
  const [chats, setChats] = useState<ChatWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadActiveChats();
  }, [currentUserId, userRole]);

  const loadActiveChats = async () => {
    try {
      setLoading(true);

      const { data: chatsData, error: chatsError } = await supabase
        .from('chats')
        .select('*')
        .or(`mentor_id.eq.${currentUserId},mentee_id.eq.${currentUserId}`)
        .order('updated_at', { ascending: false });

      if (chatsError) {
        console.error('Error loading chats:', chatsError);
        setLoading(false);
        return;
      }

      if (!chatsData || chatsData.length === 0) {
        setChats([]);
        setLoading(false);
        return;
      }

      const typedChats = chatsData as ChatRecord[];

      const otherUserIds = typedChats.map(chat => 
        chat.mentor_id === currentUserId ? chat.mentee_id : chat.mentor_id
      );

      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name, career')
        .in('id', otherUserIds);

      if (usersError) {
        console.error('Error loading users:', usersError);
        setLoading(false);
        return;
      }

      const typedUsers = usersData as UserRecord[];
      const userMap = new Map(typedUsers.map(user => [user.id, user]));

      const chatsWithUsers: ChatWithUser[] = typedChats.map(chat => {
        const otherUserId = chat.mentor_id === currentUserId 
          ? chat.mentee_id 
          : chat.mentor_id;
        
        const otherUser = userMap.get(otherUserId);

        return {
          chatId: chat.id,
          otherUserId: otherUserId,
          otherUserName: otherUser?.name || 'Unknown User',
          otherUserCareer: otherUser?.career || '',
          lastUpdated: new Date(chat.updated_at),
        };
      });

      setChats(chatsWithUsers);
      setLoading(false);
    } catch (err) {
      console.error('Unexpected error loading chats:', err);
      setLoading(false);
    }
  };

  const handleChatClick = (chat: ChatWithUser) => {
    navigate(`/chat/${chat.otherUserId}`, {
      state: { currentUserId }
    });
  };

  if (loading) {
    return (
      <div className="active-chats-container">
        <p>Loading chats...</p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="active-chats-container">
        <p className="no-chats-message">
          {userRole === 'mentor' 
            ? 'No mentees have messaged you yet.' 
            : 'You haven\'t started any conversations yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="active-chats-container">
      <div className="chats-list">
        {chats.map(chat => (
          <div 
            key={chat.chatId} 
            className="chat-item"
            onClick={() => handleChatClick(chat)}
          >
            <div className="chat-avatar">
              {chat.otherUserName.charAt(0).toUpperCase()}
            </div>
            <div className="chat-info">
              <h4 className="chat-name">{chat.otherUserName}</h4>
              <p className="chat-career">{chat.otherUserCareer}</p>
            </div>
            <div className="chat-meta">
              <span className="chat-time">
                {formatTime(chat.lastUpdated)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}