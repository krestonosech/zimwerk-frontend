<template>
  <div
    ref="wrapper"
    class="tooltip-wrapper"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <slot />
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-show="show"
        ref="tooltip"
        class="tooltip-bubble"
        :style="style"
      >
        <slot name="content"></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

  const show = ref(false);
  const wrapper = ref(null);
  const tooltip = ref(null);
  const style = ref({ position: 'absolute', top: '0px', left: '0px', zIndex: 10000 });

  function updatePosition() {
    if (!wrapper.value || !tooltip.value) return;

    const wrapperRect = wrapper.value.getBoundingClientRect();
    const tooltipRect = tooltip.value.getBoundingClientRect();

    // Позиционируем тултип сверху по центру
    const top = wrapperRect.top + window.scrollY - tooltipRect.height - 8; // 8px отступ
    const left = wrapperRect.left + window.scrollX + wrapperRect.width / 2 - tooltipRect.width / 2;

    style.value = {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 10000,
    };
  }

  watch(show, async val => {
    if (val) {
      await nextTick();
      updatePosition();
    }
  });

  onMounted(() => {
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updatePosition);
    window.removeEventListener('resize', updatePosition);
  });
</script>

<style scoped>
  .tooltip-bubble {
    background: #0d2847;
    color: white;
    padding: 8px 16px;
    border-radius: 10px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    font-family: inherit;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    pointer-events: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
</style>
