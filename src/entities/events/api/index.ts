import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function fetchEvents(item?: string, search?: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/events', { type: item, search }, config);
    return response.data.data;
  } catch {
    showNotification({
      type: 'error',
      text: 'Не удалось запросить предстоящие события!',
    });
  }
}

export async function fetchArchiveEvents(item?: string, search?: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/events-archive', { type: item, search }, config);
    return response.data.data;
  } catch {
    showNotification({
      type: 'error',
      text: 'Не удалось запросить архивированные события!',
    });
  }
}
