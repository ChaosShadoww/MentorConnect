import type { Message } from '../types/chat';

type MessageProps = {
  message: Message;
  isCurrentUser: boolean;
};

export default function MessageBubble({ message, isCurrentUser }: MessageProps) {
  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
      <p className="sender-name">{message.senderName}</p>
      <p className="message-text">{message.text}</p>
      <span className="timestamp">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
}