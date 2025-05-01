import { default as NotificationsPlugin, Notifications, notify } from '@kyvg/vue3-notification';

import type { NotificationOptions } from './types';

export function showNotification(options: NotificationOptions) {
  notify(options);
}

export function closeNotification(id: number) {
  notify.close(id);
}

export function showNotificationLoading(text: string): number {
  const id = Date.now();
  notify({ id, text, type: 'loading', duration: -1 });
  return id;
}

export { NotificationsPlugin, Notifications };
