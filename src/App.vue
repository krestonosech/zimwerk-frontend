<template>
  <DefaultLayout />
</template>

<script lang="ts" setup>
  import { watch } from 'vue';
  import { DefaultLayout } from './layouts';

  watch(
    () => localStorage.getItem('token'),
    () => {
      const firstRunKey = 'projectFirstRunDone';
      if (!localStorage.getItem(firstRunKey)) {
        localStorage.removeItem('token');
        localStorage.setItem(firstRunKey, 'true');
      }
    },
    { deep: true, immediate: true }
  );
</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    font-family: 'GothamPro', Arial, sans-serif;
    color: #1e1e1e;
  }

  html {
    scroll-behavior: smooth;
  }
</style>
