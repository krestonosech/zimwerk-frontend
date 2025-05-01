import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { authUser } from './../api';
import type { User } from './../types';

export const useUserStore = defineStore('user', () => {
  const userStorage = ref<User | null>(null);
  const isFetching = computed(() => userStorage.value !== null);
  const failedAuthDcoMessage = ref<string>('');

  const user = computed(() => ({
    id: userStorage.value?.id || 0,
    isAdmin: userStorage.value?.isAdmin,
    username: userStorage.value?.username || '',
  }));

  async function loginUser(login: string, password: string): Promise<boolean> {
    try {
      failedAuthDcoMessage.value = '';
      userStorage.value = await authUser({ password: password, login: login });

      return true;
    } catch (error) {
      if (error instanceof Error) {
        failedAuthDcoMessage.value = error.message;
      }
      return false;
    }
  }

  return {
    user,
    isFetching,
    failedAuthDcoMessage,
    loginUser,
  };
});
