<template>
  <div
    v-if="!onlyImages"
    class="image"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="image__element"
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
      <Image
        :url="item.url"
        :name="item.name"
        :type="type"
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
      <Image
        :url="item.url"
        :name="item.name"
        :type="type"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ImagesProps } from '@/entities/filters/types';
  import { defineProps } from 'vue';
  import Image from './Image.vue';

  defineProps<{
    items: ImagesProps[];
    onlyImages?: boolean;
    type: 'main-images' | 'museum-images' | 'etnozoo-images';
  }>();
</script>

<style lang="scss" scoped>
  .image {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &__element {
      border-top: solid #bababa 1px;
      margin-bottom: 30px;
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
      &__element {
        margin-bottom: 0;
      }
    }
  }
</style>
