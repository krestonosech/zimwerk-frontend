<template>
  <div class="button-group">
    <div
      v-if="userStore.user.username"
      class="button-group__profile-wrapper"
      @mouseenter="isShowProfile = true"
      @mouseleave="isShowProfile = false"
    >
      <p class="button-group__button">ЛИЧНЫЙ КАБИНЕТ</p>
      <Transition name="dropdown">
        <div
          v-if="isShowProfile"
          class="profile-dropdown"
        >
          <RouterLink
            v-if="!userStore.user.isAdmin"
            :to="'/profile'"
            class="profile-dropdown__item"
            style="text-decoration: none"
          >
            {{ userStore.user.username }}
          </RouterLink>
          <p
            v-if="!userStore.user.isAdmin"
            style="padding: 10px 20px"
          >
            {{ userStore.user.email }}
          </p>
          <div
            class="profile-dropdown__item"
            @click="logout"
          >
            Выйти
          </div>
        </div>
      </Transition>
    </div>
    <RouterLink
      v-for="(item, index) in allButtons"
      :key="index"
      :to="`/${item.id}`"
      class="button-group__button"
      :class="{
        'button-group__button': filterStore.page !== item.id,
      }"
      @click="filterStore.page = item.id"
    >
      <p :class="{ 'button-group__isActive': filterStore.page === item.id }">{{ item.label }}</p>
    </RouterLink>
    <div class="button-group__button">
      <p>8(3012) 33-25-10</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFiltersStore } from '@/entities/filters/model';
  import { Filters } from '@/entities/filters/types';
  import { useUserStore } from '@/entities/user';
  import { router } from '@/router';
  import { computed, onMounted, ref } from 'vue';

  const filterStore = useFiltersStore();
  const userStore = useUserStore();
  const isShowProfile = ref(false);

  onMounted(() => {
    if (localStorage.getItem('token')) userStore.profileMe();
  });

  const buttons: { label: string; id: Filters['page'] }[] = [
    { label: 'О МУЗЕЕ', id: 'about-museum' },
    { label: 'ЭТНОЗООСАД', id: 'etnozoo' },
    { label: 'ЭКСКУРСИИ', id: 'excursions' },
    { label: 'СОБЫТИЯ', id: 'events' },
  ];

  const allButtons = computed<{ label: string; id: Filters['page'] }[]>(() => {
    if (userStore.user.isAdmin === 1) {
      return [];
    }
    return buttons;
  });

  function logout() {
    localStorage.removeItem('token');
    location.reload();
    router.push('/main');
  }
</script>
<style lang="scss" scoped>
  .button-group {
    display: flex;
    justify-content: space-around;
    gap: 4px;

    &__button {
      position: relative;
      padding: 0 10px;
      font-weight: 400;
      font-size: 16px;
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
    }
    &__profile-wrapper {
      position: relative;
      display: inline-block;
    }
    &__isActive {
      border-bottom: 2px solid #1e1e1e;
    }
  }

  .arrow-down {
    margin-left: 6px;
    font-size: 12px;
  }

  .profile-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    min-width: 160px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    z-index: 100;
    padding: 8px 0;
    display: flex;
    flex-direction: column;

    &__item {
      padding: 10px 20px;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.2s;
      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.2s;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
  }
  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
  }
  @media (max-width: 750px) {
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      &__isActive {
        width: 70%;
      }
    }
  }
</style>
