<template>
  <p
    class="m-text"
    :class="{
      'xl-text': xl,
      'xl-text-hover': hover,
      'm-text': m,
      black,
      red,
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
    black?: boolean;
    hover?: boolean;
    border?: boolean;
    red?: boolean;
  }>();
</script>

<style lang="scss" scoped>
  .m-text {
    font-family: 'GothamPro', Arial, sans-serif;
    color: white;
    font-weight: 300;
    font-size: 20px;
    line-height: 28px;
  }

  .black {
    color: black !important;
  }

  .red {
    color: red !important;
  }

  .xl-text {
    font-family: 'GothamPro', Arial, sans-serif;
    color: white;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    transition: 0.7s ease;
  }

  .xs-text {
    font-family: 'GothamPro', Arial, sans-serif;
    color: white;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
  }

  .xl-text-hover:hover {
    color: rgb(52, 97, 145) !important;
    transition: 0.5s ease;
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
