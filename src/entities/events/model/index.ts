import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchArchiveEvents, fetchEvents } from './../api';
import { ListItemProps } from '@/components/ui/list/types';

export const useEventsStore = defineStore('events', () => {
  const eventsStorage = ref<ListItemProps[]>([]);
  const archiveStorage = ref<ListItemProps[]>([]);
  const loading = ref(false);
  const failedAuthDcoMessage = ref('');
  const flag = ref(true);
  const archiveFlag = ref(true);

  const upcomingEvents = computed(() => eventsStorage.value);
  const archivedEvents = computed(() => archiveStorage.value);

  async function fetchAllEvents(item?: string, search?: string) {
    if (flag.value || item || search) {
      try {
        loading.value = true;
        failedAuthDcoMessage.value = '';
        eventsStorage.value = await fetchEvents(item, search);
        flag.value = false;
      } catch (error) {
        if (error instanceof Error) {
          failedAuthDcoMessage.value = error.message;
        }
      } finally {
        loading.value = false;
      }
    }
  }

  async function fetchAllArchiveEvents(item?: string, search?: string) {
    if (archiveFlag.value || item || search) {
      try {
        loading.value = true;
        failedAuthDcoMessage.value = '';
        archiveStorage.value = await fetchArchiveEvents(item, search);
        archiveFlag.value = false;
      } catch (error) {
        if (error instanceof Error) {
          failedAuthDcoMessage.value = error.message;
        }
      } finally {
        loading.value = false;
      }
    }
  }

  return {
    eventsStorage,
    upcomingEvents,
    archivedEvents,
    loading,
    failedAuthDcoMessage,
    fetchAllEvents,
    fetchAllArchiveEvents,
  };
});
