<template>
  <div class="button-group">
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
      <p :class="{ 'button-group__isActive': router.currentRoute.value.name === item.id }">
        {{ item.label }}
      </p>
    </RouterLink>
    <div
      class="button-group__profile-wrapper"
      @mouseenter="isShowProfile = true"
      @mouseleave="isShowProfile = false"
    >
      <p class="button-group__button">ЛИЧНЫЙ КАБИНЕТ</p>
      <NavbarDropdown :is-show-profile="isShowProfile" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFiltersStore } from '@/entities/filters/model';
  import { Filters } from '@/entities/filters/types';
  import { useUserStore } from '@/entities/user';
  import { router } from '@/router';
  import { computed, onMounted, ref } from 'vue';
  import NavbarDropdown from './NavbarDropdown.vue';

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
    { label: 'НОВОСТИ', id: 'news' },
  ];

  const allButtons = computed<{ label: string; id: Filters['page'] }[]>(() => {
    if (userStore.user.isAdmin === 1) {
      return [];
    }
    return buttons;
  });
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
