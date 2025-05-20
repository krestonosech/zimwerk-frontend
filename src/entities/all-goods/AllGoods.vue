<template>
  <div class="main__all-goods">
    <div style="display: flex; justify-content: space-between">
      <Title
        text="Наши товары"
        black
        xs
      />
      <Text
        v-if="isShowCart"
        text="Корзина"
        black
        xl
        style="cursor: pointer"
        @click="showCart = true"
      />
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
    <div
      style="
        flex-wrap: wrap;
        display: flex;
        justify-content: space-between;
        max-height: 760px;
        overflow-y: auto;
      "
    >
      <Goods
        v-for="item in goods"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
  <ModalCart
    v-model:isModalShowCart="showCart"
    @success="isModalAddingReviewsOpen = true"
  />
  <ModalAddingReviews v-model:isModalAddingReviewsOpen="isModalAddingReviewsOpen" />
</template>

<script lang="ts" setup>
  import { ModalAddingReviews, ModalCart, Text, Title } from '@/components';
  import './goods.scss';
  import { computed, onMounted, ref, watch } from 'vue';
  import Goods from './Goods.vue';
  import { useGoodsStore } from '../goods';

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
