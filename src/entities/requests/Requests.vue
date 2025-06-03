<template>
  <div class="main__fifth__layout">
    <Title
      xs
      text="Наши услуги"
      black
    />
    <div class="main__fifth-all">
      <div class="main__fifth-all-buttons">
        <div
          v-for="(item, index) in buttons"
          :key="index"
          class="main__fifth-buttons"
          :class="{ 'main__fifth-buttons--active': selected !== item.text }"
          @click="selected = item.text"
        >
          <img
            :src="item.icon"
            style="width: 24px; height: 24px"
            :style="{ filter: selected === item.text ? 'brightness(0) invert(1)' : '' }"
          />
          <Text
            :class="{ 'main__fifth-buttons--active-text': selected !== item.text }"
            :black="selected !== item.text"
            hover
            xl
            :text="item.text"
          />
        </div>
      </div>

      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="main__fifth-text"
      >
        <div class="main__fifth-text--el">
          <Text :text="item.text" />
          <Button @click="addRequest">Оформить заявку</Button>
        </div>
        <img
          :src="item.image"
          class="main__fifth-img"
        />
      </div>
    </div>
  </div>
  <Modal
    v-model:open="isModalOpen"
    :apply-button="'Оформить'"
    :title="'Подтверждение'"
    @close="closeModal"
    @apply="clickButton"
  >
    <Text
      black
      text="Выберите дату и время:"
    />
    <VueDatePicker
      v-model="date"
      :time-picker="false"
      :min-date="minDate"
      class="register__input"
    />
    <div
      v-if="availableSlots.length"
      class="time-slots-container"
    >
      <button
        v-for="time in availableSlots"
        :key="time"
        class="time-slot-button"
        :class="{ 'time-slot-button--active': selectedTime === time }"
        @click="selectedTime = time"
      >
        {{ time }}
      </button>
    </div>
    <Text
      v-if="!availableSlots.length && aviableTime.length"
      black
      text="Нет доступных временных слотов для выбранной даты"
    />
  </Modal>
  <ModalRegisterAuth v-model:is-register-open="isRegisterOpen" />
</template>

<script lang="ts" setup>
  import settings from '@/assets/icons/settings.svg';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import search from '@/assets/icons/search.svg';
  import ink from '@/assets/icons/ink.svg';
  import spring from '@/assets/icons/spring.svg';
  import engine from '@/assets/images/engine.png';
  import instrumenti from '@/assets/images/instrumenti.png';
  import Spring from '@/assets/images/spring.png';
  import diagnostic from '@/assets/images/diagnostic.png';
  import { Button, Modal, ModalRegisterAuth, Text, Title } from '@/components';
  import { ref, computed, watch } from 'vue';
  import './requests.scss';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useUserStore } from '../user';
  import { AnotherItem } from '../goods';

  const buttons = [
    { text: 'Ремонт двигателя', icon: settings },
    { text: 'Ремонт подвески', icon: spring },
    { text: 'Техобслуживание', icon: ink },
    { text: 'Диагностика', icon: search },
  ];
  const items = [
    {
      text: 'Мы предлагаем полный комплекс услуг по диагностике и ремонту ДВС. Наш техцентр оснащен современным оборудованием, работы выполняют специалисты высокого уровня, квалифицированные в ремонте двигателей. Это позволяет нам гарантировать высокий стандарт качества диагностики и ремонта.',
      image: engine,
      title: 'Ремонт двигателя',
    },
    {
      text: 'В нашем сервисе мы проводим комплексную диагностику и ремонт подвески с использованием современного оборудования. Опытные мастера нашего сервиса используют стандарты производителя, оригинальные запчасти или проверенные аналоги высокого качества, тем самым гарантируя безопасность и надежность.',
      image: Spring,
      title: 'Ремонт подвески',
    },
    {
      text: 'В нашем сервисном центре мы предлагаем профессиональное техобслуживание для всех моделей Volkswagen, Audi, Škoda и SEAT от 2009 г. Мы проводим полное техобслуживание, включая осмотр, замену масла и фильтров, проверку тормозной системы и подвески. Каждый процесс — от осмотра до обслуживания — тщательно контролируется.',
      image: instrumenti,
      title: 'Техобслуживание',
    },
    {
      text: 'Мы проводим высокоточную диагностику, чтобы выявить причины возникновения неисправностей и предложить оптимальные решения. Наши сотрудники диагностического центра - это высококвалифицированные специалисты с богатым опытом работы с автомобилями Volkswagen AG, хорошо знающие типичные проблемы конкретных моделей и способы их устранения.',
      image: diagnostic,
      title: 'Диагностика',
    },
  ];
  const userStore = useUserStore();
  const selected = ref('Ремонт двигателя');
  const isRegisterOpen = ref(false);
  const isModalOpen = ref(false);
  const filteredItems = computed(() => items.filter(item => item.title === selected.value));
  const date = ref<Date | null>(null);
  const aviableTime = ref<AnotherItem[]>([]);
  const serviceDurations: Record<string, number> = {
    'Ремонт двигателя': 6,
    'Ремонт подвески': 5,
    Техобслуживание: 3,
    Диагностика: 2,
  };
  const bookedSlots = ref<AnotherItem[]>([]);
  const availableSlots = ref<string[]>([]);
  const WORK_START = 10;
  const WORK_END = 22;
  function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }

  const minDate = ref<Date>(getTomorrow());

  function timeToNumber(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h + m / 60;
  }

  function numberToTime(num: number): string {
    const h = Math.floor(num);
    const m = Math.round((num - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  function intervalsOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
    return start1 < end2 && start2 < end1;
  }

  function calculateAvailableSlots() {
    const duration = serviceDurations[selected.value];
    if (!duration) {
      availableSlots.value = [];
      return;
    }

    const busyIntervals = bookedSlots.value.map(slot => {
      const start = timeToNumber(slot.time);
      const slotDuration = serviceDurations[slot.service] || 1;
      const end = start + slotDuration;
      return { start, end };
    });

    const slots: string[] = [];

    for (let start = WORK_START; start + duration <= WORK_END; start += 0.5) {
      const end = start + duration;

      const conflict = busyIntervals.some(({ start: bStart, end: bEnd }) =>
        intervalsOverlap(start, end, bStart, bEnd)
      );

      if (!conflict) {
        slots.push(numberToTime(start));
      }
    }

    availableSlots.value = slots;
  }

  watch([date, selected], async () => {
    if (!date.value) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const data = {
        date: formatDate(date.value),
      };

      const response = await axios.post<AnotherItem[]>('/get-date', data, config);
      bookedSlots.value = response.data;

      calculateAvailableSlots();
    } catch (error) {
      showNotification({
        text: 'Не удалось получить доступные даты и время',
        type: 'error',
      });
    }
  });
  function closeModal() {
    isModalOpen.value = false;
    date.value = null;
    availableSlots.value = [];
    aviableTime.value = [];
    selectedTime.value = '';
  }

  function formatDate(date: Date) {
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    return `${day} ${monthName}`;
  }

  watch(
    () => date.value,
    async () => {
      if (!date.value) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const data = {
          date: formatDate(date.value),
        };

        const response = await axios.post('/get-date', data, config);
        aviableTime.value = response.data;
      } catch (error) {
        showNotification({
          text: 'Не удалось записаться!',
          type: 'error',
        });
      }
      if (availableSlots.value.length === 0 && aviableTime.value.length > 0) {
        return showNotification({
          text: 'На этот день больше нельзя записаться на эту услугу!',
          type: 'error',
        });
      }
    }
  );

  const selectedTime = ref('');

  async function clickButton() {
    if (!selectedTime.value) {
      showNotification({
        text: 'Пожалуйста, выберите время записи',
        type: 'error',
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const data = {
        username: userStore.user.username,
        service: selected.value,
        phone: userStore.user.phone,
        time: selectedTime.value,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        date: formatDate(date.value!),
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
  }

  async function addRequest() {
    if (userStore.user.id) {
      isModalOpen.value = true;
    } else {
      isRegisterOpen.value = true;
    }
  }

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
</script>

<style scoped>
  .time-slots-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }

  .time-slot-button {
    padding: 8px 16px;
    border: 1px solid #ccc;
    color: black;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .time-slot-button:hover {
    background-color: #f0f0f0;
  }

  .time-slot-button--active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
</style>
