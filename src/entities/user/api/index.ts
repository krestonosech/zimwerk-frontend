import { axios, type Response } from '@/plugins/axios';

export async function authUser(params: { login: string; password: string }) {
  try {
    const response = await axios.post<Response<null>>('/api/v1/auth/login', params, {
      errorMessage: 'Ошибка получения авторизации!',
    });

    return response.data.data;
  } catch (error) {
    let errorMessage = 'Ошибка при авторизации.';

    if (axios.isAxiosError<{ error: { msg: string } }>(error) && error.response?.data?.error?.msg) {
      errorMessage = error.response.data.error.msg;
    }

    throw new Error(errorMessage);
  }
}
