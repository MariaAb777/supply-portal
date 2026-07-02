<template>
  <q-layout view="LHh lpR fFf" class="main-layout">
    <AppSidebar />
    <q-header class="bg-transparent" :elevated="false">
      <AppHeader />
    </q-header>
    <q-page-container>
      <q-page class="q-pa-lg main-page">
        <div class="main-page__content">
          <router-view />
        </div>
        <transition name="page-loading-fade">
          <div v-if="isPageLoading" class="page-loading-overlay">
            <q-spinner color="accent" size="44px" :thickness="4" />
            <div class="page-loading-overlay__text">Загрузка...</div>
          </div>
        </transition>
        <AppFooter />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";

const router = useRouter();
const isPageLoading = ref(false);
let hideTimer: number | null = null;

function hideLoader() {
  if (hideTimer) {
    window.clearTimeout(hideTimer);
  }

  hideTimer = window.setTimeout(() => {
    isPageLoading.value = false;
  }, 250);
}

const removeBeforeGuard = router.beforeEach((to, from) => {
  if (to.fullPath !== from.fullPath) {
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }

    isPageLoading.value = true;
  }
});

const removeAfterHook = router.afterEach(() => {
  hideLoader();
});

router.onError(() => {
  hideLoader();
});

onBeforeUnmount(() => {
  removeBeforeGuard();
  removeAfterHook();

  if (hideTimer) {
    window.clearTimeout(hideTimer);
  }
});
</script>

<style scoped lang="scss">
.main-layout {
  background: var(--q-primary);
  overflow-x: hidden;
}

.main-page {
  position: relative;
  display: flex;
  width: 100%;
  min-height: inherit;
  flex-direction: column;
  background: var(--q-primary);
  box-sizing: border-box;
  color: var(--q-maintext);
  max-width: 1600px;
  margin: 0 auto;
  overflow-x: hidden;
}

.main-page__content {
  flex: 1 0 auto;
  min-width: 0;
}

.page-loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--app-overlay-bg);
  backdrop-filter: blur(3px);
}

.page-loading-overlay__text {
  color: var(--q-lighttext);
  font-size: 13px;
  font-weight: 700;
}

.page-loading-fade-enter-active,
.page-loading-fade-leave-active {
  transition: opacity 0.18s ease;
}

.page-loading-fade-enter-from,
.page-loading-fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .main-page {
    padding: 16px !important;
  }
}

@media (max-width: 600px) {
  .main-page {
    padding: 12px !important;
  }
}
</style>
