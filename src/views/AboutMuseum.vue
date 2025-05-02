<template>
  <PageContent>
    <div class="about-museum">
      <p class="about-museum__title">О Музее</p>
      <div class="about-museum__list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="about-museum__element"
        >
          <div class="about-museum__element__date">{{ item.date }}</div>
          <div class="about-museum__element__text">
            {{ item.text }}
            <br />
            <br />
            <div v-if="item.text === THIRD_TEXT_1">{{ THIRD_TEXT_2 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-museum">
      <p class="about-museum__title">Руководство</p>
      <Images :items="images" />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent } from '@/components';
  import {
    FIFTH_TEXT,
    FIRST_TEXT,
    FOURTH_TEXT,
    SECOND_TEXT,
    SIXTH_TEXT,
    THIRD_TEXT_1,
    THIRD_TEXT_2,
  } from '@/entities/consts';
  import director from '@/assets/about-museum-images/director.svg';
  import zam from '@/assets/about-museum-images/zam.svg';
  import savior from '@/assets/about-museum-images/savior.svg';
  import { Images } from '@/components/ui/images';

  const items = [
    {
      date: '1967 год',
      text: FIRST_TEXT,
    },
    { date: '1968 год', text: SECOND_TEXT },
    { date: '1969 год', text: THIRD_TEXT_1 },
    { date: '1973 год', text: FOURTH_TEXT },
    { date: '1976 год', text: FIFTH_TEXT },
    { date: 'Сегодня', text: SIXTH_TEXT },
  ];

  const images = [
    {
      id: 1,
      name: 'Директор',
      name_2: 'Маладаев Алексей Анатольевич',
      url: director,
    },
    {
      id: 2,
      name: 'Заместитель директора по науке',
      name_2: 'Бильдуева Саяна Викторовна',
      url: zam,
    },
    {
      id: 3,
      name: 'Главный хранитель',
      name_2: 'Чойбсонова Валентина Ринчиновна',
      url: savior,
    },
  ];
</script>

<style lang="scss" scoped>
  .about-museum {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__title {
      font-family: AA Stetica;
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
      letter-spacing: 0%;
    }
    &__element {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 0;
      &__text {
        width: 80%;
        font-family: Roboto;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
      }
      &__date {
        width: 20%;
        font-family: Roboto;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
      }
    }
  }
</style>
