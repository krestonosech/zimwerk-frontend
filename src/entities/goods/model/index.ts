import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { AnotherItem, Item, RequestsUsers } from './../types';
import { fetchGoods, fetchUsersGoods, fetchAnotherGoods } from '../api';

export const useGoodsStore = defineStore(
  'goods',
  () => {
    const requestsGoodsStorage = ref<Item[] | null>(null);
    const anotherRequestsGoodsStorage = ref<AnotherItem[] | null>(null);
    const requestsRequestsStorage = ref<RequestsUsers[] | null>(null);
    const isFetchingGoods = computed(() => requestsGoodsStorage.value !== null);
    const isFetchingRequests = computed(() => requestsRequestsStorage.value !== null);
    const failedAuthDcoMessage = ref<string>('');

    const requests = computed(() => ({
      requests: requestsRequestsStorage.value || [],
    }));

    const anotherRequests = computed(() => ({
      requests: anotherRequestsGoodsStorage.value || [],
    }));

    const goods = computed(() => ({
      requests: requestsGoodsStorage.value || [],
    }));

    const selectedGoods = ref<Item[]>([]);

    async function fetchAllGoods(type?: string) {
      try {
        requestsGoodsStorage.value = await fetchGoods(type);

        return requestsGoodsStorage.value;
      } catch (error) {
        if (error instanceof Error) {
          failedAuthDcoMessage.value = error.message;
        }
        return undefined;
      }
    }

    async function fetchAllUsersAnotherGoods(username?: string) {
      try {
        anotherRequestsGoodsStorage.value = await fetchAnotherGoods(username);
        return anotherRequestsGoodsStorage.value;
      } catch (error) {
        if (error instanceof Error) {
          failedAuthDcoMessage.value = error.message;
        }
        return undefined;
      }
    }

    async function fetchAllUsersGoods(username?: string) {
      try {
        requestsRequestsStorage.value = await fetchUsersGoods(username);

        return requestsRequestsStorage.value;
      } catch (error) {
        if (error instanceof Error) {
          failedAuthDcoMessage.value = error.message;
        }
        return undefined;
      }
    }

    return {
      requests,
      goods,
      selectedGoods,
      isFetchingGoods,
      isFetchingRequests,
      anotherRequests,
      failedAuthDcoMessage,
      fetchAllGoods,
      fetchAllUsersGoods,
      fetchAllUsersAnotherGoods,
    };
  },
  { persist: true }
);
