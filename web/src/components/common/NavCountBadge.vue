<template>
  <span class="nav-count row items-center no-wrap">
    <template v-if="total !== undefined && unread !== undefined">
      <span>{{ total }}</span><span class="nav-count__sep">/</span><span class="text-accent">{{ unread }}</span>
    </template>
    <template v-else-if="unread !== undefined">
      <span class="text-accent">{{ unread }}</span>
    </template>
    <template v-else-if="total !== undefined">
      <span>{{ total }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  total?: number;
  unread?: number;
}>();
</script>

<style scoped>
.nav-count {
  font-size: 12px;
  font-weight: 700;
  gap: 3px;
}

.nav-count__sep {
  color: var(--q-darktext);
}
</style>
