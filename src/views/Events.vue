<template>
  <PageContent>
    <div class="events">
      <p class="events__title">События</p>
      <EventsChips />
      <List
        v-if="upcomingEvents?.length"
        :items="upcomingEvents"
        @open-item-model="item => openItemModal(item)"
      />
      <div v-else>
        <p class="events__p">Нет предстоящих событий такого типа</p>
      </div>
    </div>
    <div class="events">
      <p class="events__title">Архив</p>
      <ArchiveChips />
      <List
        v-if="archivedEvents?.length"
        :items="archivedEvents"
        excursions
      />
      <div v-else>
        <p class="events__p">Нет архивированных событий такого типа</p>
      </div>
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
  import { PageContent } from '@/components';
  import { List } from '@/components/ui/list';
  import { computed, onMounted, ref } from 'vue';
  import { ListItemProps } from '@/components/ui/list/types';
  import { useEventsStore } from '@/entities/events/model';
  import { EventsChips } from '@/components/ui/chips/events-chips';
  import { ArchiveChips } from '@/components/ui/chips/archive-chips';
  import Left from '@/assets/icons/chevron-left.svg';
  import Right from '@/assets/icons/chevron-right.svg';
  import { Modal } from '@/components/ui/modal';
  import { showNotification } from '@/plugins/notifications';
  import { useUserStore } from '@/entities/user';
  import { axios } from '@/plugins/axios';
  import Register from '@/components/Register.vue';

  const userStore = useUserStore();
  const eventsStore = useEventsStore();
  const upcomingEvents = computed<ListItemProps[] | undefined>(() => eventsStore.upcomingEvents);
  const archivedEvents = computed<ListItemProps[] | undefined>(() => eventsStore.archivedEvents);
  const isitemModalOpen = ref(false);
  const count = ref(1);
  const itemPrice = ref(0);
  const itemName = ref('');
  const totalItemPrice = computed(() => itemPrice.value * count.value);
  const isRegister = ref<boolean>(true);
  const isRegisterOpen = ref<boolean>(false);
  const isApply = ref<boolean>(false);

  onMounted(() => {
    eventsStore.fetchAllArchiveEvents('Все');
    eventsStore.fetchAllEvents('Все');
  });

  function decrement() {
    if (count.value <= 1) return;
    count.value--;
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

  function apply() {
    isApply.value = !isApply.value;
  }

  function openItemModal(item: any) {
    if (!localStorage.getItem('token')) {
      return (isRegisterOpen.value = true);
    }
    itemPrice.value = item.price;
    itemName.value = item.name;
    isitemModalOpen.value = true;
  }

  function closeModal() {
    count.value = 1;
    itemName.value = '';
    itemPrice.value = 0;
    isitemModalOpen.value = false;
    isRegisterOpen.value = false;
  }
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
  .events {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__title {
      font-family: AA Stetica;
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
      letter-spacing: 0%;
    }
    &__p {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0%;
    }
  }
  @media (max-width: 750px) {
    .events {
      &__title {
        font-size: 40px;
      }
    }
  }
</style>
