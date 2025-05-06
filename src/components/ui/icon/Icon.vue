<template>
  <div>
    <img
      class="xs shevron"
      :class="{ xs: xs, xl: xl }"
      :src="Left"
      @click="emit('clickLeft')"
    />
    <slot />
    <img
      class="xs shevron"
      :class="{ xs: xs, xl: xl }"
      :src="Right"
      @click="emit('clickRight')"
    />
  </div>
</template>

<script lang="ts" setup>
  import Left from '@/assets/icons/chevron-left.svg';
  import Right from '@/assets/icons/chevron-right.svg';
  import { defineProps, defineEmits } from 'vue';

  defineProps<{
    icon: 'left' | 'right';
    xs?: boolean;
    xl?: boolean;
  }>();
  const emit = defineEmits(['clickLeft', 'clickRight']);
</script>

<style lang="scss" scoped>
  .shevron {
    cursor: pointer;
  }
  .xs {
    width: 20px;
    height: 20px;
  }
  .xl {
    width: 32px;
    height: 32px;
  }
</style>
