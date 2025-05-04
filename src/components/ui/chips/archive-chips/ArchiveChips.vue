<template>
  <div class="chips">
    <div class="chips__buttons">
      <ArchiveChipButton
        v-for="(item, index) in EVENTS_BUTTONS"
        :key="index"
        :is-active="selected === item"
        @click="changeFilter(item)"
      >
        {{ item }}
      </ArchiveChipButton>
    </div>
    <input
      v-model="search"
      type="text"
      class="chips__input"
      placeholder="Поиск"
      @keyup.enter="changeFilter(selected)"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ArchiveChipButton from './ArchiveChipButton.vue';
  import { EVENTS_BUTTONS } from '@/entities/consts';
  import { useEventsStore } from '@/entities/events/model';

  const eventsStore = useEventsStore();
  const selected = ref('Все');
  const search = ref<string>('');

  async function changeFilter(item?: string) {
    if (item) {
      selected.value = item;
    }
    eventsStore.fetchAllArchiveEvents(selected.value, search.value);
  }
</script>

<style lang="scss" scoped>
  .chips {
    display: flex;
    justify-content: space-between;
    &__buttons {
      display: flex;
      gap: 10px;
    }
    &__input {
      width: 220;
      height: 28;
      gap: 4px;
      padding-top: 4px;
      padding-right: 10px;
      padding-bottom: 4px;
      padding-left: 10px;
      border-radius: 8px;
      border-width: 1px;
    }
  }
  @media (max-width: 750px) {
    .chips {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &__buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }
</style>
