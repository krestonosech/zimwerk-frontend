import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Review } from './../types';
import { reviews } from '../api';

export const useReviewsStore = defineStore('reviews', () => {
  const reviewsStorage = ref<Review[] | null>(null);

  const allReviews = computed(() => ({
    requests: reviewsStorage.value || [],
  }));

  async function fetchReviews(username?: string) {
    try {
      reviewsStorage.value = await reviews(username);

      return reviewsStorage.value;
    } catch (error) {
      return undefined;
    }
  }

  return {
    fetchReviews,
    allReviews,
  };
});
