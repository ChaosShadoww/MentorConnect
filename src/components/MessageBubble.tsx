import type { Message } from '../types/chat';
import './MessageBubble.css'

type MessageProps = {
  message: Message;
  isCurrentUser: boolean;
};

export default function MessageBubble({ message, isCurrentUser }: MessageProps) {
  const timeStr = message.timestamp.toLocaleTimeString();
  const dateStr = message.timestamp.toLocaleDateString();

  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
      <p className="sender-name">{message.senderName}</p>
      <p className="message-text">{message.text}</p>
      <span className="timestamp">
        {timeStr} · {dateStr}
      </span>
    </div>
  );
}