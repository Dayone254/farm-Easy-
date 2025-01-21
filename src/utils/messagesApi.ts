import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// For now, we'll store messages in localStorage
const MESSAGES_KEY = 'chat_messages';

const getStoredMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const storeMessages = (messages: Message[]) => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

export const fetchMessages = (userId: string) => {
  const messages = getStoredMessages();
  return messages.filter(
    (msg) => msg.senderId === userId || msg.receiverId === userId
  );
};

export const sendMessage = (senderId: string, receiverId: string, content: string) => {
  const messages = getStoredMessages();
  const newMessage: Message = {
    id: uuidv4(),
    senderId,
    receiverId,
    content,
    timestamp: new Date(),
    read: false,
  };
  
  messages.push(newMessage);
  storeMessages(messages);
  return newMessage;
};

export const markMessageAsRead = (messageId: string) => {
  const messages = getStoredMessages();
  const updatedMessages = messages.map((msg) =>
    msg.id === messageId ? { ...msg, read: true } : msg
  );
  storeMessages(updatedMessages);
};

export const getUnreadCount = (userId: string) => {
  const messages = getStoredMessages();
  return messages.filter(
    (msg) => msg.receiverId === userId && !msg.read
  ).length;
};