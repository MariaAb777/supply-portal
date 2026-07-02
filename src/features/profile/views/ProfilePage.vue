<template>
  <div class="profile-page">
    <div class="profile-page__header">
      <h2 class="profile-page__title">Мой профиль</h2>
      <p class="profile-page__subtitle">Управление личными данными и настройками аккаунта.</p>
    </div>

    <q-card flat class="app-card profile-hero q-pa-lg q-mb-lg">
      <div class="profile-hero__layout">
        <div class="profile-hero__avatar-wrap">
          <q-avatar size="96px" color="accent" text-color="white" class="profile-hero__avatar">
            {{ profile.initials }}
          </q-avatar>
          <button type="button" class="profile-hero__avatar-btn" aria-label="Изменить фото">
            <q-icon name="photo_camera" size="16px" />
          </button>
        </div>

        <div class="profile-hero__content">
          <div class="profile-hero__top">
            <div>
              <div class="profile-hero__name-row">
                <h3 class="profile-hero__name">{{ profile.fullName }}</h3>
                <q-badge rounded class="profile-hero__role">{{ profile.role }}</q-badge>
              </div>
              <div class="profile-hero__email">{{ profile.email }}</div>
            </div>
            <q-btn flat no-caps class="profile-hero__edit-btn" @click="openEditModal">
              <q-icon name="edit" size="16px" class="q-mr-xs" />
              Редактировать
            </q-btn>
          </div>

          <p class="profile-hero__bio">{{ profile.bio }}</p>

          <div class="profile-hero__meta">
            <span><q-icon name="event" size="16px" /> В системе с {{ profile.joinedAt }}</span>
            <span><q-icon name="place" size="16px" /> {{ profile.location }}</span>
          </div>
        </div>
      </div>
    </q-card>

    <div class="profile-page__grid">
      <q-card flat class="app-card profile-panel q-pa-lg">
        <div class="profile-panel__title">Личная информация</div>

        <div class="profile-info-list">
          <div v-for="item in personalInfo" :key="item.label" class="profile-info-row">
            <div class="profile-info-row__icon">
              <q-icon :name="item.icon" size="18px" />
            </div>
            <div class="profile-info-row__body">
              <div class="profile-info-row__label">{{ item.label }}</div>
              <div class="profile-info-row__value">{{ item.value }}</div>
            </div>
            <q-icon v-if="item.chevron" name="expand_more" size="18px" class="profile-info-row__chevron" />
          </div>
        </div>

      </q-card>

      <div class="profile-page__side">
        <q-card flat class="app-card profile-panel q-pa-lg q-mb-md">
          <div class="profile-panel__title">Статистика аккаунта</div>

          <div class="profile-stats-grid">
            <div
              v-for="stat in profileStats"
              :key="stat.label"
              class="profile-stat-card"
              :style="{ '--stat-color': stat.color }"
            >
              <div class="profile-stat-card__icon">
                <q-icon :name="stat.icon" size="20px" />
              </div>
              <div class="profile-stat-card__value">{{ stat.value }}</div>
              <div class="profile-stat-card__label">{{ stat.label }}</div>
            </div>
          </div>
        </q-card>

        <q-card flat class="app-card profile-panel q-pa-lg">
          <div class="profile-panel__head">
            <div class="profile-panel__title q-mb-none">Последняя активность</div>
          </div>

          <div class="profile-activity-list">
            <div v-for="event in profileActivity" :key="event.id" class="profile-activity-item">
              <div class="profile-activity-item__icon" :style="{ '--event-color': event.color }">
                <q-icon :name="event.icon" size="17px" />
              </div>
              <div class="profile-activity-item__body">
                <div class="profile-activity-item__text">
                  {{ event.text }}
                  <router-link :to="event.to" class="profile-activity-item__link">{{ event.link }}</router-link>
                </div>
                <div class="profile-activity-item__time">{{ event.time }}</div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <q-card flat class="app-card profile-panel q-pa-lg q-mt-lg">
      <div class="profile-panel__title">Настройки</div>

      <div class="profile-preferences">
        <button
          v-for="item in profilePreferences"
          :key="item.title"
          type="button"
          class="profile-preference"
          :style="{ '--pref-color': item.color }"
        >
          <div class="profile-preference__icon">
            <q-icon :name="item.icon" size="20px" />
          </div>
          <div class="profile-preference__body">
            <div class="profile-preference__title">{{ item.title }}</div>
            <div class="profile-preference__note">{{ item.note }}</div>
          </div>
          <q-icon name="chevron_right" size="18px" class="profile-preference__chevron" />
        </button>
      </div>
    </q-card>

    <AppModal
      v-model="isEditModalOpen"
      title="Редактирование профиля"
      cancel-label="Отмена"
      confirm-label="Сохранить"
      @cancel="closeEditModal"
      @confirm="submitEdit"
    >
      <div class="profile-edit-form">
        <q-input v-model="editForm.fullName" dense outlined label="ФИО" />
        <q-input v-model="editForm.email" dense outlined label="E-mail" type="email" />
        <q-input v-model="editForm.phone" dense outlined label="Телефон" />
        <q-input v-model="editForm.location" dense outlined label="Местоположение" />
        <q-input v-model="editForm.jobTitle" dense outlined label="Должность" />
        <q-input v-model="editForm.company" dense outlined label="Компания" />
        <q-select
          v-model="editForm.language"
          dense
          outlined
          emit-value
          map-options
          options-dense
          option-label="label"
          option-value="value"
          label="Язык"
          :options="languageOptions"
          :menu-props="{ contentClass: 'app-select-menu', zIndex: 7000 }"
        />
        <q-input v-model="editForm.bio" type="textarea" autogrow outlined label="О себе" />
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Notify } from "quasar";
import AppModal from "@/components/common/AppModal.vue";
import { profileActivity, profilePreferences, profileStats, userProfile } from "@/data/mock";
import type { UserProfile } from "@/types";

const profile = ref<UserProfile>({ ...userProfile });
const isEditModalOpen = ref(false);
const editForm = ref(createEditForm(profile.value));

const languageOptions = [
  { label: "Русский", value: "Русский" },
  { label: "English", value: "English" }
];

const personalInfo = computed(() => [
  { label: "ФИО", value: profile.value.fullName, icon: "person" },
  { label: "E-mail", value: profile.value.email, icon: "mail" },
  { label: "Телефон", value: profile.value.phone, icon: "call" },
  { label: "Местоположение", value: profile.value.location, icon: "place" },
  { label: "Должность", value: profile.value.jobTitle, icon: "work" },
  { label: "Компания", value: profile.value.company, icon: "business" },
  { label: "Язык", value: profile.value.language, icon: "language", chevron: true }
]);

function createEditForm(source: UserProfile): UserProfile {
  return { ...source };
}

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function openEditModal() {
  editForm.value = createEditForm(profile.value);
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

function submitEdit() {
  profile.value = {
    ...editForm.value,
    initials: getInitials(editForm.value.fullName) || profile.value.initials
  };
  isEditModalOpen.value = false;
  Notify.create({
    type: "positive",
    position: "bottom-left",
    message: "Данные профиля успешно сохранены",
    timeout: 2500
  });
}
</script>

<style scoped lang="scss">
.profile-page__header {
  margin-bottom: 18px;
}

.profile-page__title {
  font-size: 28px;
  font-weight: 800;
}

.profile-page__subtitle {
  margin-top: 6px;
  color: var(--q-maintext);
  font-size: 14px;
}

.profile-hero__layout {
  display: flex;
  gap: 22px;
  align-items: flex-start;
}

.profile-hero__avatar-wrap {
  position: relative;
  flex: 0 0 auto;
}

.profile-hero__avatar {
  font-size: 28px;
  font-weight: 800;
}

.profile-hero__avatar-btn {
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 2px solid var(--q-secondary);
  border-radius: 50%;
  background: var(--q-accent);
  color: #fff;
  cursor: pointer;
}

.profile-hero__content {
  min-width: 0;
  flex: 1 1 auto;
}

.profile-hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.profile-hero__name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.profile-hero__name {
  font-size: 24px;
  font-weight: 800;
}

.profile-hero__role {
  padding: 4px 10px;
  background: color-mix(in srgb, #b89cff 18%, transparent) !important;
  color: #b89cff !important;
  font-size: 11px;
  font-weight: 700;
}

.profile-hero__email {
  margin-top: 4px;
  color: var(--q-maintext);
  font-size: 13px;
}

.profile-hero__edit-btn {
  height: 38px;
  border: 1px solid color-mix(in srgb, var(--q-accent) 35%, transparent);
  border-radius: 10px;
  color: var(--q-accent);
  font-size: 13px;
  font-weight: 700;
}

.profile-hero__bio {
  margin: 14px 0 0;
  color: var(--q-maintext);
  font-size: 14px;
  line-height: 1.5;
}

.profile-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 16px;
  color: var(--q-maintext);
  font-size: 12.5px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
}

.profile-page__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 16px;
  align-items: start;
}

.profile-panel__title {
  margin-bottom: 18px;
  color: var(--q-lighttext);
  font-size: 18px;
  font-weight: 800;
}

.profile-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.profile-panel__link {
  min-height: auto;
  padding: 0;
  font-size: 13px;
  font-weight: 700;
}

.profile-info-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.profile-info-row {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 18px;
  gap: 12px;
  align-items: center;
}

.profile-info-row__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--app-control-bg);
  color: var(--q-maintext);
}

.profile-info-row__label {
  color: var(--q-maintext);
  font-size: 12px;
}

.profile-info-row__value {
  margin-top: 2px;
  color: var(--q-lighttext);
  font-size: 14px;
  font-weight: 700;
}

.profile-info-row__chevron {
  color: var(--q-darktext);
}

.profile-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.profile-stat-card {
  border: 1px solid color-mix(in srgb, var(--stat-color) 24%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--stat-color) 8%, transparent);
  padding: 16px;
}

.profile-stat-card__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--stat-color) 18%, transparent);
  color: var(--stat-color);
}

.profile-stat-card__value {
  margin-top: 14px;
  color: var(--q-lighttext);
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
}

.profile-stat-card__label {
  margin-top: 6px;
  color: var(--q-maintext);
  font-size: 12px;
  font-weight: 600;
}

.profile-activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.profile-activity-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.profile-activity-item__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--event-color) 18%, transparent);
  color: var(--event-color);
}

.profile-activity-item__text {
  color: var(--q-lighttext);
  font-size: 13px;
  line-height: 1.45;
}

.profile-activity-item__link {
  color: var(--q-accent);
  font-weight: 700;
}

.profile-activity-item__time {
  margin-top: 4px;
  color: var(--q-maintext);
  font-size: 11.5px;
}

.profile-preferences {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.profile-preference {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 18px;
  gap: 12px;
  align-items: center;
  width: 100%;
  border: 1px solid var(--q-border);
  border-radius: 12px;
  padding: 14px;
  background: var(--app-soft-bg);
  color: inherit;
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: color-mix(in srgb, var(--pref-color) 35%, var(--q-border));
    background: color-mix(in srgb, var(--pref-color) 8%, transparent);
  }
}

.profile-preference__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--pref-color) 16%, transparent);
  color: var(--pref-color);
}

.profile-preference__title {
  color: var(--q-lighttext);
  font-size: 13px;
  font-weight: 800;
}

.profile-preference__note {
  margin-top: 4px;
  color: var(--q-maintext);
  font-size: 11.5px;
  line-height: 1.35;
}

.profile-preference__chevron {
  color: var(--q-darktext);
}

.profile-edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  :deep(.q-field__control) {
    border-radius: 10px;
  }
}

@media (max-width: 1100px) {
  .profile-page__grid {
    grid-template-columns: 1fr;
  }

  .profile-preferences {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .profile-hero__layout {
    flex-direction: column;
  }

  .profile-hero__top {
    flex-direction: column;
  }

  .profile-hero__edit-btn {
    width: 100%;
  }

  .profile-stats-grid,
  .profile-preferences {
    grid-template-columns: 1fr;
  }

  .profile-page__title {
    font-size: 24px;
  }
}
</style>
