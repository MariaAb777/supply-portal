<template>
  <q-btn flat dense no-caps class="pdf-btn no-wrap" @click="openPdf">
    <span class="pdf-btn__content">
      <q-icon name="description" size="12px" class="q-mr-xs" />
      <span>PDF</span>
    </span>
  </q-btn>
</template>

<script setup lang="ts">
const emit = defineEmits<{ click: [] }>();

const pdfUrl = "/docs/05f68813-dea5-46f3-878f-21d94d817b46.pdf";

function openPdf() {
  emit("click");
  window.open(pdfUrl, "_blank", "noopener,noreferrer");
}
</script>

<style scoped>
.pdf-btn {
  padding: 3px 9px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 7px;
  background: rgba(239, 68, 68, 0.12);
  color: #fca5a5;
  font-size: 12px;
  font-weight: 600;
  min-width: 54px;
  white-space: nowrap;

  :deep(.q-btn__content) {
    flex-wrap: nowrap;
    white-space: nowrap;
  }
}

.pdf-btn__content {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: nowrap;
  white-space: nowrap;
}
</style>
