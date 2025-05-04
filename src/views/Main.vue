<!-- eslint-disable vue/no-parsing-error -->
<template>
  <PageContent>
    <div
      v-if="!userStore.user.isAdmin"
      class="main-page__general-info"
    >
      <div>
        <p class="main-page__title">Этнографический музей народов Забайкалья</p>
      </div>
      <div class="main-page__description-block">
        <div class="main-page__description">
          <p class="main-page__description__text">{{ DESCRIPTION_TEXT }}</p>
          <div class="main-page__description__button">
            <Button
              black
              @click="openModal"
            >
              КУПИТЬ БИЛЕТ
            </Button>
          </div>
        </div>
      </div>
      <Images
        :items="animals"
        only-images
      />
    </div>
    <div
      v-if="!userStore.user.isAdmin"
      class="main-page__events"
    >
      <EventsMainTitle />
      <List
        v-if="items"
        :items="items.slice(0, 3)"
        @register="isRegisterOpen = true"
        @open-item-model="item => openItemModal(item)"
      />
    </div>
    <div
      v-if="!userStore.user.isAdmin"
      class="main-page__gallery"
    >
      <p class="main-page__gallery-title">Галерея</p>
      <Images :items="images" />
    </div>
    <div
      v-else
      style="display: flex; flex-direction: column; gap: 40px"
    >
      <div style="display: flex; justify-content: space-between; align-items: center">
        <p class="main-page__tickets">{{ isTickets ? 'Билеты' : 'Публикации' }}</p>
        <Button
          v-if="!isTickets"
          black
          style="height: 40px"
          @click="isModalAddingOpen = true"
        >
          ДОБАВИТЬ ПУБЛИКАЦЮ
        </Button>
      </div>
      <div style="display: flex; justify-content: center">
        <Button
          transparent
          class="register__button"
          :class="{ isRegister: isTickets }"
          @click="isTickets = true"
        >
          <p :class="{ isRegister__p: isTickets }">БИЛЕТЫ</p>
        </Button>
        <Button
          transparent
          class="register__button"
          :class="{ isRegister: !isTickets }"
          @click="isTickets = false"
        >
          <p :class="{ isRegister__p: !isTickets }">ПУБЛИКАЦИИ</p>
        </Button>
      </div>

      <MainPageTable
        v-if="isTickets"
        :items="myRequests"
      />
      <div v-else>
        <Excursions />
        <Events />
      </div>
      <ModalAddingPublish
        :is-modal-adding-open="isModalAddingOpen"
        @close="closeAddPublish"
      />
    </div>
  </PageContent>
  <Modal
    v-model:open="isRegisterOpen"
    :apply-button="`${isRegister ? 'Зарегистрироваться' : 'Войти'}`"
    title="Личный кабинет"
    @close="closeModal"
    @apply="apply"
  >
    <Register
      v-model:is-register="isRegister"
      v-model:is-apply="isApply"
      @success="isRegisterOpen = false"
    />
  </Modal>
  <Modal
    v-model:open="isModalOpen"
    apply-button="Перейти к оплате"
    title="Входной билет на территорию этнографического музея"
    @close="closeModal"
    @apply="buyTicket"
  >
    <div class="ticket-buying">
      <div class="ticket-buying__lines">
        <p>Количество билетов:</p>
        <div class="ticket-buying__buttons">
          <img
            :src="Left"
            style="cursor: pointer"
            alt="Влево"
            @click="decrement"
          />
          <p>{{ count }}</p>
          <img
            :src="Right"
            style="cursor: pointer"
            alt="Вправо"
            @click="count++"
          />
        </div>
      </div>
      <div class="ticket-buying__lines">
        <p>К оплате:</p>
        <p>{{ price }} рублей</p>
      </div>
    </div>
  </Modal>
  <Modal
    v-model:open="isitemModalOpen"
    apply-button="Перейти к оплате"
    :title="itemName"
    @close="closeModal"
    @apply="buyEventTicket"
  >
    <div class="ticket-buying">
      <div class="ticket-buying__lines">
        <p>Количество билетов:</p>
        <div class="ticket-buying__buttons">
          <img
            :src="Left"
            style="cursor: pointer"
            alt="Влево"
            @click="decrement"
          />
          <p>{{ count }}</p>
          <img
            :src="Right"
            style="cursor: pointer"
            alt="Вправо"
            @click="count++"
          />
        </div>
      </div>
      <div class="ticket-buying__lines">
        <p>К оплате:</p>
        <p>{{ totalItemPrice }} рублей</p>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ModalAddingPublish, PageContent } from '@/components';
  import { Button } from '@/components/ui/button';
  import { DESCRIPTION_TEXT } from '@/entities/consts';
  import fox from '@/assets/main-images/fox.webp';
  import lynx from '@/assets/main-images/lynx.webp';
  import raccoon from '@/assets/main-images/raccoon.webp';
  import { EventsMainTitle } from '@/entities/events';
  import { List } from '@/components/ui/list';
  import { Images } from '@/components/ui/images';
  import firstFunfair from '@/assets/main-images/first-funfair.webp';
  import secondFunfair from '@/assets/main-images/second-funfair.webp';
  import thirdFunfair from '@/assets/main-images/third-funfair.webp';
  import { ListItemProps } from '@/components/ui/list/types';
  import { computed, onMounted, ref } from 'vue';
  import { useEventsStore } from '@/entities/events/model';
  import { useUserStore } from '@/entities/user';
  import { MainPageTable } from '@/entities/main-page';
  import { Modal } from '@/components/ui/modal';
  import Register from '@/components/Register.vue';
  import Left from '@/assets/icons/chevron-left.svg';
  import Right from '@/assets/icons/chevron-right.svg';
  import { showNotification } from '@/plugins/notifications';
  import { axios } from '@/plugins/axios';
  import Events from './Events.vue';
  import Excursions from './Excursions.vue';

  const eventsStore = useEventsStore();
  const userStore = useUserStore();
  const isRegisterOpen = ref<boolean>(false);
  const isModalOpen = ref<boolean>(false);
  const isitemModalOpen = ref(false);
  const isRegister = ref<boolean>(true);
  const isTickets = ref<boolean>(true);
  const isApply = ref<boolean>(false);
  const isModalAddingOpen = ref(false);
  const itemName = ref('');
  const items = computed<ListItemProps[] | undefined>(() => eventsStore.upcomingEvents);
  const count = ref(1);
  const price = computed(() => count.value * 400);
  const itemPrice = ref(0);
  const totalItemPrice = computed(() => itemPrice.value * count.value);
  const myRequests = computed(() => userStore.user.requests);
  const date = ref('');

  onMounted(async () => {
    await eventsStore.fetchAllArchiveEvents();
    if (userStore.user.username) await userStore.myRequests();
  });

  function openModal() {
    if (!localStorage.getItem('token')) {
      isRegisterOpen.value = true;
    } else {
      isModalOpen.value = true;
    }
  }

  async function buyEventTicket() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const data = {
        username: userStore.user.username,
        eventsName: itemName.value,
        count: count.value,
        email: userStore.user.email,
        date: date.value,
      };

      await axios.post('/request', data, config);
      showNotification({
        text: `Билет на ${itemName.value} куплен`,
        type: 'success',
      });
      closeModal();
    } catch {
      showNotification({
        text: 'Не удалось купить билет!',
        type: 'error',
      });
    }
  }

  function closeAddPublish() {
    isModalAddingOpen.value = false;
    eventsStore.fetchAllEvents;
  }

  function openItemModal(item: any) {
    if (!localStorage.getItem('token')) {
      return (isRegisterOpen.value = true);
    }
    itemPrice.value = item.price;
    date.value = item.date;
    itemName.value = item.name;
    isitemModalOpen.value = true;
  }

  function decrement() {
    if (count.value <= 1) return;
    count.value--;
  }

  function apply() {
    isApply.value = !isApply.value;
  }

  async function buyTicket() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const data = {
        username: userStore.user.username,
        eventsName: 'Входной билет на территорию этнографического музея',
        count: count.value,
        email: userStore.user.email,
      };

      await axios.post('/request', data, config);
      showNotification({
        text: `Билет на ${itemName.value} куплен`,
        type: 'success',
      });
      closeModal();
    } catch {
      showNotification({
        text: 'Не удалось купить билет!',
        type: 'error',
      });
    }
    isModalOpen.value = false;
  }

  function closeModal() {
    count.value = 1;
    itemName.value = '';
    itemPrice.value = 0;
    isitemModalOpen.value = false;
    isRegisterOpen.value = false;
    isModalOpen.value = false;
  }

  const images = [
    {
      id: 1,
      name: '«Ночь Ивана Купалы -2023»',
      url: firstFunfair,
    },
    {
      id: 2,
      name: '«Радужные гномы. Цветные истории»',
      url: secondFunfair,
    },
    {
      id: 3,
      name: 'Лесные байки – 2023',
      url: thirdFunfair,
    },
  ];

  const animals = [
    {
      id: 1,
      name: 'Лиса',
      url: fox,
    },
    {
      id: 2,
      name: 'Рысь',
      url: lynx,
    },
    {
      id: 3,
      name: 'Енот',
      url: raccoon,
    },
  ];
</script>

<style lang="scss" scoped>
  .ticket-buying {
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    font-weight: 400;
    font-size: 20px;
    gap: 10px;
    line-height: 24px;

    &__lines {
      display: flex;
      justify-content: space-between;
    }

    &__buttons {
      display: flex;
      gap: 15px;
      &__button {
        background-color: white;
        border: none;
      }
    }
  }
  .main-page {
    &__gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &-title {
        font-family: 'AA Stetica';
        font-weight: 400;
        font-size: 64px;
        line-height: 72px;
      }
    }

    &__events {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__description {
      width: 900px;
      display: flex;

      &__text {
        width: 50%;
        font-family: 'Roboto';
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0%;
      }

      &__button {
        width: 50%;
        display: flex;
        align-items: end;
        justify-content: end;
      }
    }

    &__description-block {
      display: flex;
      justify-content: end;
    }

    &__title {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 118px;
      line-height: 100%;
      letter-spacing: 0%;
      padding-bottom: 20px;
      border-bottom: solid black 2px;
    }

    &__tickets {
      font-family: AA Stetica;
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
      letter-spacing: 0%;
    }

    &__general-info {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
  .register {
    &__button {
      font-family: Roboto;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
      text-transform: uppercase;
    }
  }
  .isRegister {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;

    &__p {
      border-bottom: solid 2px #1e1e1e;
    }
  }

  @media (max-width: 1440px) {
    .main-page__title {
      font-size: 62px;
    }
  }
  @media (max-width: 750px) {
    .main-page__gallery-title {
      font-size: 40px;
    }
    .main-page__description {
      display: flex;
      width: auto;
    }
    .main-page__title {
      font-size: 40px;
    }
  }
</style>
