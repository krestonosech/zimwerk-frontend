<template>
  <div class="main__good">
    <div style="display: flex; justify-content: center">
      <img
        :src="`data:image/jpeg;base64,${props.item.image}`"
        alt="Изображение товара"
        style="width: 300px; height: 200px"
      />
    </div>

    <Title
      black
      xs
      :text="`${props.item.price} ₽`"
    />
    <Text
      black
      :text="`${props.item.name}`"
    />
    <div style="display: flex; justify-content: center">
      <button
        v-if="!isInCart"
        style="background-color: white; border-radius: 20px; width: 100%"
        @click="putInCart(props.item)"
      >
        <Text
          black
          text="Положить в корзину"
        />
      </button>
      <div
        v-else
        style="
          background-color: white;
          border-radius: 20px;
          height: 68px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <button @click="removeNumber(props.item.id)">
          <img
            :src="Minus"
            style="width: 16px; height: 16px"
            alt="Минус"
          />
        </button>
        <Text
          black
          :text="currentQuantity.toString()"
        />
        <button @click="addingNumber(props.item.max, props.item.id)">
          <img
            :src="Plus"
            style="width: 16px; height: 16px"
            alt="Плюс"
          />
        </button>
      </div>
    </div>
  </div>
  <ModalRegisterAuth v-model:is-register-open="isRegisterOpen" />
</template>

<script lang="ts" setup>
  import { ModalRegisterAuth, Text, Title } from '@/components';
  import { defineProps, ref, computed } from 'vue';
  import './goods.scss';
  import Plus from '@/assets/icons/plus.svg';
  import Minus from '@/assets/icons/minus.svg';
  import { Item } from '../goods';
  import { useUserStore } from '../user';
  import { useGoodsStore } from '../goods';
  import { showNotification } from '@/plugins/notifications';

  const goodsStore = useGoodsStore();
  const userStore = useUserStore();
  const props = defineProps<{ item: Item }>();
  const isRegisterOpen = ref(false);

  const cartItem = computed(() => {
    return goodsStore.selectedGoods.find(good => good.id === props.item.id);
  });

  const isInCart = computed(() => !!cartItem.value);

  const currentQuantity = computed(() => cartItem.value?.total ?? 0);

  function putInCart(item?: Item) {
    if (!item) return;

    if (userStore.user.id) {
      const existing = goodsStore.selectedGoods.find(good => good.id === item.id);
      if (existing) {
        if (existing.total < (item.max ?? Infinity)) {
          existing.total++;
        } else {
          showNotification({
            text: 'Достигнуто максимальное количество товара',
            type: 'error',
          });
        }
      } else {
        goodsStore.selectedGoods.push({ ...item, total: 1 });
      }
    } else {
      isRegisterOpen.value = true;
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
