<template>
  <Modal
    v-model:open="isModalShowCart"
    apply-button="Купить"
    title="Купить товары"
    @close="closeModal"
    @apply="buyGoods"
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-height: 340px;
        overflow-y: scroll;
      "
    >
      <div
        v-for="item in goodsStore.selectedGoods"
        :key="item.id"
        style="display: flex; justify-content: space-between; align-items: center"
      >
        <div style="display: flex; gap: 20px">
          <div style="display: flex; align-items: center">
            <img
              :src="`data:image/jpeg;base64,${item.image}`"
              alt="Изображение товара"
              style="width: 150px; height: 100px"
            />
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px">
            <Text
              xl
              black
              :text="item.name"
            />
            <Text
              black
              xs
              :text="item.description || 'У товара нет описания'"
              style="white-space: normal; word-break: break-word"
            />
            <Text
              black
              :text="`${item.price} ₽`"
            />
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="display: flex; align-items: center">
            <button @click="removeNumber(item.id)">
              <img
                :src="Minus"
                style="width: 16px; height: 16px"
                alt="Минус"
              />
            </button>
            <Text
              black
              :text="
                (goodsStore.selectedGoods.find(good => good.id === item.id)?.total ?? 0).toString()
              "
            />
            <button @click="addingNumber(item.max, item.id)">
              <img
                :src="Plus"
                style="width: 16px; height: 16px"
                alt="Плюс"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { defineModel, defineEmits } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { Modal, Text } from '@/components';
  import { useUserStore } from '@/entities/user';
  import { useGoodsStore } from '@/entities/goods';
  import Plus from '@/assets/icons/plus.svg';
  import Minus from '@/assets/icons/minus.svg';

  const goodsStore = useGoodsStore();
  const userStore = useUserStore();
  const isModalShowCart = defineModel<boolean>('isModalShowCart', { required: true });
  const emit = defineEmits(['close', 'success']);

  function closeModal() {
    isModalShowCart.value = false;
    emit('close');
  }

  async function buyGoods() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      for (const item of goodsStore.selectedGoods) {
        const data = {
          username: userStore.user.username,
          service: 'Покупка запчастей',
          name: item.name,
          description: item.description,
          price: item.price,
          total: item.total,
        };

        await axios.post('/add-requests', data, config);
      }

      closeModal();
      showNotification({
        text: 'Заберите заказ через 2 дня в нашем центре',
        type: 'success',
      });
      emit('success');
      goodsStore.selectedGoods = [];
    } catch (error) {
      showNotification({
        text: 'Не удалось выполнить покупку!',
        type: 'error',
      });
    }
  }

  function removeNumber(id: number) {
    const existing = goodsStore.selectedGoods.find(good => good.id === id);
    if (!existing) return;

    if (existing.total > 1) {
      existing.total--;
    } else {
      removeFromCart(id);
    }
  }

  function removeFromCart(id: number) {
    const index = goodsStore.selectedGoods.findIndex(good => good.id === id);
    if (index !== -1) {
      goodsStore.selectedGoods.splice(index, 1);
    }
  }

  function addingNumber(max: number, id: number) {
    const existing = goodsStore.selectedGoods.find(good => good.id === id);
    if (!existing) return;

    if (existing.total < max) {
      existing.total++;
    } else {
      showNotification({
        text: 'Больше товаров нет',
        type: 'error',
      });
    }
  }
</script>

<style lang="scss" scoped></style>
