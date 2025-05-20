<template>
  <div class="main__fourth">
    <div class="cars">
      <Title
        xs
        text="Мы работаем с такими марками автомобилей как:"
      />
      <div class="cars__cars">
        <div
          v-for="item in items"
          :key="item.id"
        >
          <Car
            :id="item.id"
            :bgc="item.bgc"
            :icon="item.icon"
            :text="item.text"
            :width="item.width"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Title } from '@/components';
  import { items } from '@/entities/consts';
  import Car from './Car.vue';
  import './cars.scss';
</script>
