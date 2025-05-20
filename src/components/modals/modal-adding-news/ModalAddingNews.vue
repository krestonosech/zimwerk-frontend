<template>
  <Modal
    v-model:open="isModalAddingNewsOpen"
    :apply-button="isChange ? 'Изменить' : 'Добавить'"
    :title="isChange ? 'Изменить товар' : 'Добавить товар'"
    :is-delete-item="isChange"
    @delete="deleteGood"
    @close="closeModal"
    @apply="addRequest"
  >
    <div
      class="register"
      style="align-items: center"
    >
      <input
        v-model="name"
        class="register__input"
        placeholder="Название товара"
      />
      <input
        v-model="description"
        class="register__input"
        placeholder="Описание товара"
      />
      <input
        v-model="price"
        class="register__input"
        placeholder="Цена товара"
      />
      <select
        v-model="type"
        class="register__input"
        placeholder="Цена товара"
      >
        <option value="Моторы"><Text text="Моторы" /></option>
        <option value="Электрооборудование"><Text text="Электрооборудование" /></option>
        <option value="Топливо"><Text text="Топливо" /></option>
        <option value="Рулевое управление"><Text text="Рулевое управление" /></option>
      </select>
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
  import { defineModel, ref, defineEmits, defineProps, watch } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { Modal, Text } from '@/components';

  const isModalAddingNewsOpen = defineModel<boolean>('isModalAddingNewsOpen', { required: true });
  const props = defineProps<{
    id?: number;
    name?: string;
    price?: string;
    description?: string;
    image?: string;
    type?: string;
    isChange?: boolean;
  }>();
  const emit = defineEmits(['close', 'success']);
  const name = ref('');
  const price = ref('');
  const type = ref('');
  const description = ref('');
  const image = ref<File | null>(null);

  watch(
    () => props.id,
    () => {
      name.value = props.name ?? '';
      description.value = props.description ?? '';
      price.value = props.price ?? '';
      type.value = props.type ?? '';
    }
  );

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
      formData.append('name', name.value);
      formData.append('price', price.value);
      formData.append('description', description.value);
      formData.append('type', type.value);
      if (image.value) {
        formData.append('image', image.value);
      }
      if (props.id) {
        formData.append('id', props.id.toString());
      }
      if (props.isChange) {
        await axios.post('/change-good', formData, config);
        showNotification({
          text: 'Новость изменена!',
          type: 'success',
        });
      } else {
        await axios.post('/add-good', formData, config);
        showNotification({
          text: 'Новость создана!',
          type: 'success',
        });
      }
      closeModal();
      emit('success');
    } catch {
      if (props.isChange) {
        showNotification({
          text: 'Не удалось изменить товар!',
          type: 'error',
        });
      } else {
        showNotification({
          text: 'Не удалось добавить товар!',
          type: 'error',
        });
      }
    }
  }

  async function deleteGood() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.post('/delete-good', { id: props.id }, config);
      closeModal();
      showNotification({
        text: 'Товар удален!',
        type: 'success',
      });
      closeModal();
      emit('success');
    } catch {
      showNotification({
        text: 'Не удалось удались товар!',
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
      min-height: 44px;
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

  button {
    background-color: transparent;
    padding: 20px;
    border: none;
    cursor: pointer;
    color: black !important;
  }

  input {
    padding-left: 30px !important;
    border: solid white 2px !important;
    border-bottom: solid black 1px !important;
  }
  input:focus {
    border-bottom: solid black 1px !important;
    border: solid black 2px !important;
  }

  select {
    border-radius: 30px;
    height: 71px;
    padding: 0 40px;
    border: solid white 2px !important;
    border-bottom: solid black 1px !important;
    width: 508px;
  }
  select:focus {
    border-bottom: solid black 1px !important;
    border: solid black 2px !important;
  }
  select,
  option {
    font-family: 'YourFont', sans-serif;
    font-size: 18px;
    text-align: center;
  }
</style>
