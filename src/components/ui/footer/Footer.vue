<template>
  <div class="footer">
    <p class="footer__address">г.Улан-Удэ, пос.Верхняя Березовка, дом 17б</p>
    <RouterLink
      to="/main"
      class="footer__privacy-policy"
    >
      Политика конфиденциальности
    </RouterLink>
    <p class="footer__phone">+7(3012) 33-25-10</p>
    <div>
      <Button transparent>
        <img
          :src="VK"
          alt="Вконтакте"
        />
      </Button>
      <Button transparent>
        <img
          :src="YOUTUBE"
          alt="Ютьюб"
        />
      </Button>
      <Button transparent>
        <img
          :src="OWL"
          alt="Сова))"
        />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  //TODO поменять Сова))
  import VK from '@/assets/icons/VK.svg';
  import YOUTUBE from '@/assets/icons/YOUTUBE.svg';
  import OWL from '@/assets/icons/OWL.svg';
  import Button from '../button/Button.vue';
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 64px;
    border-top: solid #bababa 1px;
    &__address {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
    }
    &__privacy-policy {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      color: #1e1e1e;
    }
    &__phone {
      font-family: 'Roboto';
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-transform: uppercase;
    }
  }
</style>
