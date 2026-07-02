<template>
  <div class="app-table-filters">
    <div class="app-table-filters__controls">
      <q-input
        :model-value="search"
        dense
        outlined
        clearable
        class="app-table-filters__search"
        placeholder="Поиск по заявкам, КП, товарам..."
        @update:model-value="emit('update:search', String($event ?? ''))"
      >
        <template #prepend>
          <q-icon name="search" size="18px" />
        </template>
      </q-input>

      <q-select
        :model-value="status"
        dense
        outlined
        emit-value
        map-options
        options-dense
        popup-content-class="app-select-menu"
        class="app-table-filters__select"
        :options="statusOptions"
        label="Статус"
        @update:model-value="emit('update:status', String($event ?? 'all'))"
      />

      <q-select
        :model-value="quantity"
        dense
        outlined
        emit-value
        map-options
        options-dense
        popup-content-class="app-select-menu"
        class="app-table-filters__select"
        :options="quantityOptions"
        label="Кол-во"
        @update:model-value="emit('update:quantity', String($event ?? 'all'))"
      />
    </div>

    <q-btn flat no-caps class="app-table-filters__reset" @click="emit('reset')">
      <q-icon name="refresh" size="17px" class="q-mr-xs" />
      Сбросить фильтры
    </q-btn>
  </div>
</template>

<script setup lang="ts">
type TableFilterOption = {
  label: string;
  value: string;
};

defineProps<{
  search: string;
  status: string;
  quantity: string;
  statusOptions: TableFilterOption[];
  quantityOptions: TableFilterOption[];
}>();

const emit = defineEmits<{
  "update:search": [value: string];
  "update:status": [value: string];
  "update:quantity": [value: string];
  reset: [];
}>();
</script>

<style scoped lang="scss">
.app-table-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--q-border);
  background: var(--app-soft-bg);
}

.app-table-filters__controls {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: 10px;
}

.app-table-filters__search {
  width: min(360px, 100%);
}

.app-table-filters__select {
  width: 150px;
}

.app-table-filters__search,
.app-table-filters__select {
  :deep(.q-field__control) {
    min-height: 38px;
    border-radius: 10px;
    background: var(--app-control-bg);
  }
}

.app-table-filters__reset {
  height: 38px;
  flex: 0 0 auto;
  border: 1px solid var(--q-border);
  border-radius: 10px;
  color: var(--q-maintext);
  font-size: 12px;
  font-weight: 700;

  &:hover {
    color: var(--q-accent);
  }
}

@media (max-width: 900px) {
  .app-table-filters,
  .app-table-filters__controls {
    align-items: stretch;
    flex-direction: column;
  }

  .app-table-filters__search,
  .app-table-filters__select,
  .app-table-filters__reset {
    width: 100%;
  }
}
</style>
