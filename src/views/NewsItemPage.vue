<template>
  <PageContent v-if="newsStore.selectedItem">
    <div class="news-item">
      <Title :text="newsStore.selectedItem?.title" />
      <div class="news-item__body">
        <div class="news-item__body-text">
          <Text
            :text="newsStore.selectedItem?.text"
            xs
          />
          <Text
            :text="newsStore.selectedItem?.description"
            xs
          />
        </div>
        <img
          class="news-item__body-image"
          :src="`data:image/jpeg;base64,${newsStore.selectedItem.image}`"
        />
      </div>
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Text, Title } from '@/components';
  import { useNewsStore } from '@/entities/news/model';
  const newsStore = useNewsStore();
</script>

<style lang="scss" scoped>
  .news-item {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__body {
      display: flex;
      gap: 20px;
    }
    &__body-text {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__body-image {
      width: 550px;
    }
  }
</style>
