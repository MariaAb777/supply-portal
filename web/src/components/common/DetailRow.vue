<template>
  <div class="detail-row row justify-between q-py-xs">
    <span class="text-maintext">{{ label }}</span>
    <span :class="['text-right', bold ? 'text-weight-bold text-lighttext' : 'text-lighttext']">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  bold?: boolean;
}>();
</script>

<style scoped>
.detail-row {
  border-bottom: 1px solid rgba(226, 232, 240, 0.06);
}
</style>
