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
      <img
        class="icon"
        :src="Telegram"
        alt="Telegram"
      />
      <img
        class="icon"
        :src="VK"
        alt="VK"
      />
      <img
        class="icon"
        :src="youtube"
        alt="youtube"
      />
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
