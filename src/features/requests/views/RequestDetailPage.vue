<template>
  <div>
    <AppBreadcrumbs
      class="q-mb-md"
      :items="[
        { label: 'Заявки', to: '/requests' },
        { label: detail.id }
      ]"
    />

    <q-card flat class="app-card q-pa-lg q-mb-md">
      <div class="detail-metrics row q-col-gutter-md q-mb-md">
        <div class="col-12 col-sm-6">
          <div class="text-darktext text-caption">Выставлено</div>
          <div class="text-h5 text-lighttext text-weight-bold">{{ detail.billed }}</div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-darktext text-caption">Оплачено</div>
          <div class="text-h5 text-lighttext text-weight-bold">
            {{ detail.paid }} <span class="text-accent">/ {{ detail.paidPct }} %</span>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-darktext text-caption">Остаток</div>
          <div class="text-h6 text-lighttext text-weight-bold">{{ detail.remainder }}</div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-darktext text-caption q-mb-xs">Статус</div>
          <StatusBadge :label="detail.status" :tone="detail.statusTone" />
        </div>
      </div>

      <q-banner dense rounded class="bg-negative-transparent text-negative q-pa-sm">
        <template #avatar><q-icon name="error_outline" /></template>
        не удалось обновить · обновлено только что
      </q-banner>
    </q-card>

    <q-card flat class="app-card detail-tabs-card">
      <q-tabs
        v-model="activeTab"
        dense
        no-caps
        align="left"
        active-color="accent"
        indicator-color="accent"
        class="detail-tabs"
      >
        <q-tab name="kp" icon="description" label="Коммерческое предложение" />
        <q-tab name="payments" icon="receipt_long" label="Счёт и платежи" />
        <q-tab name="manager" icon="person" label="Менеджер" />
      </q-tabs>

      <q-separator class="bg-border" />

      <q-tab-panels v-model="activeTab" animated class="detail-tab-panels">
        <q-tab-panel name="kp" class="q-pa-lg">
          <div class="text-weight-bold q-mb-sm">{{ detail.kpId }}</div>
          <DetailRow label="Срок действия" :value="detail.kpValid" />
          <DetailRow label="Срок поставки" :value="detail.kpDelivery" />
          <DetailRow :label="detail.kpItem" :value="detail.kpSum" />
          <DetailRow label="Итого" :value="detail.kpSum" bold />
          <q-btn  no-caps color="accent" class="q-mt-md" :to="{ name: 'kp-card', params: { id: detail.kpId } }">
            Открыть КП <q-icon name="chevron_right" />
          </q-btn>
        </q-tab-panel>

        <q-tab-panel name="payments" class="q-pa-lg">
          <div class="payment-progress-badge q-mb-md">оплачено {{ detail.paidPct }} %</div>
          <DetailRow label="Счёт" :value="detail.invoice" />
          <DetailRow label="Выставлено" :value="detail.billed" />
          <DetailRow label="Оплачено" :value="detail.paid" />
        </q-tab-panel>

        <q-tab-panel name="manager" class="q-pa-lg">
          <DetailRow label="Менеджер" :value="detail.manager" />
          <DetailRow label="Телефон" :value="detail.managerPhone" />
          <DetailRow label="E-mail" :value="detail.managerEmail" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import AppBreadcrumbs from "@/components/common/AppBreadcrumbs.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";
import DetailRow from "@/components/common/DetailRow.vue";
import { getRequestDetail } from "@/data/mock";

const route = useRoute();
const detail = computed(() => getRequestDetail(String(route.params.id)));
const activeTab = ref("kp");
</script>

<style scoped lang="scss">
.detail-metrics {
  border-bottom: 1px solid var(--q-border);
  padding-bottom: 12px;
}

.detail-tabs-card {
  overflow: hidden;
}

.detail-tabs {
  color: var(--q-maintext);

  :deep(.q-tab) {
    min-height: 52px;
    font-weight: 700;
  }

  :deep(.q-tab__content) {
    flex-direction: row;
    gap: 8px;
  }

  :deep(.q-tab__icon) {
    margin: 0;
  }

  :deep(.q-tab--active) {
    color: var(--q-accent);
  }
}

.detail-tab-panels {
  background: transparent;
  color: var(--q-maintext);
}

.payment-progress-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid color-mix(in srgb, var(--q-accent) 35%, transparent);
  border-radius: 999px;
  background: var(--q-accent-transparent);
  color: var(--q-accent);
  font-size: 12.5px;
  font-weight: 700;
  padding: 5px 11px;
}

@media (max-width: 700px) {
  .detail-tabs {
    :deep(.q-tabs__content) {
      flex-wrap: nowrap;
      overflow-x: auto;
    }

    :deep(.q-tab) {
      flex: 0 0 auto;
      min-width: max-content;
      padding: 0 12px;
    }
  }

  .detail-tab-panels :deep(.q-tab-panel) {
    padding: 16px;
  }
}
</style>
