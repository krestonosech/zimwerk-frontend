<template>
  <PageContent>
    <div class="etnozoo">
      <Title text="Этнозоосад" />
      <Images
        :items="etnozooImages"
        type="etnozoo-images"
      />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Title } from '@/components';
  import { Images } from '@/components/ui/images';
  import { etnozooImages } from '@/entities/consts';
</script>

<style lang="scss" scoped>
  .etnozoo {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 750px) {
    .etnozoo__title {
      font-size: 42px;
    }
  }
</style>
