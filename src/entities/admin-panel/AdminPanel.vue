<template>
  <div class="admin-panel">
    <div class="admin-panel__header">
      <Title text="Админ панель" />
      <button @click="onLogoutClick">Выйти</button>
    </div>
    <div style="display: flex; flex-direction: column; gap: 40px">
      <Title
        xs
        text="Все покупки"
      />
      <div
        class="admin-panel__table"
        style="max-height: 500px; overflow-y: scroll"
      >
        <table>
          <thead>
            <tr>
              <th><Text text="Пользователь" /></th>
              <th><Text text="Услуга" /></th>
              <th><Text text="Товар" /></th>
              <th><Text text="Цена" /></th>
              <th></th>
            </tr>
          </thead>
          <tr
            v-for="item in requests"
            :key="item.id"
          >
            <td><Text :text="item.username" /></td>
            <td><Text :text="item.service" /></td>
            <td><Text :text="item.name || 'Услуга без товара'" /></td>
            <td><Text :text="`${item.price?.toString()} р.`" /></td>
            <td>
              <Text
                :text="'Удалить товар'"
                @click="deleteGood(item.id)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 40px">
      <Title
        xs
        text="Все записи"
      />
      <div
        class="admin-panel__table"
        style="max-height: 500px; overflow-y: scroll"
      >
        <table>
          <thead>
            <tr>
              <th><Text text="Пользователь" /></th>
              <th><Text text="Услуга" /></th>
              <th><Text text="Номер" /></th>
              <th><Text text="Время" /></th>
              <th><Text text="Дата" /></th>
              <th></th>
            </tr>
          </thead>
          <tr
            v-for="item in anotherRequests"
            :key="item.id"
          >
            <td><Text :text="item.username" /></td>
            <td><Text :text="item.service" /></td>
            <td><Text :text="item.phone.toString()" /></td>
            <td><Text :text="item.time" /></td>
            <td><Text :text="item.date" /></td>
            <td>
              <Text
                :text="'Удалить услугу'"
                @click="deleteRequest(item.id)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 40px">
      <div style="display: flex; justify-content: space-between">
        <Title
          xs
          text="Все товары"
        />
        <Title
          xs
          text="Добавить товар"
          @click="addingGood = true"
        />
      </div>

      <div
        class="admin-panel__table"
        style="max-height: 500px; overflow-y: scroll"
      >
        <table>
          <thead>
            <tr>
              <th><Text text="Название" /></th>
              <th><Text text="Описание" /></th>
              <th><Text text="Тип товара" /></th>
              <th><Text text="Цена" /></th>
              <th><Text text="Картинка" /></th>
              <th><Text text="Редактирование товаров" /></th>
            </tr>
          </thead>
          <tr
            v-for="item in goods"
            :key="item.id"
          >
            <td><Text :text="item.name" /></td>
            <td><Text :text="item.description || ''" /></td>
            <td><Text :text="item.type || ''" /></td>
            <td><Text :text="`${item.price?.toString()} р.` || ''" /></td>
            <td>
              <img
                class="news__body-img"
                :src="`data:image/jpeg;base64,${item.image}`"
                style="width: 186px"
              />
            </td>
            <td>
              <button @click="changeGood(item)">Изменить</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div
      class="admin-panel__table"
      style="display: flex; flex-direction: column; gap: 40px"
    >
      <Title
        xs
        text="Все отзывы"
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
  <ModalAddingNews
    :id="selectedId"
    v-model:is-modal-adding-news-open="addingGood"
    :is-change="isChange"
    :name="selectedName"
    :price="selectedPrice"
    :description="selectedDescription"
    :image="selectedImage"
    :type="selectedType"
    @success="
      async () => {
        await goodsStore.fetchAllGoods();
        isChange = false;
      }
    "
    @close="
      () => {
        isChange = false;
        addingGood = false;
        selectedId = undefined;
        selectedName = undefined;
        selectedPrice = undefined;
        selectedDescription = undefined;
        selectedImage = undefined;
      }
    "
  />
</template>

<script lang="ts" setup>
  import { Text, Title } from '@/components';
  import './admin-panel.scss';
  import { computed, onMounted, ref, watch } from 'vue';
  import { Item, useGoodsStore } from '../goods';
  import { useUserStore } from '../user';
  import { useReviewsStore } from '../reviews/model';
  import ModalAddingNews from '@/components/modals/modal-adding-news/ModalAddingNews.vue';
  import Star from '@/assets/icons/star.svg';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';

  const reviewsStore = useReviewsStore();
  const userStore = useUserStore();
  const addingGood = ref(false);
  const goodsStore = useGoodsStore();
  const goods = computed(() => goodsStore.goods?.requests);
  const requests = computed(() => goodsStore.requests?.requests);
  const anotherRequests = computed(() => goodsStore.anotherRequests?.requests);
  const reviews = computed(() => reviewsStore.allReviews?.requests);
  const isChange = ref(false);
  const selectedId = ref();
  const selectedName = ref();
  const selectedPrice = ref();
  const selectedDescription = ref();
  const selectedImage = ref();
  const selectedType = ref();

  onMounted(async () => {
    await goodsStore.fetchAllUsersGoods();
    await goodsStore.fetchAllGoods();
    await reviewsStore.fetchReviews();
    await goodsStore.fetchAllUsersAnotherGoods();
  });

  watch(
    () => isChange.value,
    () => {
      if (isChange.value) addingGood.value = true;
    }
  );

  function changeGood(item: Item) {
    isChange.value = true;
    selectedId.value = item.id;
    selectedName.value = item.name;
    selectedPrice.value = item.price;
    selectedDescription.value = item.description;
    selectedImage.value = item.image;
    selectedType.value = item.type;
  }

  function onLogoutClick() {
    localStorage.removeItem('token');
    userStore.user.email = '';
    userStore.user.requests = [];
    userStore.user.id = 0;
    userStore.user.username = '';
    userStore.user.phone = null;
    location.reload();
  }

  async function deleteGood(id: number) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.post('/delete-good', { id }, config);
      showNotification({
        text: 'Товар удален!',
        type: 'success',
      });
      await goodsStore.fetchAllUsersGoods();
    } catch {
      showNotification({
        text: 'Не удалось удались товар!',
        type: 'error',
      });
    }
  }

  async function deleteRequest(id: number) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.post('/delete-request', { id }, config);
      showNotification({
        text: 'Товар удален!',
        type: 'success',
      });
      await goodsStore.fetchAllUsersAnotherGoods();
    } catch {
      showNotification({
        text: 'Не удалось удались товар!',
        type: 'error',
      });
    }
  }
</script>
