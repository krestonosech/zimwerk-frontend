<template>
  <Transition
    name="modal-fade"
    type="transition"
  >
    <div
      v-if="open"
      class="modal__overlay"
    >
      <div class="modal">
        <p
          v-if="warning"
          class="modal__warning"
        >
          *Для покупки билета необходимо зарегистрироваться
        </p>
        <p class="modal__title">{{ props.title }}</p>
        <slot />
        <div class="modal__buttons">
          <Button
            v-if="isDeleteItem"
            @click="emit('delete')"
          >
            УДАЛИТЬ
          </Button>
          <Button
            black
            @click="emit('apply')"
          >
            {{ applyButton.toUpperCase() }}
          </Button>
          <Button @click="close">ОТМЕНА</Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
  import { defineProps, defineModel, defineEmits } from 'vue';
  import { Button } from '../button';
  const props = defineProps<{
    title: string;
    warning?: boolean;
    applyButton: string;
    isDeleteItem?: boolean;
  }>();

  const open = defineModel<boolean>('open', { required: true });
  const emit = defineEmits(['apply', 'close', 'delete']);

  function close() {
    open.value = false;
    emit('close');
  }
</script>

<style lang="scss" scoped>
  .modal__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    display: flex;
    flex-direction: column;
    position: relative;
    background: #fff;
    border-radius: 8px;
    padding: 40px;
    width: 550px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    gap: 40px;
    &__title {
      display: flex;
      width: 100%;
      justify-content: center;
      font-family: Roboto;
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
    }
    &__warning {
      font-family: Roboto;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
    }
    &__buttons {
      display: flex;
      justify-content: end;
      gap: 10px;
    }
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition:
      opacity 0.5s,
      transform 0.5s;
  }
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  .modal-fade-enter-to,
  .modal-fade-leave-from {
    opacity: 1;
    transform: scale(1);
  }
</style>
