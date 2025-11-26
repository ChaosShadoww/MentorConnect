import { useState, useEffect } from 'react';
import type { Message } from '../types/chat';
import MessageBubble from './MessageBubble';
import Button from './Button';
import { supabase } from '../supabaseClient';

type ChatBoxProps = {
  chatId: string;
  currentUserId: string;
};

interface ChatRecord {
  id: string;
  mentor_id: string;
  mentee_id: string;
  created_at: string;
  updated_at: string;
}

interface MessageRecord {
  id: string;
  chat_id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
}

interface UserRecord {
  id: string;
  name: string;
}

export default function ChatBox({ chatId, currentUserId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, [chatId, currentUserId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      

      const { data: currentUserData } = await supabase
        .from('users')
        .select('role')
        .eq('id', currentUserId)
        .single();

      const currentUserRole = currentUserData?.role;

      let query;
      
      if (currentUserRole === 'mentor') {
        query = supabase
          .from('chats')
          .select('*')
          .eq('mentor_id', currentUserId)
          .eq('mentee_id', chatId);
      } else {
        query = supabase
          .from('chats')
          .select('*')
          .eq('mentor_id', chatId)
          .eq('mentee_id', currentUserId);
      }

      const { data: existingChat } = await query.maybeSingle();

      let activeChatId: string;

      if (existingChat) {
        activeChatId = (existingChat as ChatRecord).id;
        setChatRoomId(activeChatId);
      } else {
        const chatData = currentUserRole === 'mentor'
          ? { mentor_id: currentUserId, mentee_id: chatId }
          : { mentor_id: chatId, mentee_id: currentUserId };

        const { data: newChat, error: createError } = await supabase
          .from('chats')
          .insert([chatData])
          .select()
          .single();

        if (createError) {
          console.error('Error creating chat room:', createError);
          setLoading(false);
          return;
        }

        activeChatId = (newChat as ChatRecord).id;
        setChatRoomId(activeChatId);
      }

      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          message_text,
          sender_id,
          created_at
        `)
        .eq('chat_id', activeChatId)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error loading messages:', messagesError);
        setLoading(false);
        return;
      }

      const typedMessages = messagesData as MessageRecord[];
      const senderIds = [...new Set(typedMessages.map(msg => msg.sender_id))];
      
      const { data: usersData } = await supabase
        .from('users')
        .select('id, name')
        .in('id', senderIds);

      const typedUsers = usersData as UserRecord[];
      const userMap = new Map(
        typedUsers.map(user => [user.id, user.name])
      );

      const transformedMessages: Message[] = typedMessages.map(msg => ({
        id: msg.id,
        text: msg.message_text,
        senderId: msg.sender_id,
        senderName: msg.sender_id === currentUserId ? 'You' : (userMap.get(msg.sender_id) || 'Other User'),
        timestamp: new Date(msg.created_at),
      }));

      setMessages(transformedMessages);
      setLoading(false);
    } catch (err) {
      console.error('Unexpected error loading messages:', err);
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !chatRoomId) return;

    try {
      const { data: newMessage, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatRoomId,
            sender_id: currentUserId,
            message_text: inputText.trim(),
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
        return;
      }

      const typedMessage = newMessage as MessageRecord;

      const messageToAdd: Message = {
        id: typedMessage.id,
        text: inputText.trim(),
        senderId: currentUserId,
        senderName: 'You',
        timestamp: new Date(typedMessage.created_at),
      };

      setMessages([...messages, messageToAdd]);
      setInputText('');

      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatRoomId);

    } catch (err) {
      console.error('Unexpected error sending message:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="chat-container">
        <div className="messages-list">
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map(msg => (
            <MessageBubble 
              key={msg.id}
              message={msg}
              isCurrentUser={msg.senderId === currentUserId}
            />
          ))
        )}
      </div>
      
      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <Button text="Send" onClick={handleSend} className="send-btn" />
      </div>
    </div>
  );
}


