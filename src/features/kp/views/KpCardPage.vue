<template>
  <div>
    <AppBreadcrumbs
      class="q-mb-md"
      :items="[
        { label: 'КП', to: '/kp' },
        { label: card.id }
      ]"
    />

    <q-card flat class="app-card q-pa-lg q-mb-md">
      <div class="row q-col-gutter-lg">
        <div v-for="item in meta" :key="item.label" class="col-12 col-sm-6 col-md">
          <div class="text-darktext text-caption">{{ item.label }}</div>
          <div class="text-lighttext text-weight-bold q-mt-xs">
            <router-link v-if="item.link" :to="item.link" class="text-accent">{{ item.value }}</router-link>
            <StatusBadge v-else-if="item.badge" :label="item.value" tone="blue" />
            <span v-else>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </q-card>

    <AppTableCard>
      <q-table flat class="standart-table" :rows="card.items" :columns="columns" row-key="num" hide-bottom :pagination="{ rowsPerPage: 0 }" />
    </AppTableCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { QTableColumn } from "quasar";
import AppBreadcrumbs from "@/components/common/AppBreadcrumbs.vue";
import AppTableCard from "@/components/common/AppTableCard.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";
import { getKpCard } from "@/data/mock";

const route = useRoute();
const card = computed(() => getKpCard(String(route.params.id)));

const meta = computed(() => [
  { label: "Заявка", value: card.value.requestId, link: { name: "request-detail", params: { id: "ДГ-2025-015" } } },
  { label: "Бренд", value: card.value.brand },
  { label: "Всего позиций", value: String(card.value.positions) },
  { label: "Количество", value: card.value.qty },
  { label: "Статус", value: card.value.status, badge: true }
]);

const columns: QTableColumn[] = [
  { name: "num", label: "№", field: "num", align: "left" },
  { name: "item", label: "Товар", field: "item", align: "left", style: "font-weight:600" },
  { name: "brand", label: "Бренд", field: "brand", align: "left" },
  { name: "article", label: "Арт.", field: "article", align: "left" },
  { name: "qty", label: "Кол-во", field: "qty", align: "right" }
];
</script>
