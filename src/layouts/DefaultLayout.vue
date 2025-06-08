<template>
  <div class="main-layout">
    <div class="main-layout--style">
      <router-view />
    </div>
  </div>
  <NotificationAlert />
</template>

<script lang="ts" setup>
  import { NotificationAlert } from '@/components';

  const targetElement = document.querySelector('#target-section');
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetPosition, 1500);
  }

  function smoothScrollTo(targetY: number, duration = 1000) {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
</script>

<style lang="scss" scoped>
  .main-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    justify-content: center;
    background: linear-gradient(to top, #2639fa, #000b53);
    &--style {
      width: 1440px;
    }
  }

  @media (max-width: 1440px) {
    .main-layout {
      &--style {
        width: 100%;
      }
    }
  }
</style>
