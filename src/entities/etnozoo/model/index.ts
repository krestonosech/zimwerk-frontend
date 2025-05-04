import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { fetchEtnozoo } from './../api';
import { ImagesProps } from '@/entities/filters/types';

export const useEtnozooStore = defineStore('etnozoo', () => {
  const etnozooStorage = ref<ImagesProps[]>();
  const isFetching = computed(() => etnozooStorage.value !== null);
  const failedAuthDcoMessage = ref<string>('');
  const loading = ref<boolean>(false);
  const flag = ref<boolean>(true);

  const etnozoo = computed(() => ({
    etnozoo: etnozooStorage.value,
    loading: loading.value,
  }));

  async function fetchAllEtnozoo(): Promise<ImagesProps[] | undefined> {
    if (!flag.value) return;
    try {
      loading.value = true;
      failedAuthDcoMessage.value = '';
      etnozooStorage.value = await fetchEtnozoo();

      loading.value = false;
      flag.value = false;
      return etnozoo.value.etnozoo;
    } catch (error) {
      if (error instanceof Error) {
        failedAuthDcoMessage.value = error.message;
      }
      return undefined;
    }
  }

  return {
    flag,
    loading,
    etnozoo,
    isFetching,
    failedAuthDcoMessage,
    fetchAllEtnozoo,
  };
});
