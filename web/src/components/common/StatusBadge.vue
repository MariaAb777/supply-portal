<template>
  <q-badge
    :class="['status-badge', `status-badge--${tone}`]"
    :label="label"
    rounded
  />
</template>

<script setup lang="ts">
import type { StatusTone } from "@/types";

defineProps<{
  label: string;
  tone?: StatusTone;
}>();
</script>

<style scoped lang="scss">
.status-badge {
  padding: 5px 11px;
  font-size: 12.5px;
  font-weight: 600;

  &--blue {
    background: var(--q-accent-transparent) !important;
    color: #7eb0ff !important;
  }

  &--green {
    background: var(--q-positive-transparent) !important;
    color: #6ee7a0 !important;
  }

  &--orange {
    background: var(--q-warning-transparent) !important;
    color: #f5d078 !important;
  }

  &--sand {
    background: rgba(242, 192, 55, 0.12) !important;
    color: #e8c96a !important;
  }

  &--slate {
    background: rgba(107, 114, 128, 0.18) !important;
    color: #9ca3af !important;
  }

  &--pink {
    background: var(--q-negative-transparent) !important;
    color: #f87171 !important;
  }

  &--purple {
    background: rgba(123, 92, 224, 0.18) !important;
    color: #b89cff !important;
  }
}
</style>
