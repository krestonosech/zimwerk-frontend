<template>
  <div class="main__ninth">
    <div class="main__ninth-element">
      <div class="main__ninth-text">
        <Title
          black
          text="Запись в сервесный центр"
        />
        <Text
          black
          xl
          text="Мы перезвоним вам через 10 минут"
        />
      </div>
      <div class="main__ninth-text">
        <input
          v-model="username"
          placeholder="Имя"
        />
        <input
          ref="phoneInput"
          type="tel"
        />
        <Button
          style="width: 520px"
          gray
          @click="addRequest"
        >
          Отправить заявку
        </Button>
        <Text
          style="width: 620px; text-align: center"
          black
          xs
          text="Отправляя заявку, я принимаю все условия Политики оператора в отношении обработки персональных данных и Пользовательского соглашения"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Button, Text, Title } from '@/components';
  import './request.scss';
  import { onMounted, ref } from 'vue';
  import IMask from 'imask';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';

  const phoneInput = ref<HTMLInputElement | null>(null);
  const username = ref('');

  function parsePhoneNumber(phoneStr: string | undefined): number | null {
    if (!phoneStr) return null;
    const digitsOnly = phoneStr.replace(/\D/g, '');
    const withoutSeven = digitsOnly.startsWith('7') ? digitsOnly.slice(1) : digitsOnly;
    const phoneNumber = Number('8' + withoutSeven);

    return isNaN(phoneNumber) ? null : phoneNumber;
  }

  onMounted(() => {
    if (phoneInput.value) {
      IMask(phoneInput.value, {
        mask: '+7(000)-000-00-00',
        lazy: false,
        placeholderChar: '_',
      });
    }
  });

  async function addRequest() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const data = {
        username: username.value,
        service: 'Запись в центр',
        phone: parsePhoneNumber(phoneInput.value?.value),
      };

      await axios.post('/add-another-requests', data, config);

      showNotification({
        text: 'Вы записались!',
        type: 'success',
      });
      if (phoneInput.value) {
        phoneInput.value.value = '';
      }
      username.value = '';
    } catch (error) {
      showNotification({
        text: 'Не удалось записаться!',
        type: 'error',
      });
    }
  }
</script>
