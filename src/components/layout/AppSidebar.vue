<template>
  <q-drawer
    :model-value="true"
    :mini="isMini"
    :width="280"
    :mini-width="78"
    behavior="desktop"
    class="app-sidebar"
    :class="{ 'app-sidebar--collapsed': isMini }"
    no-swipe-close
    no-swipe-open
  >
    <div class="app-sidebar__content column no-wrap fit">
      <q-toolbar class="app-sidebar__toolbar">
        <router-link to="/" class="app-sidebar__brand row items-center no-wrap">
          <div class="app-sidebar__logo row flex-center">
            <q-icon name="mdi-package-variant-closed" color="white" size="22px" />
          </div>
          <span v-if="!isMini" class="app-sidebar__brand-name">Система Снабжения</span>
        </router-link>
      </q-toolbar>

      <q-list class="app-sidebar__list">
        <div v-if="!isMini" class="app-sidebar__group-label">Кабинет</div>

        <q-item
          v-for="item in menuItems"
          :key="item.to"
          clickable
          :to="item.to"
          class="app-sidebar__item"
          :active="isItemActive(item)"
          active-class="app-sidebar__item--active"
        >
          <q-item-section avatar class="app-sidebar__item-icon">
            <q-icon :name="item.icon" size="20px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="!isMini && (item.total !== undefined || item.unread !== undefined)" side>
            <NavCountBadge :total="item.total" :unread="item.unread" />
          </q-item-section>
          <q-tooltip v-if="isMini" anchor="center right" self="center left" class="app-sidebar__tooltip">
            {{ item.label }}
          </q-tooltip>
        </q-item>
      </q-list>

      <div class="app-sidebar__bottom">
        <q-separator class="app-sidebar__separator" />

        <div class="app-sidebar__bottom-action app-sidebar__bottom-action--theme">
          <q-icon name="dark_mode" size="18px" />
          <span v-if="!isMini">Тёмная тема</span>
          <q-toggle
            v-if="!isMini"
            v-model="isDarkTheme"
            dense
            color="accent"
            size="32px"
          />
          <q-tooltip v-else anchor="center right" self="center left" class="app-sidebar__tooltip">
            Тёмная тема
          </q-tooltip>
        </div>

        <button class="app-sidebar__bottom-action app-sidebar__bottom-action--button" type="button">
          <q-icon name="logout" size="18px" />
          <span v-if="!isMini">Выход</span>
          <q-tooltip v-if="isMini" anchor="center right" self="center left" class="app-sidebar__tooltip">
            Выход
          </q-tooltip>
        </button>
      </div>

      <div v-if="!$q.screen.lt.md" class="app-sidebar__collapse">
        <q-separator class="app-sidebar__separator" />
        <button class="app-sidebar__collapse-button" type="button" @click="isCollapsed = !isCollapsed">
          <q-icon :name="isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left'" size="22px" />
        </button>
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import NavCountBadge from "@/components/common/NavCountBadge.vue";
import { navCounts } from "@/data/mock";

type MenuItem = {
  to: string;
  label: string;
  icon: string;
  routeNames: string[];
  total?: number;
  unread?: number;
};

const route = useRoute();
const $q = useQuasar();
const isCollapsed = ref(false);
const isMini = computed(() => isCollapsed.value || $q.screen.lt.md);
const isDarkTheme = computed({
  get: () => $q.dark.isActive,
  set: setDarkTheme
});

const menuItems: MenuItem[] = [
  { to: "/", label: "Главная", icon: "dashboard", routeNames: ["home"] },
  { to: "/requests", label: "Заявки", icon: "assignment", routeNames: ["requests", "request-detail"], ...navCounts.home },
  { to: "/orders", label: "Заказы", icon: "inventory_2", routeNames: ["orders"], ...navCounts.orders },
  { to: "/kp", label: "КП", icon: "description", routeNames: ["kp", "kp-card"], ...navCounts.kp },
  { to: "/docs", label: "Документы", icon: "folder_copy", routeNames: ["docs"], total: navCounts.docs.total },
  { to: "/chat", label: "Чат", icon: "chat_bubble_outline", routeNames: ["chat"], unread: navCounts.chat.unread }
];

function isItemActive(item: MenuItem): boolean {
  return item.routeNames.includes(String(route.name));
}

function setDarkTheme(value: boolean) {
  $q.dark.set(value);
  window.localStorage.setItem("supply-portal-theme", value ? "dark" : "light");
}
</script>

<style scoped lang="scss">
.app-sidebar {
  background-color: var(--app-chrome-bg) !important;
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--q-border) !important;
  color: var(--q-maintext);

  :deep(.q-drawer__content) {
    background-color: var(--app-chrome-bg) !important;
    box-shadow: inset -1px 0 0 var(--q-border);
  }
}

.app-sidebar__content {
  background-color: var(--app-chrome-bg);
  min-height: 100%;
}

.app-sidebar__toolbar {
  height: 60px;
  min-height: 60px;
  background-color: var(--app-chrome-bg) !important;
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--q-border);
  border-bottom: 1px solid var(--q-border);
}

.app-sidebar__brand {
  gap: 10px;
  color: var(--q-lighttext);
  font-weight: 700;
  text-decoration: none;
}

.app-sidebar__logo {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 11px;
  background: linear-gradient(150deg, #4d8fff, #2d6fff);
}

.app-sidebar__brand-name {
  font-size: 15px;
  line-height: 1.2;
}

.app-sidebar__list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 14px 10px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.app-sidebar__group-label {
  padding: 4px 10px 10px;
  color: var(--q-darktext);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-sidebar__item {
  position: relative;
  min-height: 46px;
  margin-bottom: 4px;
  border-radius: 9px;
  background: transparent;
  color: var(--q-maintext);
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: var(--q-menu);
    color: var(--q-lighttext);
  }

  :deep(.q-icon) {
    color: var(--q-darktext);
  }

  &:hover :deep(.q-icon) {
    color: var(--q-accent);
  }

  :deep(.q-focus-helper) {
    display: none;
  }
}

.app-sidebar__item-icon {
  min-width: 40px;
}

.app-sidebar__item--active {
  background: var(--q-accent-transparent);
  color: var(--q-accent);

  :deep(.q-icon) {
    color: var(--q-accent);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 24px;
    border-radius: 0 2px 2px 0;
    background: var(--q-accent);
    transform: translateY(-50%);
  }
}

.app-sidebar__collapse {
  flex: 0 0 auto;
}

.app-sidebar__bottom {
  flex: 0 0 auto;
  padding: 0 10px 8px;
}

.app-sidebar__separator {
  background: var(--q-border);
}

.app-sidebar__bottom-action {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  width: 100%;
  min-height: 46px;
  align-items: center;
  gap: 4px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--q-maintext);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  text-align: left;

  :deep(.q-icon) {
    color: var(--q-maintext);
  }
}

.app-sidebar__bottom-action--theme {
  margin-top: 10px;
  padding: 0 6px;
}

.app-sidebar__bottom-action--button {
  padding: 0 6px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: var(--q-menu);
    color: var(--q-lighttext);
    outline: none;

    :deep(.q-icon) {
      color: var(--q-accent);
    }
  }
}

.app-sidebar__bottom-action :deep(.q-toggle__track) {
  opacity: 1;
  background: color-mix(in srgb, var(--q-menu) 76%, transparent);
}

.app-sidebar__bottom-action :deep(.q-toggle__thumb) {
  color: var(--q-lighttext);
}

.app-sidebar__collapse-button {
  display: flex;
  width: 100%;
  height: 52px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: var(--q-maintext);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: var(--q-menu);
    color: var(--q-accent);
    outline: none;
  }
}

.app-sidebar__tooltip {
  border: 1px solid var(--q-border);
  background: var(--q-secondary);
  color: var(--q-lighttext);
  font-size: 13px;
}

.app-sidebar--collapsed {
  .app-sidebar__toolbar {
    justify-content: center;
    padding: 0;
  }

  .app-sidebar__brand {
    justify-content: center;
    width: 100%;
  }

  .app-sidebar__list {
    padding: 14px 8px;
  }

  .app-sidebar__item {
    justify-content: center;
    padding: 8px 0;
  }

  .app-sidebar__item-icon {
    align-items: center;
    min-width: 100%;
    padding-right: 0;
  }

  .app-sidebar__bottom {
    padding: 0 8px 8px;
  }

  .app-sidebar__bottom-action {
    display: flex;
    justify-content: center;
    min-height: 42px;
    padding: 0;
  }

  :deep(.q-item__section:not(.app-sidebar__item-icon)) {
    display: none;
  }
}
</style>
