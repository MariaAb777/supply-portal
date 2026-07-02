<template>
  <div>
    <h2 class="page-title">Заказы</h2>
    <InfoSummaryCard :items="orderSummaryItems" class="q-mb-md" />
    <AppTableCard>
      <AppTableFilters
        v-model:search="search"
        v-model:status="statusFilter"
        v-model:quantity="quantityFilter"
        :status-options="statusOptions"
        :quantity-options="quantityOptions"
        @reset="resetFilters"
      />
      <q-table flat class="standart-table orders-table" :rows="filteredRows" :columns="columns" row-key="id" hide-bottom :pagination="{ rowsPerPage: 0 }">
        <template #body-cell-id="props">
          <q-td :props="props">
            <router-link :to="{ name: 'request-detail', params: { id: props.row.id } }" class="text-accent text-weight-bold">{{ props.row.id }}</router-link>
          </q-td>
        </template>
        <template #body-cell-invoice="props">
          <q-td :props="props">
            <div class="text-weight-bold">{{ props.row.invoice }}</div>
            <div class="text-darktext text-caption">{{ props.row.invoiceDate }}</div>
          </q-td>
        </template>
        <template #body-cell-pdf="props">
          <q-td :props="props"><PdfButton v-if="props.row.hasPdf" /></q-td>
        </template>
        <template #body-cell-item="props">
          <q-td :props="props" class="text-weight-bold">
            <AppTruncatedText :text="props.row.item" max-width="260px" />
          </q-td>
        </template>
        <template #body-cell-brand="props">
          <q-td :props="props">
            <AppTruncatedText :text="props.row.brand" max-width="150px" />
          </q-td>
        </template>
        <template #body-cell-delivery="props">
          <q-td :props="props">
            <AppTruncatedText :text="props.row.delivery" max-width="150px" />
          </q-td>
        </template>
        <template #body-cell-supplyDate="props">
          <q-td :props="props">
            <span>{{ props.row.supplyDate }}</span>
            <div v-if="props.row.supplyNote" class="text-darktext text-caption">{{ props.row.supplyNote }}</div>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props"><StatusBadge :label="props.row.status" :tone="props.row.statusTone" /></q-td>
        </template>
      </q-table>
    </AppTableCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { QTableColumn } from "quasar";
import AppTableCard from "@/components/common/AppTableCard.vue";
import AppTableFilters from "@/components/common/AppTableFilters.vue";
import AppTruncatedText from "@/components/common/AppTruncatedText.vue";
import InfoSummaryCard from "@/components/common/InfoSummaryCard.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";
import PdfButton from "@/components/common/PdfButton.vue";
import { orderRows } from "@/data/mock";

const search = ref("");
const statusFilter = ref("all");
const quantityFilter = ref("all");

const statusOptions = [
  { label: "Все статусы", value: "all" },
  ...Array.from(new Set(orderRows.map((row) => row.status))).map((status) => ({ label: status, value: status }))
];

const quantityOptions = [
  { label: "Все количества", value: "all" },
  ...Array.from(new Set(orderRows.map((row) => row.qty))).map((qty) => ({ label: qty, value: qty }))
];

const filteredRows = computed(() => {
  const query = search.value.trim().toLowerCase();

  return orderRows.filter((row) => {
    const matchesSearch =
      !query ||
      [row.id, row.invoice, row.item, row.brand, row.sum, row.delivery, row.orderDate, row.supplyDate, row.upd, row.status].some((value) =>
        value.toLowerCase().includes(query)
      );
    const matchesStatus = statusFilter.value === "all" || row.status === statusFilter.value;
    const matchesQuantity = quantityFilter.value === "all" || row.qty === quantityFilter.value;

    return matchesSearch && matchesStatus && matchesQuantity;
  });
});

function resetFilters() {
  search.value = "";
  statusFilter.value = "all";
  quantityFilter.value = "all";
}

const orderSummaryItems = [
  { label: "Выставлено", value: "7 464 000 ₽", color: "#7eb0ff" },
  { label: "Оплачено", value: "6 444 000 ₽", color: "#6ee7a0" },
  { label: "К оплате", value: "1 020 000 ₽", color: "#e8c96a" }
];

const columns: QTableColumn[] = [
  { name: "id", label: "Заявка", field: "id", align: "left" },
  { name: "invoice", label: "Счёт / дата", field: "invoice", align: "left" },
  { name: "pdf", label: "Счёт", field: "hasPdf", align: "left" },
  { name: "item", label: "Товар", field: "item", align: "left" },
  { name: "brand", label: "Бренд", field: "brand", align: "left" },
  { name: "qty", label: "Кол-во", field: "qty", align: "right" },
  { name: "sum", label: "Сумма", field: "sum", align: "right" },
  { name: "delivery", label: "Срок поставки", field: "delivery", align: "left" },
  { name: "orderDate", label: "Дата заказа", field: "orderDate", align: "left" },
  { name: "supplyDate", label: "Дата поставки", field: "supplyDate", align: "left" },
  { name: "upd", label: "УПД", field: "upd", align: "left" },
  { name: "status", label: "Статус", field: "status", align: "left" }
];
</script>
