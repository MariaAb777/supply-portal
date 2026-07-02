<template>
  <header class="app-header">
    <div class="app-header__left">
      <div class="header-search row items-center no-wrap">
        <q-icon name="search" size="16px" class="text-darktext" />
        <input
          v-model="search"
          class="header-search__input"
          placeholder="Поиск по кабинету: заявки, КП, документы, чат..."
          @focus="isSearchFocused = true"
          @keydown.esc="closeSearch"
        />

        <div v-if="isSearchOpen" class="header-search__dropdown">
          <div class="header-search__dropdown-head">
            <span>Результаты поиска</span>
            <button type="button" @click="closeSearch">Закрыть</button>
          </div>

          <div v-if="searchResults.length" class="header-search__results">
            <router-link
              v-for="item in searchResults"
              :key="`${item.type}-${item.title}`"
              :to="item.to"
              class="header-search__result"
              @click="closeSearch"
            >
              <div class="header-search__result-icon" :style="{ '--result-color': item.color }">
                <q-icon :name="item.icon" size="18px" />
              </div>
              <div class="header-search__result-body">
                <div class="header-search__result-meta">{{ item.type }}</div>
                <div class="header-search__result-title">{{ item.title }}</div>
                <div class="header-search__result-subtitle">{{ item.subtitle }}</div>
              </div>
              <q-icon name="chevron_right" size="18px" class="text-darktext" />
            </router-link>
          </div>

          <div v-else class="header-search__empty">
            По запросу «{{ search.trim() }}» ничего не найдено
          </div>
        </div>
      </div>
    </div>

    <div class="app-header__right row items-center no-wrap">
      <q-btn flat no-caps to="/profile" class="user-btn row items-center no-wrap">
        <div class="user-btn__text text-right">
          <div class="text-lighttext text-weight-bold">Малых Кирилл Александрович</div>
          <div class="text-maintext text-caption">АО «АЭРОПОРТ КОЛЬЦОВО»</div>
        </div>
        <q-avatar size="30px" color="accent" text-color="white" class="user-btn__avatar q-ml-sm">МК</q-avatar>
      </q-btn>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { chatThreads, docRows, kpRows, orderRows } from "@/data/mock";

const search = ref("");
const isSearchFocused = ref(false);

type HeaderSearchResult = {
  type: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  to: RouteLocationRaw;
  haystack: string;
};

const searchableItems: HeaderSearchResult[] = [
  ...kpRows.map((row) => ({
    type: "Заявка",
    title: row.requestId,
    subtitle: `${row.item} · ${row.brand} · ${row.status}`,
    icon: "assignment",
    color: "#2d6fff",
    to: { name: "request-detail", params: { id: row.requestId } },
    haystack: [row.requestId, row.kpId, row.item, row.brand, row.status, row.sum, row.delivery].join(" ")
  })),
  ...kpRows
    .filter((row) => row.kpId !== "—")
    .map((row) => ({
      type: "КП",
      title: row.kpId,
      subtitle: `${row.requestId} · ${row.item}`,
      icon: "description",
      color: "#7eb0ff",
      to: { name: "kp-card", params: { id: row.kpId } },
      haystack: [row.kpId, row.requestId, row.item, row.brand, row.status].join(" ")
    })),
  ...orderRows.map((row) => ({
    type: "Заказ",
    title: row.invoice,
    subtitle: `${row.id} · ${row.item} · ${row.status}`,
    icon: "inventory_2",
    color: "#6ee7a0",
    to: { name: "orders" },
    haystack: [row.id, row.invoice, row.item, row.brand, row.status, row.sum].join(" ")
  })),
  ...docRows.map((row) => ({
    type: "Документ",
    title: row.title,
    subtitle: `${row.type} · ${row.requestId ?? "без заявки"} · ${row.date}`,
    icon: "folder_copy",
    color: "#b89cff",
    to: { name: "docs" },
    haystack: [row.title, row.type, row.requestId ?? "", row.item, row.brand, row.date].join(" ")
  })),
  ...chatThreads.map((thread) => ({
    type: "Чат",
    title: thread.requestId,
    subtitle: thread.preview,
    icon: "chat_bubble_outline",
    color: "#f5d078",
    to: { name: "chat" },
    haystack: [thread.requestId, thread.preview].join(" ")
  }))
];

const searchResults = computed(() => {
  const query = search.value.trim().toLowerCase();

  if (!query) {
    return [];
  }

  return searchableItems.filter((item) => item.haystack.toLowerCase().includes(query)).slice(0, 8);
});

const isSearchOpen = computed(() => isSearchFocused.value && search.value.trim().length > 0);

function closeSearch() {
  isSearchFocused.value = false;
}
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  min-height: 60px;
  padding: 0 22px;
  background-color: var(--app-chrome-bg);
  border-left: 1px solid var(--q-border);
  border-bottom: 1px solid var(--q-border);
}

.app-header__left,
.app-header__right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.app-header__right {
  justify-content: flex-end;
  gap: 10px;
}

.header-search {
  position: relative;
  width: min(520px, 100%);
  height: 38px;
  padding: 0 12px;
  gap: 9px;
  border-radius: 11px;
  background: var(--app-control-bg);
}

.header-search__dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  z-index: 80;
  width: min(720px, calc(100vw - 360px));
  min-width: 520px;
  overflow: hidden;
  border: 1px solid var(--q-border);
  border-radius: 14px;
  background: var(--q-secondary);
  box-shadow: var(--app-card-shadow);
}

.header-search__dropdown-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--q-border);
  color: var(--q-lighttext);
  font-size: 13px;
  font-weight: 800;

  button {
    border: 0;
    background: transparent;
    color: var(--q-maintext);
    cursor: pointer;
    font: inherit;
    font-size: 12px;

    &:hover {
      color: var(--q-accent);
    }
  }
}

.header-search__results {
  max-height: 430px;
  overflow: auto;
  padding: 8px;
}

.header-search__result {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 20px;
  align-items: center;
  gap: 12px;
  border-radius: 11px;
  padding: 10px;
  color: var(--q-lighttext);

  &:hover {
    background: var(--app-control-bg);
  }
}

.header-search__result-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: color-mix(in srgb, var(--result-color) 18%, transparent);
  color: var(--result-color);
}

.header-search__result-body {
  min-width: 0;
}

.header-search__result-meta,
.header-search__result-subtitle {
  overflow: hidden;
  color: var(--q-maintext);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header-search__result-title {
  overflow: hidden;
  margin: 2px 0;
  color: var(--q-lighttext);
  font-size: 13px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header-search__empty {
  padding: 28px 16px;
  color: var(--q-maintext);
  font-size: 13px;
  text-align: center;
}

.header-search__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--q-lighttext);
  font-size: 13px;
}

.user-btn {
  border-radius: 10px;
  padding: 4px 10px;
  color: var(--q-lighttext);
  font-size: 13.5px;
  font-weight: 600;
  height: 45px;
  min-height: 38px;

  :deep(.q-btn__content) {
    min-height: 0;
  }
}

.user-btn__text {
  line-height: 1.15;
  max-width: 230px;
}

.user-btn__text .text-weight-bold {
  font-size: 13.5px;
  font-weight: 600 !important;
}

.user-btn__text .text-caption {
  font-size: 11px;
}

.user-btn__avatar {
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 1200px) {
  .header-search {
    display: none;
  }
}

@media (max-width: 820px) {
  .user-btn__text {
    display: none;
  }
}
</style>
