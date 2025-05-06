<template>
  <Modal
    v-model:open="isModalAddingNewsOpen"
    apply-button="Добавить"
    title="Добавить публикацию"
    @close="closeModal"
    @apply="addRequest"
  >
    <div class="register">
      <input
        v-model="title"
        class="register__input"
        placeholder="Название новости"
      />
      <input
        v-model="text"
        class="register__input"
        placeholder="Текст новости"
      />
      <input
        v-model="description"
        class="register__input"
        placeholder="Описание новости"
      />
      <input
        type="file"
        class="register__input"
        placeholder="картинка"
        @change="onFileChange"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { defineModel, ref, defineEmits } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { Modal } from '@/components';

  const isModalAddingNewsOpen = defineModel<boolean>('isModalAddingNewsOpen', { required: true });
  const emit = defineEmits(['close']);
  const title = ref('');
  const text = ref('');
  const description = ref('');
  const image = ref<File | null>(null);

  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      image.value = target.files[0];
    } else {
      image.value = null;
    }
  }

  function closeModal() {
    isModalAddingNewsOpen.value = false;
    emit('close');
  }

  async function addRequest() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const formData = new FormData();
      formData.append('title', title.value);
      formData.append('text', text.value);
      formData.append('description', description.value);
      if (image.value) {
        formData.append('image', image.value);
      }

      await axios.post('/add-news', formData, config);
      closeModal();
      showNotification({
        text: 'Новость создана!',
        type: 'success',
      });
    } catch {
      showNotification({
        text: 'Не удалось добавить новость!',
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

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
    }
  }
</style>
