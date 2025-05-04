<template>
  <div
    v-if="!onlyImages"
    class="image"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="image__element"
      style="border-top: solid #bababa 1px; margin-bottom: 30px"
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
    flex-wrap: wrap;
    &__element {
      display: flex;
      flex-direction: column;
      &__padding {
        padding-top: 10px;
      }
    }
    &__text {
      font-family: Roboto;
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
    }
    &__image {
      width: 447px;
      height: 330px;
    }
  }
  @media (max-width: 1440px) {
    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      &__image {
        padding: 16px;
      }
    }
  }
  @media (max-width: 750px) {
    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      &__image {
        width: 300px;
        height: 200px;
        padding: 16px;
      }
    }
  }
</style>
