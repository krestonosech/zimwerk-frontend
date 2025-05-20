<template>
  <div
    class="car"
    :style="{
      backgroundImage: `url(${bgc})`,
    }"
  >
    <img
      class="img"
      :style="{ width: `${width}px` }"
      :src="icon"
      :alt="text"
    />
    <Title
      xs
      :text="text"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Title } from '@/components';
  import { defineProps } from 'vue';
  import './cars.scss';

  defineProps<{
    id: number;
    icon: string;
    bgc: string;
    width: number;
    text: string;
  }>();
</script>
