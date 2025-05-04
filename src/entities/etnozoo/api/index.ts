import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function fetchEtnozoo() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/etnozoo', {}, config);
    return response.data.data;
  } catch {
    showNotification({
      type: 'error',
      text: 'Не удалось запросить фотографии!',
    });
  }
}
