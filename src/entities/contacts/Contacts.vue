<template>
  <div class="main__tenth">
    <div class="main__tenth-element">
      <Title
        black
        text="Контакты"
      />
      <div class="main__tenth-phones">
        <div class="main__tenth-phones--icons">
          <Title
            black
            xs
            text="Позвоните нам"
          />
          <div style="display: flex; align-items: center; gap: 10px">
            <img
              class="main__tenth-phones--icon"
              :src="phone"
              alt="Телефон"
            />
            <Text
              black
              xl
              text="+7 (968) 738-34-18"
            />
          </div>
        </div>
        <div class="main__tenth-phones--icons">
          <Title
            black
            xs
            text="Напишите нам на E-mail"
          />
          <div style="display: flex; align-items: center; gap: 10px">
            <img
              class="main__tenth-phones--icon"
              :src="mail"
              alt="Почта"
            />
            <Text
              black
              xl
              text="info@zimwerk.ru"
            />
          </div>
        </div>
        <div class="main__tenth-phones--icons">
          <Title
            black
            xs
            text="Рабочие часы"
          />
          <div style="display: flex; align-items: center; gap: 10px">
            <img
              class="main__tenth-phones--icon"
              :src="clock"
              alt="Часы"
            />
            <Text
              black
              xl
              text="Пн - Вс: 10:00 - 22:00"
            />
          </div>
        </div>
        <div class="main__tenth-phones--icons">
          <Title
            black
            xs
            text="Адрес"
          />
          <div style="display: flex; align-items: center; gap: 10px">
            <img
              class="main__tenth-phones--icon"
              :src="place"
              alt="Место"
            />
            <Text
              black
              xl
              text="Москва, Рябиновая улица, вл69с5"
            />
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <Title
            black
            xs
            text="Наши соцсети"
          />
          <Button
            v-if="!userStore.user.isSendedReview && userStore.token"
            black
            @click="IsShowModalReview = true"
          >
            Оставить отзыв
          </Button>
          <Text
            v-if="userStore.user.isSendedReview && userStore.token"
            xl
            black
            text="Спасибо за отзыв!"
          />
        </div>

        <div style="display: flex; gap: 10px">
          <a
            href="https://vk.com/zimwerk_podcast"
            target="_blank"
            rel="noopener noreferrer"
            style="
              height: 40px;
              width: 40px;
              background-color: rgb(68, 104, 136);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            "
            aria-label="VK"
          >
            <img
              style="width: 20px; height: 20px; filter: brightness(0) invert(1)"
              :src="VK"
              alt="VK"
            />
          </a>

          <a
            href="https://t.me/s/vagcenterchannel"
            target="_blank"
            rel="noopener noreferrer"
            style="
              height: 40px;
              width: 40px;
              background-color: rgb(68, 104, 136);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            "
            aria-label="Telegram"
          >
            <img
              style="width: 20px; height: 20px; filter: brightness(0) invert(1)"
              :src="Telegram"
              alt="Telegram"
            />
          </a>

          <a
            href="https://www.youtube.com/@VAGCENTER"
            target="_blank"
            rel="noopener noreferrer"
            style="
              height: 40px;
              width: 40px;
              background-color: rgb(68, 104, 136);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            "
            aria-label="YouTube"
          >
            <img
              style="width: 20px; height: 20px; filter: brightness(0) invert(1)"
              :src="youtube"
              alt="YouTube"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  <ModalAddingReviews
    v-model:isModalAddingReviewsOpen="IsShowModalReview"
    @success="async () => await userStore.profileMe()"
  />
</template>

<script setup lang="ts">
  import phone from '@/assets/icons/phone.svg';
  import mail from '@/assets/icons/mail.svg';
  import place from '@/assets/icons/place.svg';
  import clock from '@/assets/icons/clock.svg';
  import Telegram from '@/assets/icons/telegram.svg';
  import VK from '@/assets/icons/VK.svg';
  import youtube from '@/assets/icons/YOUTUBE.svg';
  import { Button, ModalAddingReviews, Text, Title } from '@/components';
  import './contacts.scss';
  import { ref } from 'vue';
  import { useUserStore } from '../user';

  const userStore = useUserStore();
  const IsShowModalReview = ref(false);
</script>
