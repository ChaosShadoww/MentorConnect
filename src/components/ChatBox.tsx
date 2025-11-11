import { useState } from 'react';
import type { Message } from '../types/chat';
import MessageBubble from './MessageBubble';
import Button from './Button';

type ChatBoxProps = {
  chatId: string;
  currentUserId: string;
};
export default function ChatBox({ chatId, currentUserId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      senderId: currentUserId,
      senderName: 'You',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map(msg => (
          <MessageBubble 
            key={msg.id}
            message={msg}
            isCurrentUser={msg.senderId === currentUserId}
          />
        ))}
      </div>
      
      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <Button text="Send" onClick={handleSend} />
      </div>
    </div>
  );
}