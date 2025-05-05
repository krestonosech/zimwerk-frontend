<template>
  <div
    class="list-item"
    :class="{
      'list-item__border-none': isLastElement,
      'list-item__cursor': !isExcirsions,
      'list-item_hover': !isExcirsions,
    }"
    @click="emit('click')"
  >
    <div class="list-item__text">{{ props.name }}</div>
    <div class="list-item__date">{{ props.date || props.duration }}</div>
    <div class="list-item__description">{{ props.description }}</div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps<{
    id?: number;
    name?: string;
    date?: string;
    description?: string;
    type?: string;
    duration?: string;
    isLastElement?: boolean;
    isExcirsions?: boolean;
  }>();

  const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .ticket-buying {
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    gap: 10px;

    &__lines {
      display: flex;
      justify-content: space-between;
    }

    &__buttons {
      display: flex;
      gap: 15px;
      &__button {
        background-color: white;
        border: none;
      }
    }
  }
  .list-item {
    min-height: 100px;
    display: flex;
    padding: 10px 0;
    gap: 10px;
    justify-content: space-between;
    border-bottom: solid #bababa 1px;
    &__cursor {
      cursor: pointer;
    }
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
    &__border-none {
      border: none !important;
    }
  }
  .list-item_hover:hover {
    background-color: #f8f8f8;
    transition: 0.3s ease;
  }
  @media (max-width: 750px) {
    .list-item {
      display: flex;
      flex-direction: column;
      &__description {
        width: 100%;
      }
      &__text {
        width: 100%;
      }
      &__date {
        width: 100%;
      }
    }
  }
</style>
