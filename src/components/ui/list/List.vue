<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div
    class="list"
    :class="{ excursions }"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
    >
      <ListItem
        :id="item.id"
        v-model:isModalOpen="isModalOpen"
        :name="item.name"
        :type="item.type"
        :date="item.date"
        :duration="item.duration"
        :description="item.description"
        :is-last-element="index + 1 === items.length"
        :is-excirsions="excursions"
        @click="
          emit('openItemModel', {
            name: item.name,
            price: item.price,
            date: item.date,
          })
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';
  import { ListItemProps } from './types';
  import { defineProps, defineEmits, ref } from 'vue';

  defineProps<{ items: ListItemProps[]; excursions?: boolean }>();
  const isModalOpen = ref(false);
  const emit = defineEmits(['register', 'openItemModel']);
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 660px;
    overflow-y: auto;
  }
  .excursions {
    max-height: 1000px;
  }
</style>
