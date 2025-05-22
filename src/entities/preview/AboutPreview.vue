<template>
  <div class="main__third">
    <div class="main__third-element">
      <Text
        style="margin-bottom: 30px"
        xl
        text="Владимир Шубин, основатель автосервиса ZIMWERK — не только эксперт по автомобилям Volkswagen AG, но и автор крупнейшего YouTube-канала, посвященного маркам VAG. "
      />
      <Text
        xl
        text="В своих видео он подробно рассказывает о тонкостях эксплуатации, ремонта и обслуживания этих автомобилей, делясь знаниями, которые помогают тысячам автовладельцев."
      />
    </div>
    <div class="main__third-icons">
      <a
        href="https://t.me/s/vagcenterchannel"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram канал"
      >
        <img
          class="icon"
          :src="Telegram"
          alt="Telegram"
        />
      </a>
      <a
        href="https://vk.com/zimwerk_podcast"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="VK паблик"
      >
        <img
          class="icon"
          :src="VK"
          alt="VK"
        />
      </a>
      <a
        href="https://www.youtube.com/@VAGCENTER"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube канал"
      >
        <img
          class="icon"
          :src="youtube"
          alt="YouTube"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Text } from '@/components';
  import Telegram from '@/assets/icons/telegram.svg';
  import VK from '@/assets/icons/VK.svg';
  import youtube from '@/assets/icons/YOUTUBE.svg';
  import './preview.scss';
</script>
