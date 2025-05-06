import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { NewsProp } from '../types';
import { fetchNews } from '../api';

export const useNewsStore = defineStore('news', () => {
  const newsStorage = ref<NewsProp[]>();
  const isFetching = computed(() => newsStorage.value !== null);
  const failedAuthDcoMessage = ref<string>('');

  const news = computed(() => newsStorage.value);
  const selectedItem = ref<NewsProp>();

  async function fetchAllNews() {
    try {
      failedAuthDcoMessage.value = '';
      newsStorage.value = await fetchNews();

      return newsStorage.value;
    } catch (error) {
      if (error instanceof Error) {
        failedAuthDcoMessage.value = error.message;
      }
      return undefined;
    }
  }

  function setItem(id: number) {
    selectedItem.value = news.value?.find(item => item.id === id);
  }

  return {
    news,
    isFetching,
    failedAuthDcoMessage,
    fetchAllNews,
    setItem,
    selectedItem,
  };
});
