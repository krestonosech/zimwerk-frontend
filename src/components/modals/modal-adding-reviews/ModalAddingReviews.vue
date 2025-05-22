<template>
  <Modal
    v-model:open="isModalAddingReviewsOpen"
    :apply-button="'Добавить'"
    :title="'Оставьте комментарий о нашем магазине!'"
    @close="closeModal"
    @apply="buyGoods"
  >
    <div
      class="register"
      style="align-items: center"
    >
      <div style="display: flex; justify-content: center; gap: 10px">
        <div
          v-for="star in 5"
          :key="star"
          style="cursor: pointer"
          @mouseover="hoveredRating = star"
          @mouseleave="hoveredRating = 0"
          @click="review = star"
        >
          <img
            style="width: 50px; height: 50px"
            :src="isStarActive(star) ? Star : StarOutline"
            alt="Star"
          />
        </div>
      </div>
      <input
        v-model="description"
        class="register__input"
        placeholder="Описание товара"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { defineModel, ref, defineEmits } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import Star from '@/assets/icons/star.svg';
  import StarOutline from '@/assets/icons/star_outline.svg';
  import { Modal } from '@/components';
  import { useUserStore } from '@/entities/user';

  const userStore = useUserStore();
  const isModalAddingReviewsOpen = defineModel<boolean>('isModalAddingReviewsOpen', {
    required: true,
  });
  const emit = defineEmits(['close', 'success']);
  const review = ref(1);
  const description = ref('');
  const hoveredRating = ref(1);

  function isStarActive(starNumber: number) {
    return starNumber <= (hoveredRating.value || review.value);
  }

  function closeModal() {
    isModalAddingReviewsOpen.value = false;
    review.value = 0;
    hoveredRating.value = 0;
    description.value = '';
    emit('close');
  }

  async function buyGoods() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const data = {
        username: userStore.user.username,
        text: description.value,
        review: review.value,
      };

      await axios.post('/send-review', data, config);

      closeModal();
      showNotification({
        text: 'Спасибо за отзыв!',
        type: 'success',
      });
      emit('success');
    } catch (error) {
      showNotification({
        text: 'Не удалось оставить отзыв',
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
