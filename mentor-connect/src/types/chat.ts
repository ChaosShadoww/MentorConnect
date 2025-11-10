export type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
};

export type Chat = {
  id: string;
  participants: string[];
  messages: Message[];
};