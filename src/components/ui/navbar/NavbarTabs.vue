<template>
  <div class="button-group">
    <RouterLink
      v-for="(item, index) in buttons"
      :key="index"
      :to="`/${item.id}`"
      class="button-group__button"
      :class="{
        'button-group__isActive': filterStore.page === item.id,
        'button-group__button': filterStore.page !== item.id,
      }"
      @click="filterStore.page = item.id"
    >
      {{ item.label }}
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
  import { useFiltersStore } from '@/entities/filters/model';
  import { Filters } from '@/entities/filters/types';

  const filterStore = useFiltersStore();

  const buttons: { label: string; id: Filters['page'] }[] = [
    { label: 'О МУЗЕЕ', id: 'about-museum' },
    { label: 'ЭКТОЗООСАД', id: 'etnozoo' },
    { label: 'ЭКСКУРСИИ', id: 'excursion' },
    { label: 'СОБЫТИЯ', id: 'events' },
    { label: '8(3012) 33-25-10', id: 'phone-number' },
  ];
</script>

<style lang="scss" scoped>
  .button-group {
    display: flex;
    justify-content: space-around;
    gap: 4px;

    &__button {
      position: relative;
      padding: 0 10px;
      font-weight: 400;
      size: 16px;
      color: #1e1e1e;
      text-decoration: none;
    }
    &__isActive {
      /* font-weight: 500; */
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 10px;
        right: 10px;
        height: 2px;
        background-color: #1e1e1e;
      }
    }
  }
</style>
