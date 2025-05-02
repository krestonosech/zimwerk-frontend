<template>
  <PageContent>
    <div class="excursions">
      <p class="excursions__title">Экскурсии</p>
      <Chips :buttons="EXCURSIONS_BUTTONS" />
      <List />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent } from '@/components';
  import { Chips } from '@/components/ui/chips';
  import { List } from '@/components/ui/list';
  import { EXCURSIONS_BUTTONS } from '@/entities/consts';
</script>

<style lang="scss" scoped>
  .excursions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__title {
      font-family: AA Stetica;
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
      letter-spacing: 0%;
    }
  }
</style>
