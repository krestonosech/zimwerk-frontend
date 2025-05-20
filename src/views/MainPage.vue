<template>
  <div
    v-if="!isAdmin && !loading"
    class="main"
  >
    <Navbar @scroll-to-section="(item: string) => scrollToSection(item)" />
    <FullScreenMain @scroll-to-section="(item: string) => scrollToSection(item)" />
    <Preview />
    <AboutPreview />
    <Cars id="cars" />
    <div class="main__fifth">
      <Requests id="requests" />
      <AllGoods />
      <div style="width: 1440px; padding-bottom: 40px">
        <Title
          black
          xs
          text="Почему именно ZIMWERK?"
        />
      </div>
    </div>
    <Quelities />
    <FullScreenPictures1 />
    <FullScreenPictures2 />
    <Request
      v-if="!username"
      id="request"
    />
    <Contacts id="contacts" />
    <AboutUs id="about-us" />
  </div>
  <div v-else>
    <AdminPanel />
  </div>
</template>

<script lang="ts" setup>
  import { Cars } from '@/entities/cars';
  import { Requests } from '@/entities/requests';
  import { Quelities } from '@/entities/qualities';
  import { Contacts } from '@/entities/contacts';
  import { AboutUs } from '@/entities/about-us';
  import { Request } from '@/entities/request';
  import {
    FullScreenMain,
    FullScreenPictures1,
    FullScreenPictures2,
  } from '@/entities/full-screen-pictures';
  import { Navbar } from '@/components/ui/navbar';
  import { AboutPreview, Preview } from '@/entities/preview';
  import './MainPage.scss';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useUserStore } from '@/entities/user';
  import { computed, onMounted, ref } from 'vue';
  import { Title } from '@/components';
  import { AllGoods } from '@/entities/all-goods';
  import { AdminPanel } from '@/entities/admin-panel';

  const userStore = useUserStore();
  const username = computed(() => userStore.user.username);
  const isAdmin = computed(() => userStore.user.isAdmin);
  const token = computed(() => localStorage.getItem('token'));
  const loading = ref(false);
  function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMounted(async () => {
    loading.value = true;
    if (token.value) userStore.profileMe();
    loading.value = false;
  });

  setInterval(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.post('/refresh', {}, config);
      localStorage.setItem('token', response.data.token);
    } catch {
      showNotification({
        type: 'error',
        text: 'Не удалось запросить события!',
      });
    }
  }, 144000);
</script>
