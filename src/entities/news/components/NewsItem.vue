<template>
  <div class="news">
    <div
      v-for="item in props.items"
      :key="item.id"
      class="news__body"
    >
      <div class="news__body-info">
        <div class="news__body-title">
          <Title
            :text="item.title"
            xs
          />
          <Text
            :text="item.text"
            xs
          />
          <Text
            v-if="userStore.user.isAdmin"
            :text="item.description"
            xs
          />
        </div>
        <Button
          v-if="!userStore.user.isAdmin"
          black
          style="width: 218px"
          @click="goToItem(item.id)"
        >
          ПОДБРОНЕЕ
        </Button>
      </div>
      <img
        class="news__body-img"
        :src="`data:image/jpeg;base64,${item.image}`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Text, Title } from '@/components';
  import { defineProps } from 'vue';
  import { NewsProp } from '../types';
  import { router } from '@/router';
  import { useUserStore } from '@/entities/user';
  import { useNewsStore } from '../model';

  const newsStore = useNewsStore();
  const userStore = useUserStore();
  const props = defineProps<{
    items: NewsProp[];
  }>();

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
      min-height: 400px;
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
      height: 400px;
    }
  }
</style>
