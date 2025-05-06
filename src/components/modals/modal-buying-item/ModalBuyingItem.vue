<template>
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
            src="@/assets/icons/chevron-left.svg"
            style="cursor: pointer"
            alt="Влево"
            @click="decrement"
          />
          <p>{{ count }}</p>
          <img
            src="@/assets/icons/chevron-right.svg"
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
  import { Modal } from '@/components/ui/modal';
  import { useUserStore } from '@/entities/user';
  import { defineModel, ref, defineProps, computed } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';

  const props = defineProps<{
    itemName: string;
    itemPrice: number;
    date: string;
  }>();
  const userStore = useUserStore();
  const isitemModalOpen = defineModel<boolean>('isitemModalOpen', { required: true });
  const count = ref(1);
  const totalItemPrice = computed(() => props.itemPrice * count.value);

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
        eventsName: props.itemName,
        count: count.value,
        email: userStore.user.email,
        date: props.date,
      };

      await axios.post('/request', data, config);
      showNotification({
        text: `Билет на ${props.itemName} куплен`,
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

  function closeModal() {
    isitemModalOpen.value = false;
  }
</script>

<style scoped lang="scss">
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
</style>
