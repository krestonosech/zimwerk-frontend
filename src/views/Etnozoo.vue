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
  import { useEtnozooStore } from '@/entities/etnozoo/model';
  import { ImagesProps } from '@/entities/filters/types';
  import { computed, onMounted } from 'vue';

  const eventsStore = useEtnozooStore();
  const items = computed<ImagesProps[] | undefined>(() => eventsStore.etnozoo.etnozoo);

  onMounted(async () => {
    await eventsStore.fetchAllEtnozoo();
  });
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
  @media (max-width: 750px) {
    .etnozoo__title {
      font-size: 42px;
    }
  }
</style>
