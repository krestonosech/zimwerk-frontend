<template>
  <p
    class="m-title"
    :class="{
      'xl-title': xl,
      'm-title': m,
      'xs-title': xs,
      black,
      up,
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
    up?: boolean;
    black?: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .up {
    text-transform: uppercase;
  }
  .m-title {
    font-family: 'GothamPro', Arial, sans-serif;
    color: white;
    font-weight: 600;
    font-size: 64px;
    line-height: 72px;
  }

  .xl-title {
    font-family: 'GothamPro', Arial, sans-serif;
    color: white;
    font-weight: 600;
    font-size: 118px;
    line-height: 100%;
    letter-spacing: 0%;
    padding-bottom: 20px;
  }

  .xs-title {
    font-family: 'GothamPro', Arial, sans-serif;
    color: white;
    font-weight: 700;
    font-size: 36px;
    line-height: 40px;
  }

  .black {
    color: black !important;
  }

  @media (max-width: 1440px) {
    .xl-title {
      font-size: 62px;
    }
  }

  @media (max-width: 750px) {
    .m-title {
      line-height: inherit;
      font-size: 32px;
    }
    .xl-title {
      line-height: inherit;
      font-size: 40px;
    }
    .xs-title {
      line-height: inherit;
      font-size: 20px;
    }
  }
</style>
