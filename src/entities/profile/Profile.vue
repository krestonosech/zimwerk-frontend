<template>
  <div class="admin-panel">
    <div class="admin-panel__header">
      <Title text="Профиль" />
      <button @click="onLogoutClick">Вернуться на главную</button>
    </div>
    <div style="display: flex; flex-direction: column; gap: 40px">
      <Title
        xs
        text="Мои покупки"
      />
      <div
        class="admin-panel__table"
        style="max-height: 500px; overflow-y: scroll"
      >
        <table>
          <thead>
            <tr>
              <th><Text text="Услуга" /></th>
              <th><Text text="Товар" /></th>
              <th><Text text="Цена" /></th>
            </tr>
          </thead>
          <tr
            v-for="item in requests"
            :key="item.id"
          >
            <td><Text :text="item.service" /></td>
            <td><Text :text="item.name || 'Услуга без товара'" /></td>
            <td><Text :text="`${item.price?.toString()} р.`" /></td>
          </tr>
        </table>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 40px">
      <Title
        xs
        text="Мои записи"
      />
      <div
        class="admin-panel__table"
        style="max-height: 500px; overflow-y: scroll"
      >
        <table>
          <thead>
            <tr>
              <th><Text text="Услуга" /></th>
              <th><Text text="Номер" /></th>
              <th><Text text="Имя" /></th>
            </tr>
          </thead>
          <tr
            v-for="item in anotherRequests"
            :key="item.id"
          >
            <td><Text :text="item.service" /></td>
            <td><Text :text="item.phone.toString()" /></td>
            <td><Text :text="`${item.username}`" /></td>
          </tr>
        </table>
      </div>
    </div>
    <div
      v-if="userStore.user.isSendedReview"
      class="admin-panel__table"
      style="display: flex; flex-direction: column; gap: 40px"
    >
      <Title
        xs
        text="Мой отзыв"
      />
      <div style="max-height: 500px; overflow-y: scroll">
        <div
          v-for="item in reviews"
          :key="item.id"
          style="display: flex; flex-direction: column; gap: 10px; padding-bottom: 50px"
        >
          <div style="display: flex; gap: 30px">
            <Title
              xs
              :text="item.username"
            />
            <div style="display: flex">
              <div
                v-for="(_, index) in item.review"
                :key="index"
              >
                <img
                  :src="Star"
                  alt="звезда"
                  style="width: 40px; filter: brightness(0) invert(1)"
                />
              </div>
            </div>
          </div>
          <Text
            style="padding-left: 30px"
            :text="item.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Text, Title } from '@/components';
  import './profile.scss';
  import { computed, onMounted } from 'vue';
  import { useGoodsStore } from '../goods';
  import { useUserStore } from '../user';
  import { useReviewsStore } from '../reviews/model';
  import Star from '@/assets/icons/star.svg';
  import { router } from '@/router';

  const reviewsStore = useReviewsStore();
  const userStore = useUserStore();
  const goodsStore = useGoodsStore();
  const requests = computed(() => goodsStore.requests?.requests);
  const anotherRequests = computed(() => goodsStore.anotherRequests?.requests);
  const reviews = computed(() => reviewsStore.allReviews?.requests);

  onMounted(async () => {
    await userStore.profileMe();
    await goodsStore.fetchAllUsersGoods(userStore.user.username);
    await goodsStore.fetchAllUsersAnotherGoods(userStore.user.username);
    await reviewsStore.fetchReviews(userStore.user.username);
  });

  function onLogoutClick() {
    router.push('/main');
  }
</script>
