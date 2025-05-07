<template>
  <div class="main-title">
    <div class="main-title__block">
      <Title text="Ближайшие события" />
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
  import { Title } from '@/components';
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
    &__button {
      display: flex;
      align-items: end;
    }
  }
  @media (max-width: 750px) {
    .main-title {
      &__text {
        font-size: 24px;
        line-height: 32px;
      }
      /* &__block {
        display: flex;
        flex-direction: column;
      } */
    }
  }
</style>
