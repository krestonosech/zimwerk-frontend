<template>
  <button
    class="button"
    :class="{ button__isActive: isActive }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';
  defineProps<{
    isActive: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .button {
    gap: 10px;
    padding-top: 4px;
    padding-right: 10px;
    padding-bottom: 4px;
    padding-left: 10px;
    border-radius: 8px;
    background-color: #fff;
    font-family: Roboto;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
    cursor: pointer;
    &__isActive {
      background-color: #1e1e1e;
      color: #fff;
    }
  }
</style>
