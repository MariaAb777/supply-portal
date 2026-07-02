<template>
  <q-card flat class="app-card info-summary-card q-pa-md">
    <div class="info-summary-card__grid">
      <div
        v-for="item in items"
        :key="item.label"
        class="info-summary-card__item"
        :style="{ '--summary-color': item.color }"
      >
        <div class="info-summary-card__label">{{ item.label }}</div>
        <div class="info-summary-card__value">{{ item.value }}</div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string;
    value: string;
    color: string;
  }>;
}>();
</script>

<style scoped lang="scss">
.info-summary-card__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 12px;
}

.info-summary-card__item {
  border: 1px solid color-mix(in srgb, var(--summary-color) 32%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--summary-color) 12%, transparent);
  padding: 14px 16px;
}

.info-summary-card__label {
  color: var(--q-maintext);
  font-size: 12.5px;
  font-weight: 700;
}

.info-summary-card__value {
  margin-top: 7px;
  color: var(--summary-color);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.15;
}

@media (max-width: 760px) {
  .info-summary-card__grid {
    grid-template-columns: 1fr;
  }
}
</style>
