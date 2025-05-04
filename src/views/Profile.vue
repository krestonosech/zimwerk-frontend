<template>
  <PageContent>
    <div class="profile">
      <div class="profile__header">
        <p class="profile__title">Личный кабинет</p>
        <div class="profile__info">
          <p class="profile__info__username">{{ userStore.user.username }}</p>
          <p class="profile__info__email">{{ userStore.user.email }}</p>
        </div>
      </div>
      <MainPageTable :items="myRequests" />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent } from '@/components';
  import { MainPageTable } from '@/entities/main-page';
  import { useUserStore } from '@/entities/user';
  import { computed, onMounted } from 'vue';

  const userStore = useUserStore();
  const myRequests = computed(() => userStore.user.requests);

  onMounted(async () => {
    await userStore.myRequests();
  });
</script>

<style lang="scss" scoped>
  .profile {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__header {
      display: flex;
      gap: 10px;
      padding: 10px 0;
    }
    &__title {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 118px;
      line-height: 100%;
      letter-spacing: 0%;
      padding-bottom: 20px;
    }
    &__info {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      justify-content: center;
      width: 30%;
      &__username {
        display: flex;
        justify-content: end;
        width: 100%;
        font-family: AA Stetica;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
      }
      &__email {
        display: flex;
        justify-content: end;
        width: 100%;
        font-family: AA Stetica;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
      }
    }
  }
  @media (max-width: 750px) {
    .profile {
      &__header {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
    .profile__info {
      width: 100%;
    }
  }
</style>
