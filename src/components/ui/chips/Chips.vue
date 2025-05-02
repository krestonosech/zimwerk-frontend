<template>
  <div class="chips">
    <div class="chips__buttons">
      <ChipButton
        v-for="(item, index) in buttons"
        :key="index"
        :is-active="selected === item"
        @click="selected = item"
      >
        {{ item }}
      </ChipButton>
    </div>
    <input
      v-model="search"
      type="text"
      class="chips__input"
      placeholder="Поиск"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps } from 'vue';
  import ChipButton from './ChipButton.vue';

  const selected = ref('Все');
  const search = ref<string>('');
  defineProps<{
    buttons: string[];
  }>();
</script>

<style lang="scss" scoped>
  .chips {
    display: flex;
    justify-content: space-between;
    &__buttons {
      display: flex;
      gap: 10px;
    }
    &__input {
      width: 220;
      height: 28;
      gap: 4px;
      padding-top: 4px;
      padding-right: 10px;
      padding-bottom: 4px;
      padding-left: 10px;
      border-radius: 8px;
      border-width: 1px;
    }
  }
</style>
