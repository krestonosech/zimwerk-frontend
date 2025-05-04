<template>
  <div class="main-title">
    <div class="main-title__block">
      <p class="main-title__text">Ближайшие события</p>
      <div class="main-title__button">
        <Button
          transparent
          @click="router.push('/events')"
        >
          КО ВСЕМ СОБЫТИЯМ
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Button } from '@/components/ui/button';
  import { router } from '@/router';
</script>

<style lang="scss" scoped>
  .main-title {
    padding: 10px 0;
    display: flex;
    &__block {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    &__text {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
    }
    &__button {
      display: flex;
      align-items: end;
    }
  }
  @media (max-width: 750px) {
    .main-title__text {
      font-size: 24px;
      line-height: 32px;
    }
  }
</style>
