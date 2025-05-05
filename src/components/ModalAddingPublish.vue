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
      <VueDatePicker
        v-model="date"
        multi-calendars
        range
        :time-picker="false"
        class="register__input"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import Modal from './ui/modal/Modal.vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { defineModel, ref, defineEmits, onMounted } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useEventsStore } from '@/entities/events/model';

  const eventStore = useEventsStore();
  const isModalAddingOpen = defineModel<boolean>('isModalAddingOpen', { required: true });
  const emit = defineEmits(['close']);
  const typePublish = ref('');
  const name = ref('');
  const type = ref('');
  const date = ref();

  onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    date.value = [startDate, endDate];
  });
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

    if (Array.isArray(date.value) && date.value.length === 2 && date.value[0] && date.value[1]) {
      const [start, end] = date.value;
      const startDay = start.getDate();
      const startMonth = months[start.getMonth()];
      const endDay = end.getDate();
      const endMonth = months[end.getMonth()];

      if (
        start.getDate() === end.getDate() &&
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
      ) {
        return `${startDay} ${startMonth}`;
      } else if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${startDay} - ${endDay} ${startMonth}`;
      } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
      }
    } else if (date.value instanceof Date) {
      const day = date.value.getDate();
      const monthName = months[date.value.getMonth()];
      return `${day} ${monthName}`;
    }
    return '';
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
      await eventStore.fetchAllEvents();
      await eventStore.fetchAllArchiveEvents();
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
