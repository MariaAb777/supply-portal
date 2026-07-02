<template>
  <div class="app-pagination">
    <div class="app-pagination__total">Итого: {{ totalRows }} {{ label }}</div>

    <div class="app-pagination__pages">
      <q-btn
        flat
        dense
        round
        icon="chevron_left"
        class="app-pagination__arrow"
        :disable="page <= 1"
        @click="goToPage(page - 1)"
      />

      <q-btn
        v-for="pageItem in visiblePages"
        :key="pageItem"
        flat
        dense
        no-caps
        class="app-pagination__page"
        :class="{ 'app-pagination__page--active': pageItem === page }"
        :label="pageItem"
        @click="goToPage(pageItem)"
      />

      <q-btn
        flat
        dense
        round
        icon="chevron_right"
        class="app-pagination__arrow"
        :disable="page >= pagesNumber"
        @click="goToPage(page + 1)"
      />
    </div>

    <div class="app-pagination__size">
      <span>Выводить по:</span>
      <q-select
        :model-value="rowsPerPage"
        dense
        outlined
        emit-value
        map-options
        options-dense
        popup-content-class="app-select-menu"
        class="app-pagination__select"
        :options="rowsPerPageOptions"
        @update:model-value="setRowsPerPage(Number($event))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type PaginationModel = {
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  descending?: boolean;
};

const props = withDefaults(
  defineProps<{
    modelValue: PaginationModel;
    totalRows: number;
    pageSize?: number;
    label?: string;
  }>(),
  {
    pageSize: 5,
    label: "заявок"
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: PaginationModel];
}>();

const pagesNumber = computed(() => {
  return Math.max(1, Math.ceil(props.totalRows / rowsPerPage.value));
});

const rowsPerPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "25", value: 25 }
];

const rowsPerPage = computed(() => props.modelValue.rowsPerPage || props.pageSize);

const page = computed({
  get: () => Math.min(props.modelValue.page, pagesNumber.value),
  set: (value: number) => {
    emit("update:modelValue", { ...props.modelValue, page: value });
  }
});

const visiblePages = computed(() => {
  const pages = Array.from({ length: pagesNumber.value }, (_, index) => index + 1);

  if (pages.length <= 5) {
    return pages;
  }

  const start = Math.max(1, Math.min(page.value - 2, pagesNumber.value - 4));
  return Array.from({ length: 5 }, (_, index) => start + index);
});

function goToPage(nextPage: number) {
  page.value = Math.min(Math.max(nextPage, 1), pagesNumber.value);
}

function setRowsPerPage(value: number) {
  emit("update:modelValue", { ...props.modelValue, page: 1, rowsPerPage: value });
}
</script>

<style scoped lang="scss">
.app-pagination {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) auto minmax(180px, 1fr);
  align-items: center;
  gap: 16px;
  min-height: 64px;
  padding: 12px 16px;
  border: 1px solid var(--q-border);
  border-radius: 0 0 10px 10px;
  background: var(--q-secondary);
  color: var(--q-maintext);
}

.app-pagination__total,
.app-pagination__size {
  font-size: 12px;
  font-weight: 600;
}

.app-pagination__pages,
.app-pagination__size {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-pagination__pages {
  justify-content: center;
}

.app-pagination__size {
  justify-content: flex-end;
}

.app-pagination__arrow {
  color: var(--q-lighttext) !important;

  :deep(.q-icon) {
    color: var(--q-lighttext) !important;
  }

  &.disabled,
  &.disabled :deep(.q-icon) {
    color: var(--q-darktext) !important;
  }
}

.app-pagination__page {
  width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--q-lighttext);
  font-size: 12px;
  font-weight: 700;

  &--active {
    background: linear-gradient(145deg, #4d8fff, var(--q-accent));
    color: #fff;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--q-accent) 28%, transparent);
  }
}

.app-pagination__select {
  width: 70px;

  :deep(.q-field__control) {
    min-height: 36px;
    border-radius: 8px;
    background: var(--app-control-bg);
  }
}

@media (max-width: 760px) {
  .app-pagination {
    grid-template-columns: 1fr;
  }

  .app-pagination__total,
  .app-pagination__size {
    justify-content: center;
    text-align: center;
  }
}
</style>
