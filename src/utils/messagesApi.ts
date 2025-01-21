import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types/messages';

const MESSAGES_KEY = 'chat_messages';

const getStoredMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const storeMessages = (messages: Message[]) => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

export const fetchMessages = async (userId: string): Promise<Message[]> => {
  const messages = getStoredMessages();
  return messages.filter(
    (msg) => msg.senderId === userId || msg.receiverId === userId
  );
};

export const sendMessage = async (senderId: string, receiverId: string, content: string): Promise<Message> => {
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

export const markMessageAsRead = async (messageId: string): Promise<void> => {
  const messages = getStoredMessages();
  const updatedMessages = messages.map((msg) =>
    msg.id === messageId ? { ...msg, read: true } : msg
  );
  storeMessages(updatedMessages);
};

export const getUnreadCount = async (userId: string): Promise<number> => {
  const messages = getStoredMessages();
  return messages.filter(
    (msg) => msg.receiverId === userId && !msg.read
  ).length;
};