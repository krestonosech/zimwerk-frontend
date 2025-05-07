<template>
  <PageContent>
    <div class="path">
      <Title text="Как добраться в музей" />
      <div class="path__body">
        <div class="path__body-item">
          <Title
            xs
            text="Адрес"
            class="path__body-item-title"
          />
          <Text
            xl
            text="г.Улан-Удэ, пос.Верхняя Березовка, дом 17б"
          />
        </div>
        <div class="path__body-item">
          <Title
            xs
            text="Номер телефона"
            class="path__body-item-title"
          />
          <Text
            xl
            text="+7(3012) 33-25-10"
          />
        </div>
        <div class="path__body-item">
          <Title
            xs
            text="Электронная почта"
            class="path__body-item-title"
          />
          <Text
            xl
            text="emtp@mail.ru"
          />
        </div>
        <div class="path__body-item">
          <Title
            xs
            text="Из города Улан-Удэ в направлении музея"
            class="path__body-item-title"
          />
          <div class="path__body-item-text-group">
            <Text
              text="1. До Этнографического музея можно проехать на автобусе большой вместимости городского маршрута № 37 по маршруту Мелькомбинат – Этнографический музей (конечная остановка)"
            />
            <Text
              text="2. На микроавтобусах (маршрутное такси) №37 (поворот с трассы Р438 «Баргузин» на улицу Музейная) в сторону Этнографического музея"
            />
            <Text text="3. На такси (Яндекс, Максим, Поехали или любой местный перевозчик" />
            <Text
              xl
              text="*Отворот на Этнографический музей начинается сразу после остановки «Дом отдыха учитель». Водителя маршрутного такси надо обязательно предупредить, что вы едете до музея (иначе микроавтобус проедет отворот на музей)"
            />
          </div>
        </div>
        <div class="path__body-item">
          <Title
            xs
            text="Из музея в город Улан-Удэ"
            class="path__body-item-title"
          />
          <div class="path__body-item-text-group">
            <Text text="1. На автобусе большой вместимости городского маршрута №37" />
            <Text
              text="2. Пешком дойти до трассы Р438 «Баргузин» до остановки «Дом отдыха учитель»"
            />
            <Text
              text="3.  Дождаться микроавтобус (маршрутное такси) №37 и доехать с ним до остановки конечная и пересесть на микроавтобус идущий в г.Улан-Удэ по графику"
            />
            <Text
              text="4. Также автобусы большой вместимости городского маршрута №37 и микроавтобусы (маршрутное такси ) №37 можно отследить по сайту «Навигационно-информационные системы Бурятии» в реальном времени"
            />
            <Text text="5. Интервал движения микроавтобуса (маршрутного такси ) 10-15 минут " />
            <Text text="6. Интервал движения автобуса большой вместимости 1 час 20 минут " />
            <Text
              xl
              text="Время работы микроавтобусов с 7:00 до 21:00"
            />
            <Text
              xl
              text="Время работы автобусов большой вместимости с 7:30 до 18:40"
            />
          </div>
        </div>
        <div style="width: 100%">
          <iframe
            src="https://yandex.ru/map-widget/v1/-/CHrOiW33"
            width="100%"
            height="700"
            frameborder="0"
            allowfullscreen
            style="border-radius: 12px"
          />
        </div>
      </div>
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Text, Title } from '@/components';
</script>

<style lang="scss" scoped>
  .path {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__body {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    &__body-item {
      display: flex;
      gap: 10px;
    }
    &__body-item-title {
      width: 218px;
    }
    &__body-item-text-group {
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 1132px;
    }
  }

  @media (max-width: 1440px) {
    .path {
      &__body-item-title {
        width: 150px;
      }
      &__body-item-text-group {
        width: 550px;
      }
    }
  }

  @media (max-width: 750px) {
    .path {
      &__body-item-title {
        width: 130px;
      }
      &__body-item-text-group {
        width: inherit;
        max-width: 400px;
      }
    }
  }
</style>
