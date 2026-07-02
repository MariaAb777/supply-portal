<template>
  <div class="not-found-page">
    <q-card flat class="app-card not-found-page__card text-center">
      <div class="not-found-page__code">404</div>
      <h1 class="not-found-page__title">Страница не найдена</h1>
      <p class="not-found-page__text">
        Возможно, ссылка устарела или адрес введён с ошибкой.
      </p>
      <q-btn unelevated no-caps color="accent" class="not-found-page__btn" :to="{ name: 'home' }">
        На главную
      </q-btn>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.not-found-page {
  display: flex;
  min-height: calc(100vh - 220px);
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.not-found-page__card {
  width: min(100%, 520px);
  padding: 32px;
}

.not-found-page__code {
  color: var(--q-accent);
  font-size: clamp(64px, 10vw, 112px);
  font-weight: 900;
  line-height: 0.95;
}

.not-found-page__title {
  margin-top: 16px;
  font-size: 24px;
}

.not-found-page__text {
  margin: 10px auto 20px;
  color: var(--q-maintext);
  font-size: 14px;
}

.not-found-page__btn {
  border-radius: 10px;
  font-weight: 700;
}
</style>
