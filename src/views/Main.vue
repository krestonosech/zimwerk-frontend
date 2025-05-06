<template>
  <PageContent>
    <div
      v-if="userStore.user.isAdmin === 1"
      style="display: flex; flex-direction: column; gap: 40px"
    >
      <div style="display: flex; justify-content: center">
        <Button
          v-for="(item, index) in menus"
          :key="index"
          transparent
          class="register__button"
          :class="{ isRegister: menuItem === item }"
          @click="menuItem = item"
        >
          <p :class="{ isRegister__p: menuItem === item }">{{ item }}</p>
        </Button>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <Title
            text="Кабинет администратора"
            xs
          />
          <Text
            :text="userStore.user.email"
            xl
          />
        </div>
        <Button
          v-if="menuItem === 'ПУБЛИКАЦИИ'"
          black
          style="height: 40px"
          @click="isModalAddingOpen = true"
        >
          ДОБАВИТЬ ПУБЛИКАЦЮ
        </Button>
        <Button
          v-if="menuItem === 'НОВОСТИ'"
          black
          style="height: 40px"
          @click="isModalAddingNewsOpen = true"
        >
          ДОБАВИТЬ НОВОСТЬ
        </Button>
      </div>

      <MainPageTable
        v-if="menuItem === 'БИЛЕТЫ'"
        :items="myRequests"
      />
      <div v-if="menuItem === 'ПУБЛИКАЦИИ'">
        <Excursions />
        <Events />
      </div>
      <div v-if="menuItem === 'НОВОСТИ'">
        <News />
      </div>
    </div>
    <MainPage v-else />
  </PageContent>
  <ModalAddingNews
    :is-modal-adding-news-open="isModalAddingNewsOpen"
    @close="close"
  />
  <ModalAddingPublish
    :is-modal-adding-open="isModalAddingOpen"
    @close="close"
  />
</template>

<script lang="ts" setup>
  import { useEventsStore } from '@/entities/events';
  import Events from './Events.vue';
  import { useUserStore } from '@/entities/user';
  import { computed, onMounted, ref } from 'vue';
  import {
    Button,
    ModalAddingPublish,
    PageContent,
    Text,
    Title,
    ModalAddingNews,
  } from '@/components';
  import Excursions from './Excursions.vue';
  import { MainPage, MainPageTable } from '@/entities/main';
  import News from './News.vue';

  const eventsStore = useEventsStore();
  const userStore = useUserStore();
  const isModalAddingOpen = ref(false);
  const isModalAddingNewsOpen = ref(false);
  const myRequests = computed(() => userStore.user.requests);
  const menuItem = ref('БИЛЕТЫ');

  const menus = ['БИЛЕТЫ', 'ПУБЛИКАЦИИ', 'НОВОСТИ'];

  onMounted(async () => {
    await eventsStore.fetchAllArchiveEvents();
    if (userStore.user.username) await userStore.myRequests();
  });

  function close() {
    isModalAddingOpen.value = false;
    isModalAddingNewsOpen.value = false;
    eventsStore.fetchAllEvents;
  }
</script>

<style lang="scss">
  .main-page {
    &__gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__description {
      width: 900px;
      display: flex;

      &__button {
        width: 50%;
        display: flex;
        align-items: end;
        justify-content: end;
      }
    }

    &__description-block {
      display: flex;
      justify-content: end;
    }

    &__general-info {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
  .register {
    &__button {
      font-family: Roboto;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
      text-transform: uppercase;
    }
  }
  .isRegister {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;

    &__p {
      border-bottom: solid 2px #1e1e1e;
    }
  }

  @media (max-width: 750px) {
    .main-page__description {
      display: flex;
      width: auto;
    }
  }
</style>
