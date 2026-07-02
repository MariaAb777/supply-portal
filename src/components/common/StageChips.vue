<template>
  <div class="stage-filter-panel">
    <div class="stage-chips row wrap q-gutter-sm">
      <q-btn
        v-for="chip in chips"
        :key="chip.id"
        flat
        no-caps
        dense
        class="stage-chip"
        :class="{ 'stage-chip--active': chip.active || chip.id === modelValue }"
        :style="getChipStyle(chip)"
        @click="emit('update:modelValue', chip.id)"
      >
        {{ chip.label }}
        <span v-if="chip.total !== undefined" class="q-ml-xs text-weight-bold">
          <span class="stage-chip__total">{{ chip.total }}</span>
          <template v-if="chip.unread !== undefined">
            <span class="stage-chip__separator">/</span>
            <span class="stage-chip__unread">{{ chip.unread }}</span>
          </template>
        </span>
        <span v-else-if="chip.count !== undefined" class="q-ml-xs text-weight-bold">{{ chip.count }}</span>
      </q-btn>
    </div>
    <div v-if="barSegments.length" class="stage-bar row no-wrap">
      <span
        v-for="(seg, i) in barSegments"
        :key="i"
        class="stage-bar__seg"
        :style="{ width: seg.width, background: seg.color }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { StageChip } from "@/types";

const props = defineProps<{
  chips: StageChip[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function getChipStyle(chip: StageChip) {
  return {
    "--stage-color": chip.color ?? "var(--q-accent)"
  };
}

const barSegments = computed(() =>
  props.chips
    .filter((c) => c.color && c.id !== "all")
    .map((c) => ({
      width: `${Math.max((c.total ?? c.count ?? 1) * 2, 8)}%`,
      color: c.color!
    }))
);
</script>

<style scoped lang="scss">
.stage-filter-panel {
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--q-border);
  background: var(--app-soft-bg);
}

.stage-chip {
  border: 1px solid color-mix(in srgb, var(--stage-color) 32%, transparent);
  border-radius: 20px;
  background: color-mix(in srgb, var(--stage-color) 13%, transparent);
  padding: 7px 12px;
  color: var(--stage-color);
  font-size: 12.5px;
  font-weight: 600;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: color-mix(in srgb, var(--stage-color) 48%, transparent);
    background: color-mix(in srgb, var(--stage-color) 20%, transparent);
  }

  &--active {
    border-color: color-mix(in srgb, var(--stage-color) 70%, transparent);
    background: color-mix(in srgb, var(--stage-color) 28%, transparent);
    color: var(--stage-color);
    transform: scale(1.04);
  }
}

.stage-chip__total,
.stage-chip__separator {
  color: var(--stage-color);
}

.stage-chip__separator {
  margin: 0 2px;
}

.stage-chip__unread {
  display: inline-flex;
  min-width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: color-mix(in srgb, var(--stage-color) 40%, transparent);
  color: white;
  font-size: 11px;
  line-height: 1;
}

.stage-bar {
  height: 6px;
  margin-top: 12px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--app-track-bg);
}

.stage-bar__seg {
  height: 100%;
}
</style>
