<template>
  <div>
    <img
      :src="image"
      :alt="name"
      class="image__image"
    />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, ref, watch, onMounted } from 'vue';

  const props = defineProps<{
    url: string;
    name: string;
    type: 'main-images' | 'museum-images' | 'etnozoo-images';
  }>();
  const image = ref<string | undefined>(undefined);

  async function loadImage() {
    try {
      if (props.type === 'main-images') {
        const module = await import(`@/assets/main-images/${props.url}`);
        image.value = module.default;
      } else if (props.type === 'museum-images') {
        const module = await import(`@/assets/about-museum-images/${props.url}`);
        image.value = module.default;
      } else if (props.type === 'etnozoo-images') {
        const module = await import(`@/assets/etnozoo-images/${props.url}`);
        image.value = module.default;
      }
    } catch (error) {
      image.value = undefined;
    }
  }

  onMounted(() => {
    loadImage();
  });

  watch(
    () => props.url,
    () => {
      loadImage();
    }
  );
</script>

<style lang="scss" scoped>
  .image {
    &__image {
      width: 447px;
      height: 330px;
    }
  }
  @media (max-width: 1440px) {
    .image {
      &__image {
        padding: 16px;
      }
    }
  }
  @media (max-width: 750px) {
    .image {
      &__image {
        width: 300px;
        height: 200px;
        padding: 16px;
      }
    }
  }
</style>
