import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { fetchExcursions } from './../api';
import { ListItemProps } from '@/components/ui/list/types';

export const useExcursionsStore = defineStore('excursions', () => {
  const excursionsStorage = ref<ListItemProps[]>();
  const isFetching = computed(() => excursionsStorage.value !== null);
  const failedAuthDcoMessage = ref<string>('');
  const loading = ref<boolean>(false);
  const flag = ref<boolean>(true);

  const excursions = computed(() => ({
    excursions: excursionsStorage.value,
    loading: loading.value,
  }));

  async function fetchAllExcursions(
    item?: string,
    search?: string
  ): Promise<ListItemProps[] | undefined> {
    if (flag.value || item)
      try {
        loading.value = true;
        failedAuthDcoMessage.value = '';
        excursionsStorage.value = await fetchExcursions(item, search);

        loading.value = false;
        flag.value = false;
        return excursions.value.excursions;
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
    excursions,
    isFetching,
    failedAuthDcoMessage,
    fetchAllExcursions,
  };
});
