<template>
  <div class="main__sixth">
    <div class="main__sixth-element">
      <img
        class="main__sixth-img"
        :src="images[selected]"
      />
      <div class="main__sixth-text">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="main__sixth-text--element"
          :class="{ 'main__sixth--selected': selected === item.title }"
          @mouseover="selected = item.title"
        >
          <Text
            xl
            :text="item.title"
            style="margin-bottom: 4px"
            :black="selected === item.title"
          />
          <Text
            xs
            :black="selected === item.title"
            :text="item.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import first from '@/assets/images/1.webp';
  import second from '@/assets/images/2.webp';
  import third from '@/assets/images/3.webp';
  import fourth from '@/assets/images/4.webp';
  import { Text } from '@/components';
  import { ref } from 'vue';
  import './quelities.scss';

  const images: Record<string, string> = {
    'Гарантия и качество': first,
    'Профессиональный подход': second,
    'Многолетний опыт': third,
    Лояльность: fourth,
  };

  const items = [
    {
      text: 'Используем только оригинальные запчасти или аналоги высокого качества, И даем годовую гарантию на запчасти которые установлены в ваш автомобиль. Мы поддерживаем качество работы с Вами и Вашими автомобилями на всех уровнях работы',
      title: 'Гарантия и качество',
    },
    {
      text: 'Большой арсенал специализированного оборудования и высокая культура производства отличают наш технический центр от среднего автосервиса',
      title: 'Профессиональный подход',
    },
    {
      text: 'Наша команда состоит из сертифицированных мастеров с большим опытом работы именно с автомобилями Volkswagen Group. Они знают все нюансы и особенности каждой модели',
      title: 'Многолетний опыт',
    },
    {
      text: 'Мы ценим каждого клиента и стремимся построить долгосрочные отношения, основанные на доверии и взаимопонимании. С нами вы можете рассчитывать на индивидуальный подход и заботу о вашем автомобиле',
      title: 'Лояльность',
    },
  ];

  const selected = ref('Гарантия и качество');
</script>
