<template>
  <Modal
    v-model:open="isModalAddingOpen"
    apply-button="Добавить"
    title="Добавить публикацию"
    @close="closeModal"
    @apply="addRequest"
  >
    <div class="register">
      <input
        v-model="typePublish"
        class="register__input"
        placeholder="Тип публикации"
      />
      <input
        v-model="name"
        class="register__input"
        placeholder="Название"
      />
      <input
        v-model="type"
        class="register__input"
        placeholder="Тег"
      />
      <input
        v-model="description"
        class="register__input"
        placeholder="Описание"
      />
      <datepicker
        v-model="picked"
        class="register__input"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import Modal from './ui/modal/Modal.vue';
  import Datepicker from 'vue3-datepicker';
  import { defineModel, ref, defineEmits } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';

  const isModalAddingOpen = defineModel<boolean>('isModalAddingOpen', { required: true });

  const emit = defineEmits(['close']);
  const typePublish = ref('');
  const name = ref('');
  const type = ref('');
  const picked = ref(new Date());
  const description = ref('');

  function formatTodayMonthWithDay() {
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    const today = picked.value;
    const monthName = months[today.getMonth()];
    const day = today.getDate();
    return `${day} ${monthName}`;
  }

  function closeModal() {
    isModalAddingOpen.value = false;
    emit('close');
  }

  async function addRequest() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const data = {
        date: formatTodayMonthWithDay(),
        type: type.value,
        name: name.value,
        typePublish: typePublish.value,
        description: description.value,
      };

      await axios.post('/add-publish', data, config);
      closeModal();
      showNotification({
        text: 'Публикация создана!',
        type: 'success',
      });
    } catch {
      showNotification({
        text: 'Не удалось добавить публикацию!',
        type: 'error',
      });
    }
  }
</script>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__input {
      border: none;
      border-bottom: solid 1px #bababa;
      width: 550;
      height: 44;
      padding: 10px;
      gap: 10px;
      border-bottom-width: 1px;
    }

    &__input::placeholder {
      text-align: center;
    }

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
    }
  }
</style>
