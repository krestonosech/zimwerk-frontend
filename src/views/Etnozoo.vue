<template>
  <PageContent>
    <div class="etnozoo">
      <p class="etnozoo__title">Этнозоосад</p>
      <Images
        v-if="items"
        :items="items"
      />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent } from '@/components';
  import { Images } from '@/components/ui/images';
  import { ImagesProps } from '@/entities/filters/types';
  import { ref } from 'vue';
  const items = ref<ImagesProps[]>();
</script>

<style lang="scss" scoped>
  .etnozoo {
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
  }
</style>
