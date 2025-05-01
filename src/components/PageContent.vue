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
    //TODO поменять размер при необходимости
    gap: 100px;
    padding-top: 32px;
  }
</style>
