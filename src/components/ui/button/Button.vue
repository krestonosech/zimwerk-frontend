<template>
  <button
    class="button"
    :class="{ button__black: black, button__transparent: transparent }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';
  defineProps<{
    black?: boolean;
    transparent?: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .button {
    height: 40;
    border-radius: 999px;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    cursor: pointer;
    background-color: white;
    &__black {
      background-color: #1e1e1e;
      color: white;
    }
    &__black:hover {
      background-color: #343434;
      color: white;
      transition: 0.3s ease;
    }
    &__transparent {
      font-family: 'Roboto';
      padding: 0 10px;
      border: none;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
      text-transform: uppercase;
      color: #1e1e1e;
    }
    &__transparent:hover {
      color: #343434;
      transition: 0.3s ease;
    }
  }
</style>
