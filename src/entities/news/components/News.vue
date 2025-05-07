<template>
  <div
    v-if="newsItems"
    ref="newsRef"
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
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="newsItems[currentIndex].id"
          class="news__body-info"
        >
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
      </transition>
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          :key="newsItems[currentIndex].id"
          class="news__body-img-div"
        >
          <img
            class="news__body-img"
            :src="`data:image/jpeg;base64,${newsItems[currentIndex].image}`"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Icon, Text, Title } from '@/components';
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  import { useNewsStore } from '../model';
  import { router } from '@/router';

  const newsStore = useNewsStore();
  const currentIndex = ref(0);
  const flag = ref(false);

  const newsItems = computed(() => newsStore.news);

  function prev() {
    if (!newsItems.value || !newsItems.value.length) return;
    currentIndex.value = (currentIndex.value - 1 + newsItems.value.length) % newsItems.value.length;
    flag.value = true;
  }

  function next() {
    if (!newsItems.value || !newsItems.value.length) return;
    currentIndex.value = (currentIndex.value + 1) % newsItems.value.length;
  }

  function goToItem(id: number) {
    newsStore.setItem(id);
    router.push(`/news/:${id}`);
  }

  let interval: number | undefined;

  onMounted(() => {
    if (flag.value) return;
    interval = window.setInterval(() => {
      if (flag.value) return;
      next();
    }, 5000);
  });

  onUnmounted(() => {
    if (flag.value) return;
    if (interval) clearInterval(interval);
  });
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  @media (max-width: 1440px) {
    .news {
      &__body-img {
        width: 400px;
        height: 300px;
      }
      &__body-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: inherit;
      }
      &__body {
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
        height: inherit;
      }
      &__body-title {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-bottom: 20px;
      }
      &__body-img-div {
        display: flex;
        justify-content: center;
      }
    }
  }
  @media (max-width: 750px) {
    .news {
      &__body-img {
        width: 300px;
        height: 200px;
      }
      &__body-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: inherit;
      }
      &__body {
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
        height: inherit;
      }
      &__body-title {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-bottom: 30px;
      }
      &__body-img-div {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
