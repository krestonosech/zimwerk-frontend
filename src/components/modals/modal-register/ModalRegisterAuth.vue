<template>
  <Modal
    v-model:open="isRegisterOpen"
    :apply-button="`${isRegister ? 'Зарегистрироваться' : 'Войти'}`"
    title="Личный кабинет"
    @close="closeModal"
    @apply="apply"
  >
    <Register
      v-model:is-register="isRegister"
      v-model:is-apply="isApply"
      @success="isRegisterOpen = false"
    />
  </Modal>
</template>

<script lang="ts" setup>
  import { Modal } from '@/components/ui/modal';
  import { defineModel, ref, defineProps, computed } from 'vue';
  import Register from './Register.vue';

  const props = defineProps<{
    is?: boolean;
  }>();

  const isRegisterOpen = defineModel<boolean>('isRegisterOpen', { required: true });
  const isRegister = computed(() => props.is || false);

  const isApply = ref<boolean>(false);

  function apply() {
    isApply.value = !isApply.value;
  }

  function closeModal() {
    isRegisterOpen.value = false;
  }
</script>
