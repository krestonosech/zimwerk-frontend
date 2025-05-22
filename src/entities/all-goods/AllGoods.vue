<template>
  <div class="main__all-goods">
    <div style="display: flex; justify-content: space-between; align-items: center; height: 56px">
      <Title
        text="Наши товары"
        black
        xs
      />
      <div
        v-if="isShowCart"
        style="
          display: flex;
          gap: 10px;
          align-items: center;
          border: solid black 2px;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
        "
        @click="showCart = true"
      >
        <img
          :src="Cart"
          alt="Иконка корзины"
          style="width: 32px; height: 32px"
        />
        <Text
          text="Корзина"
          black
          xl
        />
      </div>
    </div>
    <div class="main__all-goods-list">
      <button
        v-for="(item, index) in buttons"
        :key="index"
        class="main__all-goods-buttons"
        @click="selected = item"
      >
        <Text
          :class="{ isActive: selected === item }"
          :text="item"
          black
        />
      </button>
    </div>
    <div class="main__all-goods-items">
      <Goods
        v-for="item in goods"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
  <ModalCart
    v-model:isModalShowCart="showCart"
    @success="
      () => {
        if (userStore.user.isSendedReview) return;
        isModalAddingReviewsOpen = true;
      }
    "
  />
  <ModalAddingReviews v-model:isModalAddingReviewsOpen="isModalAddingReviewsOpen" />
</template>

<script lang="ts" setup>
  import { ModalAddingReviews, ModalCart, Text, Title } from '@/components';
  import './goods.scss';
  import { computed, onMounted, ref, watch } from 'vue';
  import Goods from './Goods.vue';
  import { useGoodsStore } from '../goods';
  import Cart from '@/assets/icons/cart.svg';
  import { useUserStore } from '../user';

  const userStore = useUserStore();
  const goodsStore = useGoodsStore();
  const isShowCart = computed(() => goodsStore.selectedGoods.length);
  const goods = computed(() => goodsStore.goods.requests);
  const isModalAddingReviewsOpen = ref(false);
  const showCart = ref(false);
  const selected = ref('Все');
  const buttons = ['Все', 'Моторы', 'Электрооборудование', 'Топливо', 'Рулевое управление'];

  onMounted(async () => {
    await goodsStore.fetchAllGoods();
  });

  watch(
    () => selected.value,
    async () => {
      await goodsStore.fetchAllGoods(selected.value);
    }
  );

  watch(
    () => isShowCart.value,
    () => {
      if (!isShowCart.value) {
        showCart.value = false;
      }
    }
  );
</script>
