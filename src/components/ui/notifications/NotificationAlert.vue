<template>
  <Notifications
    position="top center"
    :duration="5000"
    :width="360"
    class="notifications"
  >
    <template #body="{ item, close }">
      <div
        class="notifications__block"
        :class="`notifications__block_${item.type}`"
        @click="close"
      >
        {{ item.text }}
      </div>
    </template>
  </Notifications>
</template>

<script setup lang="ts">
  import { Notifications } from '@/plugins/notifications';
</script>

<style lang="scss" scoped>
  .notifications {
    &__block {
      margin-top: 20px;
      padding: 10px 20px;
      color: white;
      border-radius: 10px;
      &_success {
        background-color: rgb(49, 143, 32);
      }
      &_error {
        background-color: rgb(179, 33, 33);
      }
      &_warning {
        background-color: rgb(225, 170, 51);
      }
    }
  }
</style>
