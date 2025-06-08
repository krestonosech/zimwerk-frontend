<template>
  <div
    v-if="!isAdmin && !loading"
    class="main"
  >
    <Navbar @scroll-to-section="(item: string) => scrollToSection(item)" />
    <FullScreenMain @scroll-to-section="(item: string) => scrollToSection(item)" />
    <div
      style="
        width: 100vw;
        background-color: rgb(0, 0, 29);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <div style="max-width: 1440px">
        <Preview />
        <AboutPreview />
      </div>
    </div>
    <Cars id="cars" />
    <div class="main__fifth">
      <div id="requests">
        <Requests />
      </div>
      <AllGoods />
      <div style="width: 1440px; padding-bottom: 40px">
        <Title
          id="contacts"
          black
          xs
          text="Почему именно ZIMWERK?"
        />
      </div>
    </div>
    <div>
      <Quelities />
    </div>

    <FullScreenPictures1 />
    <FullScreenPictures2 />
    <!-- <Request
      v-if="!username"
      id="request"
    /> -->
    <Contacts />
    <div id="about-us">
      <AboutUs />
    </div>
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
