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
          class="main__fifth-buttons"
          :class="{ 'main__fifth-buttons--active': selected !== 'Ремонт двигателя' }"
          @click="selected = 'Ремонт двигателя'"
        >
          <img
            :src="settings"
            style="width: 24px; height: 24px"
            :style="{ filter: selected === 'Ремонт двигателя' ? 'brightness(0) invert(1)' : '' }"
          />
          <Text
            :black="selected !== 'Ремонт двигателя'"
            hover
            xl
            text="Ремонт двигателя"
          />
        </div>
        <div
          class="main__fifth-buttons"
          :class="{ 'main__fifth-buttons--active': selected !== 'Ремонт подвески' }"
          @click="selected = 'Ремонт подвески'"
        >
          <img
            :src="spring"
            style="width: 24px; height: 24px"
            :style="{ filter: selected === 'Ремонт подвески' ? 'brightness(0) invert(1)' : '' }"
          />
          <Text
            :black="selected !== 'Ремонт подвески'"
            hover
            xl
            text="Ремонт подвески"
          />
        </div>
        <div
          class="main__fifth-buttons"
          :class="{ 'main__fifth-buttons--active': selected !== 'Техобслуживание' }"
          @click="selected = 'Техобслуживание'"
        >
          <img
            :src="ink"
            style="width: 24px; height: 24px"
            :style="{ filter: selected === 'Техобслуживание' ? 'brightness(0) invert(1)' : '' }"
          />
          <Text
            :black="selected !== 'Техобслуживание'"
            hover
            xl
            text="Техобслуживание"
          />
        </div>
        <div
          class="main__fifth-buttons"
          :class="{ 'main__fifth-buttons--active': selected !== 'Диагностика' }"
          @click="selected = 'Диагностика'"
        >
          <img
            :src="search"
            style="width: 24px; height: 24px"
            :style="{ filter: selected === 'Диагностика' ? 'brightness(0) invert(1)' : '' }"
          />
          <Text
            :black="selected !== 'Диагностика'"
            hover
            xl
            text="Диагностика"
          />
        </div>
      </div>
      <div
        v-if="selected === 'Ремонт двигателя'"
        class="main__fifth-text"
      >
        <div class="main__fifth-text--el">
          <Text
            text="Мы предлагаем полный комплекс услуг по диагностике и ремонту ДВС. Наш техцентр оснащен современным оборудованием, работы выполняют специалисты высокого уровня, квалифицированные в ремонте двигателей. Это позволяет нам гарантировать высокий стандарт качества диагностики и ремонта."
          />
          <Button
            fixed
            @click="addRequest"
          >
            Оформить заявку
          </Button>
        </div>
        <img
          :src="engine"
          class="main__fifth-img"
        />
      </div>
      <div
        v-if="selected === 'Ремонт подвески'"
        class="main__fifth-text"
      >
        <div class="main__fifth-text--el">
          <Text
            text="В нашем сервисе мы проводим комплексную диагностику и ремонт подвески с использованием современного оборудования. Опытные мастера нашего сервиса используют стандарты производителя, оригинальные запчасти или проверенные аналоги высокого качества, тем самым гарантируя безопасность и надежность."
          />
          <Button
            fixed
            @click="addRequest"
          >
            Оформить заявку
          </Button>
        </div>
        <img
          :src="Spring"
          class="main__fifth-img"
        />
      </div>
      <div
        v-if="selected === 'Техобслуживание'"
        class="main__fifth-text"
      >
        <div class="main__fifth-text--el">
          <Text
            text="В нашем сервисном центре мы предлагаем профессиональное техобслуживание для всех моделей Volkswagen, Audi, Škoda и SEAT от 2009 г. Мы проводим полное техобслуживание, включая осмотр, замену масла и фильтров, проверку тормозной системы и подвески. Каждый процесс — от осмотра до обслуживания — тщательно контролируется."
          />
          <Button
            fixed
            @click="addRequest"
          >
            Оформить заявку
          </Button>
        </div>
        <img
          :src="instrumenti"
          class="main__fifth-img"
        />
      </div>
      <div
        v-if="selected === 'Диагностика'"
        class="main__fifth-text"
      >
        <div class="main__fifth-text--el">
          <Text
            text="Мы проводим высокоточную диагностику, чтобы выявить причины возникновения неисправностей и предложить оптимальные решения. Наши сотрудники диагностического центра - это высококвалифицированные специалисты с богатым опытом работы с автомобилями Volkswagen AG, хорошо знающие типичные проблемы конкретных моделей и способы их устранения."
          />
          <Button
            fixed
            @click="addRequest"
          >
            Оформить заявку
          </Button>
        </div>
        <img
          :src="diagnostic"
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
  import { ref } from 'vue';
  import './requests.scss';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useUserStore } from '../user';

  const userStore = useUserStore();
  const selected = ref('Ремонт двигателя');
  const isRegisterOpen = ref(false);
  const isModalOpen = ref(false);

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
