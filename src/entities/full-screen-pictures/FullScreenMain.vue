<template>
  <div class="main__first">
    <div class="main__first--element">
      <br />
      <div>
        <Title
          xl
          text="Гарантия на запчасти и работы"
          up
        />
        <Title
          text="1 год или 20 000 км*"
          up
        />
      </div>
      <Button
        fixed
        @click="addRequest"
      >
        Оформить заявку
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Button, Title } from '@/components';
  import './full-screen-pictures.scss';
  import { defineEmits } from 'vue';
  import { useUserStore } from '../user';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';

  const userStore = useUserStore();
  const emit = defineEmits(['scrollToSection']);

  async function addRequest() {
    if (userStore.user.id) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const data = {
          username: userStore.user.username,
          service: 'Запись в центр',
          phone: userStore.user.phone,
        };

        await axios.post('/add-another-requests', data, config);

        showNotification({
          text: 'Вы записались!',
          type: 'success',
        });
      } catch (error) {
        showNotification({
          text: 'Не удалось записаться!',
          type: 'error',
        });
      }
    } else {
      emit('scrollToSection', 'request');
    }
  }
</script>
