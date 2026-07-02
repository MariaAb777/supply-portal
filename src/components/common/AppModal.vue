<template>
  <q-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card class="app-modal">
      <div class="app-modal__header row items-center justify-between no-wrap">
        <div class="app-modal__title">{{ title }}</div>
        <q-btn flat round dense icon="close" class="app-modal__close" @click="emit('update:modelValue', false)" />
      </div>

      <div class="app-modal__body">
        <slot />
      </div>

      <div class="app-modal__actions row items-center justify-end q-gutter-sm">
        <q-btn flat no-caps class="app-modal__cancel" :label="cancelLabel" @click="emit('cancel')" />
        <q-btn unelevated no-caps color="accent" class="app-modal__confirm" :label="confirmLabel" @click="emit('confirm')" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    cancelLabel?: string;
    confirmLabel?: string;
  }>(),
  {
    cancelLabel: "Отмена",
    confirmLabel: "Отправить"
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  cancel: [];
  confirm: [];
}>();
</script>

<style scoped lang="scss">
.app-modal {
  width: min(100%, 520px);
  border: 1px solid var(--q-border);
  border-radius: 14px;
  background: var(--q-secondary);
  color: var(--q-lighttext);
  overflow: visible;
}

.app-modal__header {
  padding: 16px 18px;
  border-bottom: 1px solid var(--q-border);
}

.app-modal__title {
  font-size: 16px;
  font-weight: 800;
}

.app-modal__close {
  color: var(--q-maintext);
}

.app-modal__body {
  padding: 18px;
  overflow: visible;
}

.app-modal__actions {
  padding: 14px 18px 18px;
}

.app-modal__cancel,
.app-modal__confirm {
  border-radius: 10px;
  font-weight: 700;
}

.app-modal__cancel {
  border: 1px solid var(--q-border);
  color: var(--q-lighttext);
}
</style>
