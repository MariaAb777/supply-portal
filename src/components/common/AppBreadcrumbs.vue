<template>
  <div class="breadcrumbs row items-center no-wrap text-weight-medium">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0" class="text-darktext q-mx-xs">›</span>
      <router-link v-if="item.to" :to="item.to" class="text-lighttext">{{ item.label }}</router-link>
      <span v-else class="text-accent">{{ item.label }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CrumbItem } from "@/components/common/PageToolbar.vue";

defineProps<{
  items: CrumbItem[];
}>();
</script>
