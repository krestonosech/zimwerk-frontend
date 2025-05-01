<template>
  <PageContent>
    <div class="main-page__general-info">
      <div>
        <p class="main-page__title">Этнографический музей народов забайкалья</p>
        <div class="main-page__separeted-line" />
      </div>
      <div class="main-page__description-block">
        <div class="main-page__description">
          <p class="main-page__description__text">{{ DESCRIPTION_TEXT }}</p>
          <div class="main-page__description__button">
            <Button black>КУПИТЬ БИЛЕТ</Button>
          </div>
        </div>
      </div>
      <div class="main-page__images">
        <img
          :src="fox"
          alt="Лиса"
        />
        <img
          :src="lynx"
          alt="Рысь"
        />
        <img
          :src="raccoon"
          alt="Енот"
        />
      </div>
    </div>
    <div class="main-page__events">
      <EventsMainTitle />
      <List />
    </div>
    <div class="main-page__gallery">
      <p class="main-page__gallery-text">Ближайшие события</p>
      <div class="main-page__gallery-item">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="main-page__gallery-item__elements"
        >
          <p class="main-page__gallery-item__elements__text">name</p>
          <img
            :src="Logo"
            alt="Галерея"
            height="350"
            width="430"
          />
        </div>
      </div>
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent } from '@/components';
  import { Button } from '@/components/ui/button';
  import { DESCRIPTION_TEXT } from '@/entities/consts';
  import fox from '@/assets/main-images/fox.png';
  import lynx from '@/assets/main-images/lynx.png';
  import raccoon from '@/assets/main-images/raccoon.png';
  import { EventsMainTitle } from '@/entities/events';
  import { List } from '@/components/ui/list';
  import Logo from '@/assets/Logo.svg';
  const items = 3;
</script>

<style lang="scss" scoped>
  .main-page {
    &__gallery-item {
      display: flex;
      gap: 20px;
      &__elements {
        display: flex;
        border-top: solid #bababa 1px;
        padding-top: 10px;
        flex-direction: column;
        &__text {
          font-family: 'Roboto';
          font-weight: 300;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0%;
          padding: 5px 0;
        }
      }
    }
    &__gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__gallery-text {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
    }
    &__events {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__images {
      display: flex;
      justify-content: space-between;
    }

    &__description {
      width: 900px;
      display: flex;

      &__text {
        width: 50%;
        font-family: 'Roboto';
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0%;
      }

      &__button {
        width: 50%;
        display: flex;
        align-items: end;
        justify-content: end;
      }
    }

    &__description-block {
      display: flex;
      justify-content: end;
    }

    &__title {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 118px;
      line-height: 100%;
      letter-spacing: 0%;
    }

    &__separeted-line {
      margin-top: 20px;
      margin-right: 30px;
      border-bottom: solid black 2px;
    }

    &__general-info {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
</style>
