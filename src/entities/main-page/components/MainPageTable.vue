<template>
  <div class="admin-panel">
    <table>
      <thead>
        <tr class="admin-panel__thead">
          <th
            style="width: 160px"
            class="admin-panel__thead-th"
          >
            <p class="date">дата</p>
          </th>
          <th
            style="width: 300px"
            class="admin-panel__thead-th description__text"
          >
            адрес электронной почты
          </th>
          <th
            style="width: 683px"
            class="admin-panel__thead-th description__text"
          >
            событие
          </th>
          <th
            style="width: 187px"
            class="admin-panel__thead-th description__text"
          >
            количество билетов
          </th>
        </tr>
      </thead>
      <tbody class="admin-panel__tbody">
        <tr
          v-for="item in items"
          :key="item.id"
          class="admin-panel__tbody__tr"
        >
          <td class="date">{{ item.date }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.eventsName }}</td>
          <td>{{ item.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { Requests } from '@/entities/user';
  import { defineProps } from 'vue';

  defineProps<{
    items: Requests[];
  }>();
</script>

<style lang="scss" scoped>
  .admin-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-title {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    &__thead {
      & {
        border-bottom: 1px solid black;
      }
      &-th {
        padding: 10px 0;
        text-align: left;
      }
      &-th:last-child {
        text-align: right;
      }
    }

    &__tbody {
      &__tr {
        border-bottom: 1px solid black;
      }
      &__tr:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 10px 0;
      text-align: left;
    }
    td:last-child {
      text-align: right;
    }
  }
  .description__text {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
  }
  .date {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }
</style>
