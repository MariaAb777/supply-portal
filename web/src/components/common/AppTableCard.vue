<template>
  <q-card flat class="app-card app-table-card column">
    <div v-if="$slots.toolbar" class="app-table-card__toolbar q-pa-md">
      <slot name="toolbar" />
    </div>
    <q-separator v-if="$slots.toolbar" class="bg-border" />
    <div class="app-table-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="app-table-card__footer">
      <slot name="footer" />
    </div>
  </q-card>
</template>

<style scoped lang="scss">
.app-table-card {
  min-width: 0;
  overflow: hidden;
}

.app-table-card__body {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
}

.app-table-card__footer {
  border-top: 1px solid var(--q-border);
}

.app-table-card__footer :deep(.app-pagination) {
  border: 0;
  border-radius: 0;
}
</style>
