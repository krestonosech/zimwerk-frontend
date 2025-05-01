export type NotificationsType = 'warning' | 'success' | 'error';
export type NotificationsVariant = NotificationsType | 'loading';

export interface NotificationOptions {
  text: string;
  type: NotificationsType;
}
