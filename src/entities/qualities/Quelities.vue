<template>
  <div class="main__sixth">
    <div class="main__sixth-element">
      <img
        class="main__sixth-img"
        :src="items[selected]"
      />
      <div class="main__sixth-text">
        <div
          class="main__sixth-text--element"
          :class="{ 'main__sixth--selected': selected === 'garant' }"
          @mouseover="selected = 'garant'"
        >
          <Text
            xl
            text="Гарантия и качество"
            style="margin-bottom: 4px"
            :black="selected === 'garant'"
          />
          <Text
            xs
            :black="selected === 'garant'"
            text="Используем только оригинальные запчасти или аналоги высокого качества, И даем годовую гарантию на запчасти которые установлены в ваш автомобиль. Мы поддерживаем качество работы с Вами и Вашими автомобилями на всех уровнях работы"
          />
        </div>
        <div
          class="main__sixth-text--element"
          :class="{ 'main__sixth--selected': selected === 'podhod' }"
          @mouseover="selected = 'podhod'"
        >
          <Text
            xl
            text="Профессиональный подход"
            :black="selected === 'podhod'"
            style="margin-bottom: 3px"
          />
          <Text
            xs
            :black="selected === 'podhod'"
            text="Большой арсенал специализированного оборудования и высокая культура производства отличают наш технический центр от среднего автосервиса"
          />
        </div>
        <div
          class="main__sixth-text--element"
          :class="{ 'main__sixth--selected': selected === 'opit' }"
          @mouseover="selected = 'opit'"
        >
          <Text
            xl
            text="Многолетний опыт"
            :black="selected === 'opit'"
            style="margin-bottom: 2px"
          />
          <Text
            xs
            :black="selected === 'opit'"
            text="Наша команда состоит из сертифицированных мастеров с большим опытом работы именно с автомобилями Volkswagen Group. Они знают все нюансы и особенности каждой модели"
          />
        </div>
        <div
          class="main__sixth-text--element"
          :class="{ 'main__sixth--selected': selected === 'loualnost' }"
          @mouseover="selected = 'loualnost'"
        >
          <Text
            xl
            text="Лояльность"
            :black="selected === 'loualnost'"
            style="margin-bottom: 2px"
          />
          <Text
            xs
            :black="selected === 'loualnost'"
            text="Мы ценим каждого клиента и стремимся построить долгосрочные отношения, основанные на доверии и взаимопонимании. С нами вы можете рассчитывать на индивидуальный подход и заботу о вашем автомобиле"
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

  const items: Record<string, string> = {
    garant: first,
    podhod: second,
    opit: third,
    loualnost: fourth,
  };

  const selected = ref('garant');
</script>
