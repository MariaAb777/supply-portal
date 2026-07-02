<template>
  <span class="app-truncated-text" :style="{ maxWidth }">
    {{ text }}
    <q-tooltip v-if="text" class="app-truncated-text__tooltip" anchor="top middle" self="bottom middle">
      {{ text }}
    </q-tooltip>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string | number | null;
    maxWidth?: string;
  }>(),
  {
    text: "",
    maxWidth: "200px"
  }
);
</script>

<style scoped lang="scss">
.app-truncated-text {
  display: inline-block;
  min-width: 0;
  overflow-wrap: anywhere;
  vertical-align: bottom;
  white-space: normal;
  word-break: break-word;
}

.app-truncated-text__tooltip {
  max-width: 360px;
  border: 1px solid var(--q-border);
  background: var(--q-secondary);
  color: var(--q-lighttext);
  font-size: 12.5px;
  line-height: 1.35;
}
</style>
