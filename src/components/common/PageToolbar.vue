<template>
  <div v-if="showToolbar" class="page-toolbar row items-center q-gutter-md q-mb-md flex-wrap">
    <q-btn v-if="backTo" flat no-caps class="text-lighttext" :to="backTo">
      <q-icon name="chevron_left" class="q-mr-xs" />
      Назад
    </q-btn>
    <AppBreadcrumbs v-if="crumbs.length" :items="crumbs" />
    <slot name="aside" />
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumbs from "@/components/common/AppBreadcrumbs.vue";

export interface CrumbItem {
  label: string;
  to?: string | { name: string; params?: Record<string, string> };
}

withDefaults(
  defineProps<{
    backTo?: string | { name: string };
    crumbs?: CrumbItem[];
    showToolbar?: boolean;
  }>(),
  {
    crumbs: () => [],
    showToolbar: true
  }
);
</script>
