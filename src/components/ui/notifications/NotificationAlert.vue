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
        role="alert"
        tabindex="0"
        @click="close"
      >
        <div
          class="notifications__icon"
          aria-hidden="true"
        >
          <component :is="getIcon(item.type)" />
        </div>
        <div class="notifications__content">
          <h4
            class="notifications__title"
            style="color: white !important"
          >
            {{ getTitle(item.type) }}
          </h4>
          <p
            class="notifications__text"
            style="color: white !important"
          >
            {{ item.text }}
          </p>
        </div>
        <button
          class="notifications__close"
          aria-label="Закрыть уведомление"
          @click.stop="close"
        >
          &times;
        </button>
      </div>
    </template>
  </Notifications>
</template>

<script setup lang="ts">
  import { Notifications } from '@/plugins/notifications';
  import { NotificationsOptions } from '@kyvg/vue3-notification';
  import { defineComponent } from 'vue';

  // Простейшие SVG иконки (можно заменить на свои)
  // eslint-disable-next-line vue/one-component-per-file
  const SuccessIcon = defineComponent({
    template: `<svg width="24" height="24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  });
  // eslint-disable-next-line vue/one-component-per-file
  const ErrorIcon = defineComponent({
    template: `<svg width="24" height="24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  });
  // eslint-disable-next-line vue/one-component-per-file
  const WarningIcon = defineComponent({
    template: `<svg width="24" height="24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><circle cx="12" cy="16" r="1"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`,
  });

  function getIcon(type: NotificationsOptions['type']) {
    switch (type) {
      case 'success':
        return SuccessIcon;
      case 'error':
        return ErrorIcon;
      case 'warning':
        return WarningIcon;
      default:
        return null;
    }
  }

  function getTitle(type: NotificationsOptions['type']) {
    switch (type) {
      case 'success':
        return 'Успех';
      case 'error':
        return 'Ошибка';
      case 'warning':
        return 'Внимание';
      default:
        return '';
    }
  }
</script>

<style lang="scss" scoped>
  .notifications {
    &__block {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-top: 16px;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
      font-family: 'Roboto', sans-serif;
      color: #fff;
      position: relative;
      cursor: pointer;
      user-select: none;
      transition:
        background-color 0.3s ease,
        box-shadow 0.3s ease,
        transform 0.15s ease;

      &:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
      }

      &_success {
        background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
        box-shadow: 0 6px 18px rgba(46, 125, 50, 0.6);
        color: white !important;
      }
      &_error {
        background: linear-gradient(135deg, #e53935 0%, #b71c1c 100%);
        box-shadow: 0 6px 18px rgba(183, 28, 28, 0.6);
        color: white !important;
      }
      &_warning {
        background: linear-gradient(135deg, #fbc02d 0%, #f57f17 100%);
        box-shadow: 0 6px 18px rgba(245, 127, 23, 0.6);
        color: #333;
        color: black;
      }
    }

    &__icon {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      margin-top: 4px;

      svg {
        width: 100%;
        height: 100%;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    &__content {
      flex-grow: 1;
    }

    &__title {
      margin: 0 0 4px 0;
      font-weight: 700;
      font-size: 18px;
      line-height: 1.2;
    }

    &__text {
      margin: 0;
      font-weight: 400;
      font-size: 15px;
      line-height: 1.4;
    }

    &__close {
      position: absolute;
      top: 12px;
      right: 14px;
      background: transparent;
      border: none;
      color: inherit;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      user-select: none;
      transition: color 0.2s ease;

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.3s ease;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
  }
  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
  }
</style>
