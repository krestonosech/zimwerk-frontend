import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { authUser, me, requests } from './../api';
import type { Requests, User } from './../types';

export const useUserStore = defineStore('user', () => {
  const userStorage = ref<User | null>(null);
  const requestsStorage = ref<Requests[] | null>(null);
  const isFetching = computed(() => userStorage.value !== null);
  const failedAuthDcoMessage = ref<string>('');

  const user = computed(() => ({
    id: userStorage.value?.id || 0,
    isAdmin: userStorage.value?.isAdmin,
    username: userStorage.value?.username || '',
    email: userStorage.value?.email || '',
    requests: requestsStorage.value || [],
  }));

  async function loginUser(email: string, password: string): Promise<string | undefined> {
    try {
      failedAuthDcoMessage.value = '';
      userStorage.value = await authUser({ password: password, email: email });

      return userStorage.value?.token;
    } catch (error) {
      if (error instanceof Error) {
        failedAuthDcoMessage.value = error.message;
      }
      return undefined;
    }
  }

  async function profileMe(): Promise<string | undefined> {
    try {
      failedAuthDcoMessage.value = '';
      userStorage.value = await me();

      return userStorage.value?.token;
    } catch (error) {
      if (error instanceof Error) {
        failedAuthDcoMessage.value = error.message;
      }
      return undefined;
    }
  }

  async function myRequests(): Promise<string | undefined> {
    try {
      failedAuthDcoMessage.value = '';
      requestsStorage.value = await requests();

      return userStorage.value?.token;
    } catch (error) {
      if (error instanceof Error) {
        failedAuthDcoMessage.value = error.message;
      }
      return undefined;
    }
  }

  return {
    user,
    isFetching,
    failedAuthDcoMessage,
    loginUser,
    profileMe,
    myRequests,
  };
});
