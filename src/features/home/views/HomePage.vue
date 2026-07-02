<template>
  <div class="home-dashboard">
    <div class="home-dashboard__hero">
      <div>
        <h2 class="home-dashboard__title">Добрый день, Кирилл!</h2>
        <p>Вот что происходит с вашими заявками сегодня.</p>
      </div>

      <div class="home-dashboard__sync">
        <span>Данные обновлены<br />сегодня в 14:35</span>
        <q-btn flat dense round icon="refresh" color="maintext" />
      </div>
    </div>

    <div class="summary-grid">
      <q-card
        v-for="card in statCards"
        :key="card.label"
        flat
        class="app-card summary-card"
        :style="{ '--card-color': card.color }"
      >
        <div class="summary-card__content">
          <div class="summary-card__label">{{ card.label }}</div>
          <div class="summary-card__value">{{ card.value }}</div>
          <div class="summary-card__trend" :class="{ 'summary-card__trend--danger': card.danger }">
            <q-icon :name="card.danger ? 'south_east' : 'north_east'" size="14px" />
            <span>{{ card.note }}</span>
          </div>
        </div>
        <div class="summary-card__icon">
          <q-icon :name="card.icon" size="25px" />
          <q-badge v-if="card.badge" floating rounded color="negative" :label="card.badge" />
        </div>
      </q-card>
    </div>

    <div class="dashboard-layout">
      <q-card flat class="app-card dashboard-panel dashboard-panel--statuses">
        <div class="dashboard-section-title">Статусы заявок</div>

        <div class="status-overview">
          <div class="status-donut" :style="{ '--donut-gradient': donutGradient }">
            <div class="status-donut__hole">
              <span>Всего</span>
              <strong>{{ totalRequests }}</strong>
            </div>
          </div>

          <div class="dashboard-status-list">
            <div v-for="item in statusStats" :key="item.id" class="dashboard-status-row">
              <span class="dashboard-status-row__dot" :style="{ background: item.color }" />
              <span class="dashboard-status-row__label">{{ item.label }}</span>
              <div class="dashboard-status-track">
                <div class="dashboard-status-fill" :style="{ width: `${item.percent}%`, background: item.color }" />
              </div>
              <strong>{{ item.total }}</strong>
              <span class="dashboard-status-row__percent">{{ item.percent }}%</span>
            </div>
          </div>
        </div>
      </q-card>

      <q-card flat class="app-card dashboard-panel">
        <div class="dashboard-section-title">Состояние заявок</div>

        <div class="dashboard-state-list">
          <div class="dashboard-state-card dashboard-state-card--active">
            <div>
              <div class="dashboard-state-card__label">Активные</div>
              <div class="dashboard-state-card__note">В работе, оплате или поставке</div>
            </div>
            <strong>{{ activeRequests }}</strong>
            <svg viewBox="0 0 120 34" aria-hidden="true">
              <polyline points="0,30 12,22 24,24 36,16 48,19 60,8 72,15 84,12 96,20 108,10 120,14" />
            </svg>
          </div>

          <div class="dashboard-state-card dashboard-state-card--closed">
            <div>
              <div class="dashboard-state-card__label">Закрытые</div>
              <div class="dashboard-state-card__note">Отгружено или отменено</div>
            </div>
            <strong>{{ closedRequests }}</strong>
            <svg viewBox="0 0 120 34" aria-hidden="true">
              <polyline points="0,31 12,24 24,18 36,20 48,12 60,15 72,10 84,18 96,13 108,7 120,12" />
            </svg>
          </div>
        </div>
      </q-card>

      <q-card flat class="app-card dashboard-panel">
        <div class="row items-center justify-between q-mb-md">
          <div class="dashboard-section-title q-mb-none">Заказы</div>
          <q-btn flat dense no-caps color="accent" :to="{ name: 'orders' }">
            Все заказы <q-icon name="chevron_right" size="16px" />
          </q-btn>
        </div>

        <div class="dashboard-orders-list">
          <div v-for="item in orderStats" :key="item.label" class="dashboard-order-row" :style="{ '--order-color': item.color }">
            <div class="row items-center justify-between">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
            <div class="dashboard-order-track">
              <div :style="{ width: `${item.percent}%` }" />
            </div>
            <div class="dashboard-order-percent">{{ item.percent }}%</div>
          </div>
        </div>
      </q-card>

      <q-card flat class="app-card dashboard-panel dashboard-panel--chart">
        <div class="row items-center justify-between q-mb-md">
          <div class="dashboard-section-title q-mb-none">Динамика заявок</div>
          <q-btn-dropdown flat dense no-caps label="За 30 дней" class="period-btn" />
        </div>

        <div class="line-chart">
          <div class="line-chart__axis">
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
          </div>
          <svg viewBox="0 0 520 190" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="activityFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#2d6fff" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#2d6fff" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path class="line-chart__area" :d="activityAreaPath" />
            <polyline class="line-chart__line" :points="activityLinePoints" />
            <g>
              <circle v-for="point in activityPoints" :key="point.x" :cx="point.x" :cy="point.y" r="3.5" />
            </g>
          </svg>
          <div class="line-chart__badge">12</div>
          <div class="line-chart__dates">
            <span>1 июн</span>
            <span>5 июн</span>
            <span>10 июн</span>
            <span>15 июн</span>
            <span>20 июн</span>
            <span>25 июн</span>
            <span>30 июн</span>
          </div>
        </div>
      </q-card>

      <q-card flat class="app-card dashboard-panel">
        <div class="dashboard-section-title">Последние действия</div>

        <div class="recent-list">
          <div v-for="event in recentEvents" :key="event.title" class="recent-item" :style="{ '--event-color': event.color }">
            <div class="recent-item__icon">
              <q-icon :name="event.icon" size="17px" />
            </div>
            <div>
              <div class="recent-item__title">{{ event.title }}</div>
              <div class="recent-item__time">{{ event.time }}</div>
            </div>
          </div>
        </div>

        <q-btn flat dense no-caps color="accent" class="q-mt-sm">Все события</q-btn>
      </q-card>

      <q-card flat class="app-card dashboard-panel">
        <div class="dashboard-section-title">Быстрые действия</div>

        <div class="quick-actions">
          <q-btn
            v-for="action in quickActions"
            :key="action.label"
            flat
            no-caps
            align="left"
            class="quick-action"
            :to="action.to"
            :style="{ '--action-color': action.color }"
          >
            <q-icon :name="action.icon" size="24px" />
            <div>
              <div class="quick-action__label">{{ action.label }}</div>
              <div class="quick-action__note">{{ action.note }}</div>
            </div>
          </q-btn>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { homeStageChips, kpRows } from "@/data/mock";

const totalRequests = kpRows.length;
const closedRequests = kpRows.filter((row) => row.stage === "shipped" || row.stage === "cancel").length;
const activeRequests = totalRequests - closedRequests;
const unreadRequests = kpRows.filter((row) => row.unread).length;
const totalSum = "12 250 140 ₽";

const orderStats = [
  { label: "Выставлено", value: "7 464 000 ₽", percent: 100, color: "#7eb0ff" },
  { label: "Оплачено", value: "6 444 000 ₽", percent: 86, color: "#6ee7a0" },
  { label: "К оплате", value: "1 020 000 ₽", percent: 14, color: "#e8c96a" }
];

const statusStats = computed(() => {
  const chips = homeStageChips.filter((chip) => chip.id !== "all");

  return chips.map((chip) => {
    const total = chip.total ?? chip.count ?? 0;

    return {
      id: chip.id,
      label: chip.label,
      total,
      color: chip.color ?? "#7eb0ff",
      percent: Math.round((total / totalRequests) * 100)
    };
  });
});

const donutGradient = computed(() => {
  let start = 0;
  const total = statusStats.value.reduce((sum, item) => sum + item.total, 0) || 1;

  return statusStats.value
    .map((item) => {
      const end = start + (item.total / total) * 100;
      const segment = `${item.color} ${start}% ${end}%`;
      start = end;
      return segment;
    })
    .join(", ");
});

const statCards = [
  { label: "Сумма заявок", value: totalSum, note: "12% за месяц", icon: "payments", color: "#7eb0ff" },
  { label: "Активные заявки", value: activeRequests, note: "2 за неделю", icon: "assignment", color: "#7eb0ff" },
  { label: "Закрытые заявки", value: closedRequests, note: "1 за неделю", icon: "task_alt", color: "#7eb0ff", danger: true },
  { label: "Новые сообщения", value: unreadRequests, note: "Требуют внимания", icon: "forum", color: "#7eb0ff", badge: unreadRequests }
];

const activityPoints = [
  { x: 0, y: 150 },
  { x: 35, y: 116 },
  { x: 70, y: 130 },
  { x: 105, y: 152 },
  { x: 140, y: 120 },
  { x: 175, y: 72 },
  { x: 210, y: 88 },
  { x: 245, y: 140 },
  { x: 280, y: 132 },
  { x: 315, y: 150 },
  { x: 350, y: 82 },
  { x: 385, y: 108 },
  { x: 420, y: 70 },
  { x: 455, y: 54 },
  { x: 490, y: 86 },
  { x: 520, y: 42 }
];

const activityLinePoints = activityPoints.map((point) => `${point.x},${point.y}`).join(" ");
const activityAreaPath = `M ${activityLinePoints.replaceAll(" ", " L ")} L 520 190 L 0 190 Z`;

const recentEvents = [
  { title: "Заявка №214 была отправлена поставщику", time: "15 мин назад", icon: "send", color: "#6ee7a0" },
  { title: "Иванов И.И. загрузил КП по заявке №210", time: "1 час назад", icon: "description", color: "#7eb0ff" },
  { title: "Новое сообщение от поставщика", time: "2 часа назад", icon: "chat", color: "#b89cff" },
  { title: "Заказ №145 успешно оплачен", time: "3 часа назад", icon: "task_alt", color: "#6ee7a0" }
];

const quickActions = [
  { label: "Создать заявку", note: "Новая заявка на поставку", icon: "add_circle", color: "#2d6fff", to: { name: "requests" } },
  { label: "Загрузить документ", note: "Договоры, счета, акты", icon: "upload", color: "#b89cff", to: { name: "docs" } },
  { label: "Создать КП", note: "Коммерческое предложение", icon: "post_add", color: "#6ee7a0", to: { name: "kp" } },
  { label: "Написать менеджеру", note: "Задать вопрос", icon: "chat_bubble_outline", color: "#7eb0ff", to: { name: "chat" } }
];
</script>

<style scoped lang="scss">
.home-dashboard {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.home-dashboard__hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  p {
    color: var(--q-maintext);
    font-size: 13px;
  }
}

.home-dashboard__title {
  color: var(--q-lighttext);
  font-size: 22px;
  font-weight: 800;
}

.home-dashboard__sync {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-top: 1px;
  color: var(--q-maintext);
  font-size: 11px;
  line-height: 1.35;
  text-align: right;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 14px;
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 94px;
  overflow: hidden;
  border-color: color-mix(in srgb, var(--card-color) 38%, var(--q-border));
  padding: 18px 20px;
  background:
    radial-gradient(circle at 92% 20%, color-mix(in srgb, var(--card-color) 22%, transparent), transparent 32%),
    var(--q-secondary);
}

.summary-card:first-child {
  border-color: color-mix(in srgb, #26d07c 45%, var(--q-border));
  box-shadow: inset 3px 0 0 color-mix(in srgb, #26d07c 58%, transparent);
}

.summary-card__label {
  color: var(--q-maintext);
  font-size: 12px;
  font-weight: 700;
}

.summary-card__value {
  margin-top: 6px;
  color: var(--q-lighttext);
  font-size: 27px;
  font-weight: 850;
  line-height: 1.05;
}

.summary-card__trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  color: #6ee7a0;
  font-size: 11px;
  font-weight: 800;

  span {
    color: var(--q-maintext);
    font-weight: 600;
  }

  &--danger {
    color: #f87171;
  }
}

.summary-card__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: color-mix(in srgb, var(--card-color) 20%, transparent);
  color: var(--card-color);
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr 1fr;
  gap: 16px;
}

.dashboard-panel {
  min-height: 222px;
  padding: 20px;
  background:
    linear-gradient(145deg, rgba(45, 111, 255, 0.055), transparent 42%),
    var(--q-secondary);
}

.dashboard-panel--statuses,
.dashboard-panel--chart {
  grid-column: span 1;
}

.dashboard-section-title {
  margin-bottom: 18px;
  color: var(--q-lighttext);
  font-size: 16px;
  font-weight: 800;
}

.status-overview {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 22px;
  align-items: center;
}

.status-donut {
  display: grid;
  place-items: center;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: conic-gradient(var(--donut-gradient));
}

.status-donut__hole {
  display: grid;
  place-items: center;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: var(--app-donut-hole-bg);
  color: var(--q-maintext);
  font-size: 11px;

  strong {
    color: var(--q-lighttext);
    font-size: 22px;
    line-height: 1;
  }
}

.dashboard-status-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.dashboard-status-row {
  display: grid;
  grid-template-columns: 8px minmax(92px, 1fr) minmax(72px, 0.8fr) 24px 34px;
  gap: 8px;
  align-items: center;
  color: var(--q-maintext);
  font-size: 11.5px;
}

.dashboard-status-row__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dashboard-status-row__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dashboard-status-track,
.dashboard-order-track {
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--app-track-bg);
}

.dashboard-status-fill,
.dashboard-order-track > div {
  height: 100%;
  border-radius: inherit;
  background: var(--order-color);
}

.status-more-btn {
  margin-top: 18px;
  border-radius: 8px;
  background: var(--app-control-bg);
  font-size: 12px;
}

.dashboard-state-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dashboard-state-card {
  position: relative;
  min-height: 84px;
  overflow: hidden;
  border-radius: 12px;
  padding: 16px 18px;

  strong {
    position: absolute;
    top: 16px;
    right: 18px;
    color: var(--q-lighttext);
    font-size: 30px;
    line-height: 1;
  }

  svg {
    position: absolute;
    right: 0;
    bottom: 6px;
    width: 50%;
    height: 34px;
    fill: none;
  }

  polyline {
    stroke: currentColor;
    stroke-width: 3;
  }
}

.dashboard-state-card--active {
  border: 1px solid color-mix(in srgb, #7eb0ff 32%, transparent);
  background: color-mix(in srgb, #2d6fff 14%, transparent);
  color: #7eb0ff;
}

.dashboard-state-card--closed {
  border: 1px solid color-mix(in srgb, #6ee7a0 32%, transparent);
  background: color-mix(in srgb, #6ee7a0 14%, transparent);
  color: #6ee7a0;
}

.dashboard-state-card__label {
  color: var(--q-lighttext);
  font-size: 14px;
  font-weight: 800;
}

.dashboard-state-card__note {
  margin-top: 8px;
  color: var(--q-maintext);
  font-size: 11px;
}

.dashboard-orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dashboard-order-row {
  position: relative;
  border: 1px solid color-mix(in srgb, var(--order-color) 22%, transparent);
  border-radius: 10px;
  padding: 13px 14px 22px;
  background: color-mix(in srgb, var(--order-color) 8%, transparent);
  color: var(--q-maintext);
  font-size: 12px;
  font-weight: 700;

  strong {
    color: var(--order-color);
    font-size: 13px;
  }
}

.dashboard-order-track {
  margin-top: 12px;
}

.dashboard-order-percent {
  position: absolute;
  right: 14px;
  bottom: 6px;
  color: var(--q-maintext);
  font-size: 10px;
}

.period-btn {
  border: 1px solid var(--q-border);
  border-radius: 8px;
  color: var(--q-lighttext);
  font-size: 11px;
}

.line-chart {
  position: relative;
  min-height: 172px;
  padding-left: 26px;
}

.line-chart__axis {
  position: absolute;
  top: 7px;
  bottom: 22px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--q-maintext);
  font-size: 10px;
}

.line-chart svg {
  width: 100%;
  height: 150px;
  overflow: visible;
  background-image: repeating-linear-gradient(to bottom, transparent 0 29px, var(--app-chart-grid) 30px);
}

.line-chart__area {
  fill: url(#activityFill);
}

.line-chart__line {
  fill: none;
  stroke: #4d86ff;
  stroke-linejoin: round;
  stroke-width: 4;
}

.line-chart circle {
  fill: #7eb0ff;
  stroke: #d7e5ff;
  stroke-width: 1.5;
}

.line-chart__badge {
  position: absolute;
  top: 25px;
  right: 4px;
  border-radius: 6px;
  padding: 3px 7px;
  background: var(--q-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.line-chart__dates {
  display: flex;
  justify-content: space-between;
  color: var(--q-maintext);
  font-size: 10px;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.recent-item {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

.recent-item__icon {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--event-color) 22%, transparent);
  color: var(--event-color);
}

.recent-item__title {
  color: var(--q-lighttext);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
}

.recent-item__time {
  margin-top: 3px;
  color: var(--q-maintext);
  font-size: 11px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.quick-action {
  min-height: 76px;
  border: 1px solid var(--q-border);
  border-radius: 10px;
  padding: 12px;
  background: var(--app-control-bg);
  color: var(--q-lighttext);

  :deep(.q-btn__content) {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 10px;
    width: 100%;
    justify-content: start;
    text-align: left;
  }

  .q-icon {
    color: var(--action-color);
  }
}

.quick-action__label {
  font-size: 12px;
  font-weight: 800;
}

.quick-action__note {
  margin-top: 4px;
  color: var(--q-maintext);
  font-size: 10.5px;
  line-height: 1.25;
}

@media (max-width: 1400px) {
  .dashboard-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-panel--statuses,
  .dashboard-panel--chart {
    grid-column: span 2;
  }
}

@media (max-width: 1180px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 760px) {
  .home-dashboard__hero {
    flex-direction: column;
  }

  .summary-grid,
  .dashboard-layout,
  .quick-actions,
  .status-overview {
    grid-template-columns: 1fr;
  }

  .dashboard-panel--statuses,
  .dashboard-panel--chart {
    grid-column: span 1;
  }

  .status-donut {
    margin: 0 auto;
  }
}
</style>
