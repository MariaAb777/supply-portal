<template>
  <div>
    <h2 class="page-title">КП</h2>
    <AppTableCard>
      <AppTableFilters
        v-model:search="search"
        v-model:status="statusFilter"
        v-model:quantity="quantityFilter"
        :status-options="statusOptions"
        :quantity-options="quantityOptions"
        @reset="resetFilters"
      />
      <q-table flat class="standart-table kp-table" :rows="filteredRows" :columns="columns" row-key="id" hide-bottom :pagination="{ rowsPerPage: 0 }">
        <template #body-cell-requestId="props">
          <q-td :props="props" :class="{ 'unread-row': props.row.unread }">
            <router-link :to="{ name: 'request-detail', params: { id: props.row.requestId } }" class="text-accent text-weight-bold">
              <span v-if="props.row.unread" class="unread-dot" />
              {{ props.row.requestId }}
            </router-link>
            <div class="text-darktext text-caption">{{ props.row.requestDate }}</div>
          </q-td>
        </template>
        <template #body-cell-kpId="props">
          <q-td :props="props">
            <router-link :to="{ name: 'kp-card', params: { id: props.row.kpId } }" class="text-accent text-weight-bold">{{ props.row.kpId }}</router-link>
            <div class="text-darktext text-caption">{{ props.row.kpDate }}</div>
          </q-td>
        </template>
        <template #body-cell-pdf="props">
          <q-td :props="props">
            <PdfButton v-if="props.row.hasPdf" />
            <span v-else class="text-darktext">—</span>
          </q-td>
        </template>
        <template #body-cell-item="props">
          <q-td :props="props" class="text-weight-bold">
            <AppTruncatedText :text="props.row.item" max-width="150px" />
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
import StatusBadge from "@/components/common/StatusBadge.vue";
import PdfButton from "@/components/common/PdfButton.vue";
import { kpRows } from "@/data/mock";

const search = ref("");
const statusFilter = ref("all");
const quantityFilter = ref("all");

const statusOptions = [
  { label: "Все статусы", value: "all" },
  ...Array.from(new Set(kpRows.map((row) => row.status))).map((status) => ({ label: status, value: status }))
];

const quantityOptions = [
  { label: "Все количества", value: "all" },
  ...Array.from(new Set(kpRows.map((row) => row.qty))).map((qty) => ({ label: qty, value: qty }))
];

const filteredRows = computed(() => {
  const query = search.value.trim().toLowerCase();

  return kpRows.filter((row) => {
    const matchesSearch =
      !query ||
      [row.requestId, row.kpId, row.item, row.brand, row.sum, row.delivery, row.status].some((value) =>
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

const columns: QTableColumn[] = [
  { name: "requestId", label: "Заявка", field: "requestId", align: "left" },
  { name: "kpId", label: "КП", field: "kpId", align: "left" },
  { name: "pdf", label: "КП/PDF", field: "hasPdf", align: "left" },
  { name: "item", label: "Товар", field: "item", align: "left" },
  { name: "brand", label: "Бренд", field: "brand", align: "left" },
  { name: "qty", label: "Кол-во", field: "qty", align: "right" },
  { name: "sum", label: "Сумма", field: "sum", align: "right" },
  { name: "delivery", label: "Срок поставки", field: "delivery", align: "left" },
  { name: "status", label: "Статус", field: "status", align: "left" }
];
</script>

<style scoped>
.unread-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-radius: 50%;
  background: var(--q-accent);
}

</style>
