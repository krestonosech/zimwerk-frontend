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
          <td
            class="date"
            data-label="дата"
          >
            {{ item.date }}
          </td>
          <td data-label="адрес электронной почты">{{ item.email }}</td>
          <td data-label="событие">{{ item.eventsName }}</td>
          <td data-label="количество билетов">{{ item.count }}</td>
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
  @media (max-width: 750px) {
    .admin-panel table,
    .admin-panel thead,
    .admin-panel tbody,
    .admin-panel tr,
    .admin-panel th,
    .admin-panel td {
      background-color: transparent;
      display: block;
      width: 100%;
    }

    .admin-panel thead {
      display: none;
    }

    .admin-panel__tbody__tr {
      margin-bottom: 16px;
      border-bottom: 2px solid #eee;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      background: #fff;
      padding: 10px 0;
    }

    .admin-panel td {
      position: relative;
      padding-left: 50%;
      min-height: 32px;
      border: none;
      text-align: left !important;
      box-sizing: border-box;
      font-size: 16px;
      display: flex;
      align-items: center;
      width: 100%;
      white-space: normal;
      overflow-wrap: break-word;
    }

    .admin-panel td::before {
      content: attr(data-label) ': ';
      position: absolute;
      left: 10px;
      top: 10px;
      width: 45%;
      font-weight: bold;
      white-space: normal;
      font-size: 14px;
      color: #888;
      text-align: left;
    }

    .admin-panel td.date {
      font-size: 18px;
      font-weight: 500;
    }
  }
</style>
