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
        <div class="news-item__body-img-div">
          <img
            class="news-item__body-image"
            :src="`data:image/jpeg;base64,${newsStore.selectedItem.image}`"
          />
        </div>
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
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__body-img-div {
      display: flex;
      justify-content: end;
    }
    &__body-image {
      width: 100%;
    }
  }
  @media (max-width: 1440px) {
    .news-item {
      &__body-image {
        width: 400px;
        height: 300px;
      }
    }
  }
  @media (max-width: 750px) {
    .news-item {
      &__body-image {
        width: 300px;
        height: 200px;
      }
      &__body {
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
      }
      &__body-img-div {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
