<template>
  <div class="main__eleventh">
    <div class="main__eleventh-element">
      <Title
        black
        text="ЗИМВЕРК"
      />
      <Text
        black
        xl
        text='ООО "ЗИМВЕРК МОСКВА"'
      />
      <Text
        black
        xl
        text="Почтовый адрес: 121471, г. Москва, ул. Рябиновая, д. 69, стр. 2"
      />
      <Text
        black
        xl
        text="Юр. адрес: 121471, город Москва, Рябиновая ул, д. 69 стр. 2, помещ. III-VII"
      />
      <RouterLink :to="'/politic-privacy'">
        <Text
          black
          xl
          text="Политика в отношении обработки персональных данных"
        />
      </RouterLink>
      <div style="display: flex; justify-content: end">
        <Text
          black
          xl
          text="ОГРН 1217700439142"
        />
      </div>
      <div style="display: flex; justify-content: space-between">
        <RouterLink :to="'/dogovor'">
          <Text
            black
            xl
            text="Договор оферты"
          />
        </RouterLink>
        <Text
          black
          xl
          text="ИНН: 9729313618"
        />
      </div>
      <div style="display: flex; justify-content: space-between">
        <Text
          black
          xl
          text='Сервис "ZIMWERK"'
        />
        <Text
          black
          xl
          text="КПП: 772901001"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Text, Title } from '@/components';
  import './about-us.scss';
</script>
