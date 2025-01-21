interface NotificationCounts {
  messages: number;
  orders: number;
}

const NOTIFICATIONS_KEY = 'user_notifications';

const getStoredNotifications = (userId: string): NotificationCounts => {
  try {
    const stored = localStorage.getItem(`${NOTIFICATIONS_KEY}_${userId}`);
    return stored ? JSON.parse(stored) : { messages: 0, orders: 0 };
  } catch (error) {
    console.error('Error reading notifications:', error);
    return { messages: 0, orders: 0 };
  }
};

const storeNotifications = (userId: string, notifications: NotificationCounts): void => {
  localStorage.setItem(`${NOTIFICATIONS_KEY}_${userId}`, JSON.stringify(notifications));
};

export const fetchNotifications = async (userId: string): Promise<NotificationCounts> => {
  // In a real application, this would be an API call
  const notifications = getStoredNotifications(userId);
  return notifications;
};

export const updateNotifications = async (
  userId: string,
  type: 'messages' | 'orders',
  count: number
): Promise<NotificationCounts> => {
  const current = getStoredNotifications(userId);
  const updated = {
    ...current,
    [type]: count,
  };
  storeNotifications(userId, updated);
  return updated;
};