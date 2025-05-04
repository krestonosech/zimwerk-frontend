<template>
  <PageContent>
    <div class="excursions">
      <p class="excursions__title">Экскурсии</p>
      <Chips />
      <List
        v-if="items?.length"
        :items="items"
        excursions
        class="excursions__list"
      />
      <div v-else>
        <p class="events__p">Нет подходящих экскурсий</p>
      </div>
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent } from '@/components';
  import { Chips } from '@/components/ui/chips';
  import { List } from '@/components/ui/list';
  import { ListItemProps } from '@/components/ui/list/types';
  import { useExcursionsStore } from '@/entities/excursions/model';
  import { computed, onMounted } from 'vue';

  const excursionsStore = useExcursionsStore();
  const items = computed<ListItemProps[] | undefined>(() => excursionsStore.excursions.excursions);

  onMounted(async () => {
    await excursionsStore.fetchAllExcursions('Все');
  });
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
    &__p {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0%;
    }
  }
  @media (max-width: 750px) {
    .excursions {
      &__title {
        font-size: 40px;
      }
    }
  }
</style>
