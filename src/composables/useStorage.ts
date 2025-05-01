import { ref, watch, type UnwrapRef } from 'vue';

export default function useStorage<T>(key: string, defaultValue: UnwrapRef<T>) {
  const storedData = localStorage.getItem(key);

  const storage = ref<T>(storedData ? JSON.parse(storedData) : defaultValue);

  watch(storage, value => localStorage.setItem(key, JSON.stringify(value)), {
    deep: true,
  });

  const remove = () => localStorage.removeItem(key);
  const reset = () => (storage.value = defaultValue);

  return { storage, remove, reset };
}
