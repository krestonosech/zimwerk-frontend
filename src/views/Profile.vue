<template>
  <PageContent>
    <div class="profile">
      <div class="profile__header">
        <Title text="Личный кабинет" />
        <div class="profile__info">
          <p class="profile__info__username">{{ userStore.user.username }}</p>
          <p class="profile__info__email">{{ userStore.user.email }}</p>
        </div>
      </div>
      <MainPageTable
        v-if="myRequests.length !== 0"
        :items="myRequests"
      />
      <p v-else>Вы пока не купили ни один билет!</p>
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Title } from '@/components';
  import { MainPageTable } from '@/entities/main';
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
