<template>
  <p
    class="m-text"
    :class="{
      'xl-text': xl,
      'm-text': m,
      'xs-text': xs,
    }"
  >
    {{ text }}
  </p>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps<{
    xl?: boolean;
    m?: boolean;
    xs?: boolean;
    text: string;
  }>();
</script>

<style lang="scss" scoped>
  .m-text {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
  }

  .xl-text {
    font-family: 'AA Stetica';
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }

  .xs-text {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
  }

  @media (max-width: 750px) {
    .m-text {
      line-height: inherit;
      font-size: 16px;
    }
    .xl-text {
      line-height: inherit;
      font-size: 16px;
    }
    /* .xs-text {
      line-height: inherit;
      font-size: 12px;
    } */
  }
</style>
