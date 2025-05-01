<template>
  <div class="list-item">
    <div class="list-item__text">{{ props.name }}</div>
    <div class="list-item__date">{{ props.date }}</div>
    <div class="list-item__description">{{ props.description }}</div>
    <div :class="{ border_none: isLastElement }"></div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  const props = defineProps<{
    id?: number;
    name?: string;
    date?: string;
    description?: string;
    type?: string;
    isLastElement?: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .list-item {
    min-height: 100px;
    display: flex;
    padding: 10px 0;
    gap: 10px;
    justify-content: space-between;
    border-bottom: solid #bababa 1px;
    &__text {
      width: 33%;
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
    }
    &__description {
      width: 33%;
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0%;
    }
    &__date {
      width: 33%;
      font-family: 'Roboto';
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .border_none {
    border: none;
  }
</style>
