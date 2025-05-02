<template>
  <PageContent>
    <div class="main-page__general-info">
      <div>
        <p class="main-page__title">Этнографический музей народов забайкалья</p>
      </div>
      <div class="main-page__description-block">
        <div class="main-page__description">
          <p class="main-page__description__text">{{ DESCRIPTION_TEXT }}</p>
          <div class="main-page__description__button">
            <Button black>КУПИТЬ БИЛЕТ</Button>
          </div>
        </div>
      </div>
      <Images
        :items="animals"
        only-images
      />
    </div>
    <div class="main-page__events">
      <EventsMainTitle />
      <List />
    </div>
    <div class="main-page__gallery">
      <p class="main-page__gallery-text">Галерея</p>
      <Images :items="images" />
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
  import { Images } from '@/components/ui/images';
  import firstFunfair from '@/assets/main-images/first-funfair.png';
  import secondFunfair from '@/assets/main-images/second-funfair.png';
  import thirdFunfair from '@/assets/main-images/third-funfair.png';
  const images = [
    {
      id: 1,
      name: '«Ночь Ивана Купалы -2023»',
      url: firstFunfair,
    },
    {
      id: 2,
      name: '«Радужные гномы. Цветные истории»',
      url: secondFunfair,
    },
    {
      id: 3,
      name: 'Лесные байки – 2023',
      url: thirdFunfair,
    },
  ];

  const animals = [
    {
      id: 1,
      name: 'Лиса',
      url: fox,
    },
    {
      id: 2,
      name: 'Рысь',
      url: lynx,
    },
    {
      id: 3,
      name: 'Енот',
      url: raccoon,
    },
  ];
</script>

<style lang="scss" scoped>
  .main-page {
    &__gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &-text {
        font-family: 'AA Stetica';
        font-weight: 400;
        font-size: 64px;
        line-height: 72px;
      }
    }
    &__events {
      display: flex;
      flex-direction: column;
      gap: 20px;
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
      padding-bottom: 20px;
      border-bottom: solid black 2px;
    }

    &__general-info {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
</style>
