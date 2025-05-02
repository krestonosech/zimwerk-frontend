<template>
  <div
    v-if="!onlyImages"
    class="image"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="image__element"
      style="border-top: solid #bababa 1px"
    >
      <p
        v-if="!item.name_2"
        style="padding: 5px 0"
        class="image__text"
      >
        {{ item.name }}
      </p>
      <div
        v-else
        style="padding: 5px 0"
      >
        <p class="image__text">
          {{ item.name }}
        </p>
        <p class="image__text">
          {{ item.name_2 }}
        </p>
      </div>
      <img
        :src="item.url"
        :alt="item.name"
        class="image__image"
      />
    </div>
  </div>
  <div
    v-else
    class="image"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="image__element"
    >
      <img
        :src="item.url"
        :alt="item.name"
        class="image__image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ImagesProps } from '@/entities/filters/types';
  import { defineProps } from 'vue';

  defineProps<{ items: ImagesProps[]; onlyImages?: boolean }>();
</script>

<style lang="scss" scoped>
  .image {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    &__element {
      display: flex;
      flex-direction: column;
    }
    &__text {
      font-family: Roboto;
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
    }
    &__image {
      width: 450px;
    }
  }
</style>
