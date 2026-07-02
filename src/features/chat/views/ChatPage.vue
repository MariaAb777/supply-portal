<template>
  <div>
    <div class="chat-page__actions row items-center justify-end q-gutter-sm q-mb-xl">
      <q-btn unelevated no-caps class="chat-page__action-btn chat-page__action-btn--manager" @click="isManagerModalOpen = true">
        <q-icon name="headset_mic" size="17px" class="q-mr-xs" />
        Вызвать менеджера
      </q-btn>
      <q-btn flat no-caps class="chat-page__action-btn chat-page__action-btn--complaint" @click="isComplaintModalOpen = true">
        <q-icon name="report_problem" size="17px" class="q-mr-xs" />
        Пожаловаться
      </q-btn>
    </div>

    <div class="chat-page row q-col-gutter-md">
      <q-card flat class="app-card chat-page__list col-12 col-md-4">
      <div class="q-pa-md">
        <template v-if="!showMessageSearch">
          <div class="chat-page__list-title text-lighttext q-mb-md">Чаты по заявкам</div>
          <q-input v-model="search" dense outlined class="chat-page__input" placeholder="Поиск по номеру заявки">
            <template #prepend><q-icon name="search" /></template>
          </q-input>
        </template>

        <div v-if="showMessageSearch" class="chat-page__message-search">
          <div class="chat-page__list-title text-lighttext q-mb-md">Поиск по сообщениям</div>
          <q-input v-model="msgSearch" dense outlined class="chat-page__input" placeholder="Поиск по сообщениям">
            <template #prepend><q-icon name="search" /></template>
          </q-input>

          <div class="chat-page__message-results q-mt-sm">
            <div v-if="!msgSearch.trim()" class="chat-page__empty-search">
              Введите текст для поиска сообщений
            </div>
            <div v-else-if="searchedMessages.length === 0" class="chat-page__empty-search">
              Сообщения не найдены
            </div>
            <template v-else>
              <button
                v-for="message in searchedMessages"
                :key="message.id"
                type="button"
                class="chat-page__message-result"
              >
                <div class="row items-center justify-between q-mb-xs">
                  <span class="chat-page__message-result-author">{{ message.direction === "out" ? "Вы" : "Менеджер" }}</span>
                  <span class="chat-page__message-result-time">{{ message.time }}</span>
                </div>
                <div class="chat-page__message-result-text">{{ message.text }}</div>
              </button>
            </template>
          </div>
        </div>
      </div>
      <q-list v-if="!showMessageSearch" separator>
        <q-item
          v-for="thread in chatThreads"
          :key="thread.id"
          clickable
          :active="thread.id === activeId"
          class="chat-page__thread-item"
          active-class="chat-page__thread-item--active"
          @click="activeId = thread.id"
        >
          <q-item-section avatar>
            <q-avatar color="accent" text-color="white" size="36px">О</q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold text-lighttext">{{ thread.requestId }}</q-item-label>
            <q-item-label caption class="chat-page__thread-preview">{{ thread.preview }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="thread.unread" side>
            <q-badge color="accent" :label="thread.unread" class="chat-page__unread-badge" />
          </q-item-section>
        </q-item>
      </q-list>
      </q-card>

      <q-card flat class="app-card chat-page__main col column">
      <div class="row items-center q-pa-md chat-page__head">
        <q-avatar color="accent" text-color="white" size="40px" class="q-mr-md">О</q-avatar>
        <div class="col">
          <div class="text-subtitle1 text-weight-bold text-lighttext">Заявка ДГ-2024-055</div>
          <div class="text-caption text-maintext">Ольга Кузнецова · Менеджер по снабжению</div>
        </div>
        <q-btn
          flat
          icon="search"
          class="chat-page__search-btn"
          :class="{ 'chat-page__search-btn--active': showMessageSearch }"
          @click="showMessageSearch = !showMessageSearch"
        />
      </div>
      <q-separator class="bg-border" />
      <div class="chat-page__body col q-pa-md">
        <template v-for="msg in chatMessages" :key="msg.id">
          <div v-if="msg.daySep" class="text-center q-my-md">
            <q-badge outline color="darktext" :label="msg.daySep" />
          </div>
          <div :class="['chat-msg', msg.direction === 'out' ? 'chat-msg--out' : 'chat-msg--in']">
            <div class="chat-msg__bubble">{{ msg.text }}</div>
            <div class="chat-msg__time text-caption text-darktext">{{ msg.time }}</div>
          </div>
        </template>
      </div>
      <q-separator class="bg-border" />
      <div class="q-pa-md">
        <div class="composer row items-end no-wrap q-gutter-sm">
          <q-btn flat icon="attach_file" class="composer__file-btn" />
          <q-input v-model="draft" type="textarea" autogrow outlined dense class="composer__input col" placeholder="Напишите сообщение..." />
          <q-btn unelevated color="accent" icon="send" class="composer__send-btn" />
        </div>
      </div>
      </q-card>
    </div>

    <AppModal
      v-model="isComplaintModalOpen"
      title="Пожаловаться"
      cancel-label="Отмена"
      confirm-label="Отправить"
      @cancel="closeComplaintModal"
      @confirm="submitComplaint"
    >
      <q-input
        v-model="complaintText"
        type="textarea"
        outlined
        autogrow
        class="chat-page__complaint-input"
        placeholder="Опишите проблему или вопрос..."
      />
    </AppModal>

    <AppModal
      v-model="isManagerModalOpen"
      title="Вызвать менеджера"
      cancel-label="Отмена"
      confirm-label="Вызвать"
      @cancel="closeManagerModal"
      @confirm="submitManagerCall"
    >
      <p class="chat-page__modal-text">
        Вы уверены, что хотите вызвать менеджера? Мы передадим запрос ответственному сотруднику.
      </p>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Notify } from "quasar";
import AppModal from "@/components/common/AppModal.vue";
import { chatMessages, chatThreads } from "@/data/mock";

const search = ref("");
const msgSearch = ref("");
const draft = ref("");
const activeId = ref("1");
const showMessageSearch = ref(false);
const isManagerModalOpen = ref(false);
const isComplaintModalOpen = ref(false);
const complaintText = ref("");

const searchedMessages = computed(() => {
  const query = msgSearch.value.trim().toLowerCase();

  if (!query) {
    return [];
  }

  return chatMessages.filter((message) => message.text.toLowerCase().includes(query));
});

function closeComplaintModal() {
  isComplaintModalOpen.value = false;
}

function closeManagerModal() {
  isManagerModalOpen.value = false;
}

function submitManagerCall() {
  isManagerModalOpen.value = false;
  Notify.create({
    type: "positive",
    position: "bottom-left",
    message: "Менеджер успешно вызван",
    timeout: 2500
  });
}

function submitComplaint() {
  complaintText.value = "";
  isComplaintModalOpen.value = false;
  Notify.create({
    type: "positive",
    position: "bottom-left",
    message: "Жалоба успешно отправлена",
    timeout: 2500
  });
}
</script>

<style scoped lang="scss">
.chat-page {
  min-height: calc(100vh - 140px);
}

.chat-page__action-btn {
  height: 38px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  padding: 0 13px;
}

.chat-page__action-btn--manager {
  background: var(--q-accent-transparent);
  color: var(--q-accent);
}

.chat-page__action-btn--complaint {
  border: 1px solid color-mix(in srgb, #f87171 35%, transparent);
  color: #f87171;
}

.chat-page__list,
.chat-page__main {
  min-height: 520px;
}

.chat-page__list {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.chat-page__main {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.chat-page__list-title {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.25;
}

.chat-page__thread-preview {
  color: var(--q-maintext);
  font-size: 11.5px;
  line-height: 1.25;
}

.chat-page__thread-item {
  position: relative;
  min-height: 64px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.chat-page__thread-item--active {
  background: color-mix(in srgb, var(--q-accent) 26%, transparent);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 28px;
    border-radius: 0 2px 2px 0;
    background: var(--q-accent);
    transform: translateY(-50%);
  }
}

.chat-page__unread-badge {
  width: 20px;
  height: 20px;
  min-width: 20px;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  font-size: 11px;
  font-weight: 700;
}

.chat-page__head {
  border-bottom: 1px solid var(--q-border);
}

.chat-page__search-btn {
  width: 40px;
  min-width: 40px;
  height: 36px;
  border: 1px solid var(--q-border);
  border-radius: 10px;
  color: var(--q-lighttext);

  &:hover {
    background: var(--app-control-bg);
  }

  &--active {
    background: var(--q-accent-transparent);
    color: var(--q-accent);
  }
}

.chat-page__input {
  :deep(.q-field__control) {
    border-radius: 12px;
  }
}

.chat-page__message-search {
  min-height: 100%;
}

.chat-page__message-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-page__empty-search {
  color: var(--q-darktext);
  font-size: 12px;
  line-height: 1.35;
  padding: 8px 2px 0;
}

.chat-page__message-result {
  width: 100%;
  border: 1px solid var(--q-border);
  border-radius: 10px;
  background: var(--app-control-bg);
  color: var(--q-maintext);
  cursor: pointer;
  padding: 9px 10px;
  text-align: left;

  &:hover {
    border-color: color-mix(in srgb, var(--q-accent) 35%, transparent);
    background: color-mix(in srgb, var(--q-accent) 10%, transparent);
  }
}

.chat-page__message-result-author {
  color: var(--q-lighttext);
  font-size: 12px;
  font-weight: 700;
}

.chat-page__message-result-time {
  color: var(--q-darktext);
  font-size: 11px;
}

.chat-page__message-result-text {
  color: var(--q-maintext);
  font-size: 12px;
  line-height: 1.35;
}

.chat-page__complaint-input {
  :deep(.q-field__control) {
    border-radius: 12px;
  }
}

.chat-page__modal-text {
  margin: 0;
  color: var(--q-maintext);
  font-size: 14px;
  line-height: 1.45;
}

.chat-page__body {
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-msg {
  max-width: 72%;

  &--in {
    align-self: flex-start;
  }

  &--out {
    align-self: flex-end;
  }
}

.chat-msg__bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.45;
}

.chat-msg--in .chat-msg__bubble {
  background: var(--app-control-bg);
  border: 1px solid var(--q-border);
  color: var(--q-lighttext);
}

.chat-msg--out .chat-msg__bubble {
  background: var(--q-accent-transparent);
  border: 1px solid rgba(45, 111, 255, 0.25);
  color: var(--q-lighttext);
}

.chat-msg--out .chat-msg__time {
  text-align: right;
}

.composer {
  align-items: stretch;
}

.composer__input {
  :deep(.q-field__control) {
    border-radius: 12px;
  }
}

.composer__file-btn {
  width: 44px;
  min-width: 44px;
  height: 38px;
  border: 1px solid var(--q-border);
  border-radius: 12px;
  color: var(--q-maintext);
}

.composer__send-btn {
  width: 44px;
  min-width: 44px;
  height: 38px;
  border-radius: 12px;
}

@media (max-width: 1024px) {
  .chat-page__list {
    display: none;
  }
}
</style>
