<template>
  <Transition name="dropdown">
    <div
      v-if="isShowProfile && userStore.user.username"
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
  <Transition name="dropdown">
    <div
      v-if="isShowProfile && !userStore.user.username"
      class="profile-dropdown"
    >
      <div
        v-if="!userStore.user.isAdmin"
        class="profile-dropdown__item"
        style="text-decoration: none"
        @click="
          isRegisterOpen = true;
          isRegister = false;
          isApply = !isApply;
        "
      >
        Авторизация
      </div>
      <div
        v-if="!userStore.user.isAdmin"
        class="profile-dropdown__item"
        style="text-decoration: none"
        @click="
          isRegisterOpen = true;
          isRegister = true;
          isApply = !isApply;
        "
      >
        Регистрация
      </div>
    </div>
  </Transition>
  <ModalRegisterAuth
    :is="isRegister"
    v-model:isRegisterOpen="isRegisterOpen"
  />
</template>

<script lang="ts" setup>
  import { ModalRegisterAuth } from '@/components';
  import { useUserStore } from '@/entities/user';
  import { router } from '@/router';
  import { ref, defineModel } from 'vue';

  const userStore = useUserStore();
  const isRegisterOpen = ref<boolean>(false);
  const isRegister = ref<boolean>(true);
  const isApply = ref<boolean>(false);
  const isShowProfile = defineModel<boolean>('isShowProfile', { required: true });

  function logout() {
    localStorage.removeItem('token');
    userStore.user.email = '';
    userStore.user.requests = [];
    userStore.user.username = '';
    userStore.user.id = 0;
    router.push('/main');
    location.reload();
  }
</script>
<style lang="scss" scoped>
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
</style>
