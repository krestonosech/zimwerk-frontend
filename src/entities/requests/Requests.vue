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
      text="Вы уверены, что хотите оформить заявку?"
    />
  </Modal>
  <ModalRegisterAuth v-model:is-register-open="isRegisterOpen" />
</template>

<script lang="ts" setup>
  import settings from '@/assets/icons/settings.svg';
  import search from '@/assets/icons/search.svg';
  import ink from '@/assets/icons/ink.svg';
  import spring from '@/assets/icons/spring.svg';
  import engine from '@/assets/images/engine.png';
  import instrumenti from '@/assets/images/instrumenti.png';
  import Spring from '@/assets/images/spring.png';
  import diagnostic from '@/assets/images/diagnostic.png';
  import { Button, Modal, ModalRegisterAuth, Text, Title } from '@/components';
  import { ref, computed } from 'vue';
  import './requests.scss';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useUserStore } from '../user';

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

  function closeModal() {
    isModalOpen.value = false;
  }

  async function clickButton() {
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
  }

  async function addRequest() {
    if (userStore.user.id) {
      isModalOpen.value = true;
    } else {
      isRegisterOpen.value = true;
    }
  }
</script>
