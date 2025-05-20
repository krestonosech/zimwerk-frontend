<template>
  <div class="main__second">
    <img
      class="circle-logo"
      :src="CircleLogo"
      alt="CircleLogo"
    />
    <div>
      <Title
        xs
        text="Владимир Шубин"
      />
      <Text
        xl
        text="владелец автосервиса ZimWerk"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Text, Title } from '@/components';
  import CircleLogo from '@/assets/icons/circle-logo.webp';
  import './preview.scss';
</script>
