<template>
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
        <p>{{ price }} рублей</p>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { Modal } from '@/components/ui/modal';
  import { useUserStore } from '@/entities/user';
  import { defineModel, ref, computed } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';

  const userStore = useUserStore();
  const isModalOpen = defineModel<boolean>('isModalOpen', { required: true });
  const count = ref(1);
  const price = computed(() => 400 * count.value);

  function decrement() {
    if (count.value <= 1) return;
    count.value--;
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
        text: 'Входной билет куплен',
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
    isModalOpen.value = false;
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
