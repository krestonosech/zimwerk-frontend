import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function requests() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/requests', {}, config);

    return response.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось авторизироваться',
      type: 'error',
    });
  }
}

export async function authUser(params: { email: string; password: string }) {
  try {
    const response = await axios.post('/auth', params);
    return response.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось авторизироваться',
      type: 'error',
    });
  }
}

export async function me() {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/me', {}, config);
    return response.data;
  } catch (err) {
    showNotification({
      text: 'Не удалось авторизироваться',
      type: 'error',
    });
  }
}
