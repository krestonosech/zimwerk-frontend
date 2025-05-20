<template>
  <div class="register">
    <div class="register__buttons">
      <button
        transparent
        class="register__button"
        :class="{ isRegister: isRegister }"
        @click="isRegister = true"
      >
        <p :class="{ isRegister__p: isRegister }">РЕГИСТРАЦИЯ</p>
      </button>
      <button
        transparent
        class="register__button"
        :class="{ isRegister: !isRegister }"
        @click="isRegister = false"
      >
        <p :class="{ isRegister__p: !isRegister }">ВХОД</p>
      </button>
    </div>
    <div class="register__register">
      <input
        v-if="isRegister"
        v-model="username"
        class="register__input"
        placeholder="Имя и фамилия"
      />
      <input
        v-model="email"
        class="register__input"
        placeholder="Адрес электронной почты"
      />
      <input
        v-if="isRegister"
        ref="phoneInput"
        type="tel"
        placeholder="Номер телефона"
      />
      <input
        v-if="!isRegister"
        v-model="password"
        class="register__input"
        placeholder="Пароль"
        type="password"
      />
      <div
        v-if="isRegister"
        style="display: flex; justify-content: space-between; gap: 20px"
      >
        <input
          v-model="password"
          class="register__input"
          style="width: 235px"
          placeholder="Пароль"
          type="password"
        />
        <input
          v-model="confirmPassword"
          class="register__input"
          style="width: 235px"
          placeholder="Повторите пароль"
          type="password"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineModel, watch, defineEmits, nextTick } from 'vue';
  import { showNotification } from '@/plugins/notifications';
  import { axios } from '@/plugins/axios';
  import { useUserStore } from '@/entities/user';
  import IMask from 'imask';

  const isApply = defineModel<boolean>('isApply', { required: true });
  const emit = defineEmits(['success']);
  const isRegister = ref(false);
  const phoneInput = ref<HTMLInputElement | null>(null);
  const userStore = useUserStore();
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  watch(
    () => isRegister.value,
    async newVal => {
      if (newVal) {
        await nextTick();
        if (phoneInput.value) {
          IMask(phoneInput.value, {
            mask: '+7(000)-000-00-00',
            lazy: false,
            placeholderChar: '_',
          });
        }
      }
    }
  );

  watch(
    () => isRegister.value,
    () => {
      email.value = '';
      username.value = '';
      password.value = '';
      confirmPassword.value = '';
    }
  );
  function parsePhoneNumber(phoneStr: string | undefined): number | null {
    if (!phoneStr) return null;
    const digitsOnly = phoneStr.replace(/\D/g, '');
    const withoutSeven = digitsOnly.startsWith('7') ? digitsOnly.slice(1) : digitsOnly;
    const phoneNumber = Number('8' + withoutSeven);

    return isNaN(phoneNumber) ? null : phoneNumber;
  }
  watch(
    () => isApply.value,
    async () => {
      if (isRegister.value)
        try {
          if (isRegister.value && !email.value.includes('@'))
            return showNotification({
              text: 'Введите правильный формат почты!',
              type: 'error',
            });
          if (isRegister.value && username.value.length < 6)
            return showNotification({
              text: 'Недостаточное количество символов в имени!',
              type: 'error',
            });
          if (isRegister.value && (!password.value || !username.value || !email.value))
            return showNotification({
              text: 'Не все данные введены!',
              type: 'error',
            });
          if (isRegister.value && password.value !== confirmPassword.value)
            return showNotification({
              text: 'Пароли не равны!',
              type: 'error',
            });
          const parseNumber = parsePhoneNumber(phoneInput.value?.value);
          if (!parseNumber || parseNumber < 10000000000)
            return showNotification({
              text: 'Неправильный формат номера!',
              type: 'error',
            });
          const data = {
            username: username.value,
            password: password.value,
            email: email.value,
            phone: parsePhoneNumber(phoneInput.value?.value),
          };

          await axios.post('/register', data);
          const token = await userStore.loginUser(email.value, password.value);
          if (token) localStorage.setItem('token', token);
          showNotification({
            text: 'Регистрация прошла успешно',
            type: 'success',
          });
        } catch (err) {
          showNotification({
            text: 'Не удалось зарегистрироваться!',
            type: 'error',
          });
        }
      try {
        const token = await userStore.loginUser(email.value, password.value);
        if (token) {
          localStorage.setItem('token', token);
        } else return Error;
        showNotification({
          text: 'Авторизация прошла успешно',
          type: 'success',
        });
      } catch (err) {
        showNotification({
          text: 'Не удалось авторизироваться!',
          type: 'error',
        });
      }
      emit('success');
    }
  );
</script>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__register {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }

    &__auth {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__buttons {
      display: flex;
      justify-content: center;
    }

    &__input {
      border: none;
      border-bottom: solid 1px #bababa;
      width: 550;
      height: 44;
      padding: 4px;
      gap: 10px;
      border-bottom-width: 1px;
    }

    &__input::placeholder {
      text-align: center;
    }

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
    }

    &__button {
      font-family: Roboto;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
      text-transform: uppercase;
    }
  }
  .isRegister {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;

    &__p {
      border-bottom: solid 2px #1e1e1e;
    }
  }

  button {
    background-color: transparent;
    padding: 20px;
    border: none;
    cursor: pointer;
  }

  input {
    padding-left: 30px !important;
    border: solid white 2px !important;
    border-bottom: solid black 1px !important;
  }
  input:focus {
    border-bottom: solid black 1px !important;
    border: solid black 2px !important;
  }
</style>
