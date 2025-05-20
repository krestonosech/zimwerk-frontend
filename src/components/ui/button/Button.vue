<template>
  <button
    class="button"
    :class="{ black, button__transparent: transparent, fixed, gray }"
  >
    <slot />
    <img
      class="img"
      :src="Right"
      :class="{ black }"
      @click="emit('click')"
    />
  </button>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import Right from '@/assets/icons/chevron-right.svg';
  defineProps<{
    black?: boolean;
    transparent?: boolean;
    fixed?: boolean;
    gray?: boolean;
  }>();
  const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .button {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    height: 60px;
    border-radius: 9999px;
    padding: 2px 4px 2px 24px;
    font-family: 'GothamPro', Arial, sans-serif;
    background-color: rgba(255, 255, 255, 0.093);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    align-items: center;
    color: white;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    border: solid white 1px;
  }
  .img {
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    filter: brightness(0) invert(1);
    border: solid white 1px;
    cursor: pointer;
  }
  .black {
    border: solid black 1px;
    color: black;
    filter: brightness(1);
  }
  .fixed {
    width: 280px;
  }
  .gray {
    background-color: rgb(116, 131, 145) !important;
  }
</style>
