<template>
  <div class="main-layout">
    <div class="main-layout__content">
      <Navbar />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Footer } from '@/components/ui/footer';
  import { Navbar } from '@/components/ui/navbar';
</script>

<style lang="scss" scoped>
  .main-layout {
    min-height: 100vh;
    background-image: url('@/assets/main-images/MainElement.svg');
    background-repeat: repeat-y;
    background-position: left top;
    &__content {
      padding: 30px 40px;
    }
  }
</style>
