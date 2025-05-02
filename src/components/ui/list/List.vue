<template>
  <div class="list">
    <div
      v-for="(item, index) in items"
      :key="index"
    >
      <ListItem
        :id="item.id"
        :name="item.name"
        :type="item.type"
        :date="item.date"
        :description="item.description"
        :is-last-element="index + 1 === items.length"
        @click="console.log(items.length, index + 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ListItem from './ListItem.vue';

  const items = [
    {
      id: 1,
      type: 'Фестиваль',
      name: 'Выставка “Пасхальные истории” в доме Танских',
      date: '16 апреля – 11 мая',
      description:
        'На выставке представлены предметы из фондов музея, отражающие главные атрибуты праздника. Этот христианский праздник до XX века отмечался даже с большим размахом, чем празднование Рождества',
    },
    {
      id: 2,
      type: 'Фестиваль',
      name: 'Выставка “Пасхальные истории” в доме Танских',
      date: '16 апреля – 11 мая',
      description:
        'На выставке представлены предметы из фондов музея, отражающие главные атрибуты праздника. Этот христианский праздник до XX века отмечался даже с большим размахом, чем празднование Рождества',
    },
    {
      id: 3,
      type: 'Фестиваль',
      name: 'Выставка “Пасхальные истории” в доме Танских',
      date: '16 апреля – 11 мая',
      description:
        'На выставке представлены предметы из фондов музея, отражающие главные атрибуты праздника. Этот христианский праздник до XX века отмечался даже с большим размахом, чем празднование Рождества',
    },
  ];
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 500px;
    overflow-y: auto;
  }
</style>
