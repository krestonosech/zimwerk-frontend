<template>
  <PageContent>
    <div class="news">
      <Title text="Новости" />
      <NewsItem
        v-if="items"
        :items="items"
      />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Title } from '@/components';
  import { NewsItem, NewsProp } from '@/entities/news';
  import { useNewsStore } from '@/entities/news/model';
  import { onMounted, ref } from 'vue';

  const newsStore = useNewsStore();
  const items = ref<NewsProp[]>();

  onMounted(async () => {
    items.value = await newsStore.fetchAllNews();
  });
</script>

<style lang="scss" scoped>
  .news {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
</style>
