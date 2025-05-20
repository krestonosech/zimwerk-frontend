import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function reviews(username?: string) {
  try {
    const response = await axios.post('/reviews', { username });

    return response.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось получить отзывы',
      type: 'error',
    });
  }
}
