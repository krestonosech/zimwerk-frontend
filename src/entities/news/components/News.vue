<template>
  <div
    v-if="newsItems"
    class="news"
  >
    <div class="news__nav">
      <Title text="Новости" />
      <Icon
        icon="left"
        xl
        @click-left="prev"
        @click-right="next"
      />
    </div>
    <div class="news__body">
      <div class="news__body-info">
        <div class="news__body-title">
          <Title
            :text="newsItems[currentIndex].title"
            xs
          />
          <Text
            :text="newsItems[currentIndex].text"
            xs
          />
        </div>
        <Button
          black
          style="width: 218px"
          @click="goToItem(newsItems[currentIndex].id)"
        >
          ПОДБРОНЕЕ
        </Button>
      </div>
      <img
        class="news__body-img"
        :src="`data:image/jpeg;base64,${newsItems[currentIndex].image}`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Icon, Text, Title } from '@/components';
  import { ref } from 'vue';
  import { useNewsStore } from '../model';
  import { router } from '@/router';

  const newsStore = useNewsStore();
  const currentIndex = ref(0);

  const newsItems = ref(newsStore.news);

  function prev() {
    if (!newsItems.value) return;
    currentIndex.value = (currentIndex.value - 1 + newsItems.value.length) % newsItems.value.length;
  }

  function next() {
    if (!newsItems.value) return;
    currentIndex.value = (currentIndex.value + 1) % newsItems.value.length;
  }

  function goToItem(id: number) {
    newsStore.setItem(id);
    router.push(`/news/:${id}`);
  }
</script>

<style lang="scss" scoped>
  .news {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__nav {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
    &__body {
      display: flex;
      gap: 20px;
      height: 400px;
    }
    &__body-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 600px;
    }
    &__body-title {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__body-img {
      width: 730px;
    }
  }
</style>
