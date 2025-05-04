<template>
  <div class="page-content">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 900px;
    //TODO поменять размер при необходимости
    gap: 100px;
    padding: 32px 0;
  }
</style>
