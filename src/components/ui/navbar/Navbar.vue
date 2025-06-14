<template>
  <div
    class="navbar"
    :class="{ 'navbar--hidden': !isNavbarVisible }"
  >
    <div class="navbar__container">
      <button
        class="navbar__burger"
        aria-label="Toggle menu"
        @click="isBurgerOpen = !isBurgerOpen"
      >
        <span :class="{ 'burger-line': true, open: isBurgerOpen }"></span>
        <span :class="{ 'burger-line': true, open: isBurgerOpen }"></span>
        <span :class="{ 'burger-line': true, open: isBurgerOpen }"></span>
      </button>

      <div
        class="navbar__tabs"
        :class="{ 'navbar__tabs--open': isBurgerOpen }"
      >
        <button
          class="navbar__tabs--elements"
          @click="
            emit('scrollToSection', 'cars');
            closeBurger();
          "
        >
          <Text text="Марки авто" />
        </button>
        <button
          class="navbar__tabs--elements"
          @click="
            emit('scrollToSection', 'requests');
            closeBurger();
          "
        >
          <Text text="Наши услуги" />
        </button>
        <button
          v-if="!token"
          class="navbar__tabs--elements"
          @click="
            isRegisterOpen = true;
            closeBurger();
          "
        >
          <Text text="Вход / Регистрация" />
        </button>
        <div
          v-else
          class="navbar__user"
          style="position: relative; display: inline-block"
          @mouseenter="isDropdownOpen = true"
          @mouseleave="isDropdownOpen = false"
        >
          <Text
            class="navbar__tabs--elements"
            style="cursor: pointer"
            :text="username"
          />

          <transition name="dropdown">
            <div
              v-if="isDropdownOpen"
              class="profile-dropdown"
            >
              <button
                class="profile-dropdown__item"
                @click="
                  router.push('/profile');
                  closeBurger();
                "
              >
                <Text
                  xs
                  black
                  text="Профиль"
                />
              </button>
              <button
                class="profile-dropdown__item"
                @click="onLogoutClick"
              >
                <Text
                  xs
                  black
                  text="Выйти"
                />
              </button>
            </div>
          </transition>
        </div>
        <button
          class="navbar__tabs--elements"
          @click="
            emit('scrollToSection', 'about-us');
            closeBurger();
          "
        >
          <Text text="О нас" />
        </button>
        <button
          class="navbar__tabs--elements"
          @click="
            emit('scrollToSection', 'contacts');
            closeBurger();
          "
        >
          <Text text="Контакты" />
        </button>
      </div>
    </div>
  </div>
  <ModalRegisterAuth v-model:is-register-open="isRegisterOpen" />
</template>

<script setup lang="ts">
  import { ModalRegisterAuth, Text } from '@/components';
  import { computed, defineEmits, onMounted, ref, onUnmounted } from 'vue';
  import './navbar.scss';
  import { useUserStore } from '@/entities/user';
  import { router } from '@/router';

  const userStore = useUserStore();
  const isRegisterOpen = ref(false);
  const token = computed(() => userStore.user.username);
  const emit = defineEmits(['scrollToSection']);
  const username = computed(() => userStore.user.username);
  const isDropdownOpen = ref(false);
  const isBurgerOpen = ref(false);
  const isNavbarVisible = ref(true);
  const lastScrollPosition = ref(0);
  const scrollThreshold = 100;

  onMounted(async () => {
    if (token.value) userStore.profileMe();
    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  function onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 30) return;

    if (
      currentScrollPosition < lastScrollPosition.value ||
      currentScrollPosition < scrollThreshold ||
      isBurgerOpen.value ||
      window.innerWidth <= 768
    ) {
      isNavbarVisible.value = true;
    } else {
      isNavbarVisible.value = false;
    }

    lastScrollPosition.value = currentScrollPosition;
  }

  function onLogoutClick() {
    localStorage.removeItem('token');
    userStore.user.email = '';
    userStore.user.requests = [];
    userStore.user.id = 0;
    userStore.user.username = '';
    userStore.user.phone = null;
    location.reload();
  }

  function closeBurger() {
    isBurgerOpen.value = false;
  }
</script>
