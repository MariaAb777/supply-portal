<template>
  <div>
    <PageToolbar back-to="/" :crumbs="[{ label: 'Главная', to: '/' }, { label: 'Уведомления' }]" />
    <q-card flat class="app-card">
      <div class="empty-state q-pa-xl text-center text-maintext">
        Здесь появятся ваши уведомления по заявкам, КП и документам
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import PageToolbar from "@/components/common/PageToolbar.vue";
</script>

<style scoped>
.empty-state {
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
