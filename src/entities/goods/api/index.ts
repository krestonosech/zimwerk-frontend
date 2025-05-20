import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function fetchGoods(type?: string) {
  try {
    const response = await axios.post('/all-goods', { type });
    return response.data.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось получить все товары',
      type: 'error',
    });
  }
}

export async function fetchAnotherGoods(username?: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios.post('/get-another-requests', { username }, config);
    return response.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось получить все товары',
      type: 'error',
    });
  }
}

export async function fetchUsersGoods(username?: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios.post('/all-requests', { username }, config);
    return response.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось получить все товары',
      type: 'error',
    });
  }
}
