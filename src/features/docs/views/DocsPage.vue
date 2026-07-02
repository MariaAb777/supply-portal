<template>
  <div>
    <h2 class="page-title">Документы</h2>
    <AppTableCard>
      <AppTableFilters
        v-model:search="search"
        v-model:status="statusFilter"
        v-model:quantity="quantityFilter"
        :status-options="statusOptions"
        :quantity-options="quantityOptions"
        @reset="resetFilters"
      />
      <q-table flat class="standart-table" :rows="filteredRows" :columns="columns" row-key="id" hide-bottom :pagination="{ rowsPerPage: 0 }">
        <template #body-cell-title="props">
          <q-td :props="props">
            <AppTruncatedText :text="props.row.title" max-width="220px" class="text-weight-bold text-lighttext" />
          </q-td>
        </template>
        <template #body-cell-pdf="props">
          <q-td :props="props"><PdfButton v-if="props.row.hasPdf" /></q-td>
        </template>
        <template #body-cell-requestId="props">
          <q-td :props="props">
            <router-link v-if="props.row.requestId" :to="{ name: 'request-detail', params: { id: props.row.requestId } }" class="text-accent text-weight-bold">{{ props.row.requestId }}</router-link>
            <span v-else class="text-darktext">—</span>
          </q-td>
        </template>
        <template #body-cell-type="props">
          <q-td :props="props"><StatusBadge :label="props.row.type" :tone="props.row.typeTone" /></q-td>
        </template>
        <template #body-cell-item="props">
          <q-td :props="props">
            <AppTruncatedText :text="props.row.item" max-width="240px" />
          </q-td>
        </template>
        <template #body-cell-brand="props">
          <q-td :props="props">
            <AppTruncatedText :text="props.row.brand" max-width="140px" />
          </q-td>
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
import { docRows } from "@/data/mock";

const search = ref("");
const statusFilter = ref("all");
const quantityFilter = ref("all");

const statusOptions = [
  { label: "Все статусы", value: "all" },
  ...Array.from(new Set(docRows.map((row) => row.type))).map((type) => ({ label: type, value: type }))
];

const quantityOptions = [
  { label: "Все количества", value: "all" },
  ...Array.from(new Set(docRows.map((row) => row.qty))).map((qty) => ({ label: qty, value: qty }))
];

const filteredRows = computed(() => {
  const query = search.value.trim().toLowerCase();

  return docRows.filter((row) => {
    const matchesSearch =
      !query ||
      [row.title, row.date, row.requestId ?? "", row.item, row.brand, row.qty, row.sum, row.type].some((value) =>
        value.toLowerCase().includes(query)
      );
    const matchesStatus = statusFilter.value === "all" || row.type === statusFilter.value;
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
  { name: "title", label: "Документ", field: "title", align: "left" },
  { name: "pdf", label: "PDF", field: "hasPdf", align: "left" },
  { name: "date", label: "Дата", field: "date", align: "left" },
  { name: "requestId", label: "Заявка", field: "requestId", align: "left" },
  { name: "item", label: "Товар", field: "item", align: "left" },
  { name: "brand", label: "Бренд", field: "brand", align: "left" },
  { name: "qty", label: "Кол-во", field: "qty", align: "right" },
  { name: "sum", label: "Сумма", field: "sum", align: "right" },
  { name: "type", label: "Тип", field: "type", align: "left" }
];
</script>
