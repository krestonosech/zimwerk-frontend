import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function fetchNews() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.get('/news', config);
    return response.data.data;
  } catch {
    showNotification({
      type: 'error',
      text: 'Не удалось запросить новости!',
    });
  }
}
