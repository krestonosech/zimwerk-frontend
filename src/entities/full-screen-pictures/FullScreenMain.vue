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
      <!--       <Button
        fixed
        @click="clickButton"
      >
        Оформить заявку
      </Button> -->
      <div></div>
    </div>
  </div>
  <Modal
    v-model:open="isModalOpen"
    :apply-button="'Оформить'"
    :title="'Подтверждение'"
    @close="closeModal"
    @apply="addRequest"
  >
    <Text
      black
      text="Вы уверены, что хотите оформить заявку?"
    />
  </Modal>
</template>

<script setup lang="ts">
  import { Title, Modal } from '@/components';
  import './full-screen-pictures.scss';
  import { defineEmits, ref } from 'vue';
  import { useUserStore } from '../user';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import Text from '@/components/Text.vue';

  const userStore = useUserStore();
  const emit = defineEmits(['scrollToSection']);
  const isModalOpen = ref(false);

  function closeModal() {
    isModalOpen.value = false;
  }

  /* function clickButton() {
    if (userStore.user.id) return (isModalOpen.value = true);
    emit('scrollToSection', 'request');
  } */

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
        closeModal();
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
