import type {
  ChatMessage,
  ChatThread,
  DocRow,
  KpCardItem,
  KpRow,
  OrderRow,
  RequestDetail,
  RequestRow,
  StageChip
} from "@/types";

export const navCounts = {
  home: { total: 42, unread: 12 },
  kp: { total: 16, unread: 9 },
  orders: { total: 14, unread: 1 },
  docs: { total: 27 },
  chat: { unread: 9 }
};

export const homeStageChips: StageChip[] = [
  { id: "all", label: "Все заявки", total: 42, unread: 12, color: "#7eb0ff" },
  { id: "processing", label: "Обработка", total: 4, unread: 2, color: "#9ca3af" },
  { id: "clarification", label: "Уточнение", total: 2, unread: 1, color: "#f5d078" },
  { id: "kp", label: "Отправлено КП", total: 6, unread: 4, color: "#7eb0ff" },
  { id: "pay", label: "К оплате", total: 3, unread: 1, color: "#e8c96a" },
  { id: "way", label: "В пути", total: 8, unread: 1, color: "#7eb0ff" },
  { id: "shipped", label: "Отгружено", total: 8, unread: 1, color: "#6ee7a0" },
  { id: "cancel", label: "Отмена", total: 10, unread: 2, color: "#f87171" }
];

export const kpRows: KpRow[] = [
  {
    id: "1",
    stage: "kp",
    requestId: "ДГ-2025-015",
    requestDate: "2026-05-05",
    kpId: "КП-2025-015",
    kpDate: "2026-05-08",
    hasPdf: true,
    item: "Мотор-редуктор SEW Eurodrive / комплект",
    brand: "SEW Eurodrive",
    qty: "17 шт",
    sum: "1 534 884.90 ₽",
    delivery: "8–11 недель",
    status: "отправлено КП",
    statusTone: "blue",
    unread: true
  },
  {
    id: "2",
    stage: "kp",
    requestId: "ДГ-2025-108",
    requestDate: "2026-05-10",
    kpId: "КП-2025-108",
    kpDate: "2026-05-12",
    hasPdf: false,
    item: "Мотор-редуктор NMRV-063",
    brand: "Motovario",
    qty: "4 шт",
    sum: "216 000 ₽",
    delivery: "3–4 недели",
    status: "отправлено КП",
    statusTone: "blue",
    unread: true
  },
  {
    id: "3",
    stage: "kp",
    requestId: "ДГ-2025-111",
    requestDate: "2026-05-25",
    kpId: "КП-2025-111",
    kpDate: "2026-05-28",
    hasPdf: false,
    item: "Клапан VUVG-L14",
    brand: "Festo",
    qty: "2 шт",
    sum: "720 000 ₽",
    delivery: "6–8 недель",
    status: "отправлено КП",
    statusTone: "blue"
  },
  {
    id: "4",
    stage: "processing",
    requestId: "ДГ-2025-116",
    requestDate: "2026-06-01",
    kpId: "—",
    kpDate: "—",
    hasPdf: false,
    item: "Датчик давления IFM PN7094",
    brand: "IFM",
    qty: "12 шт",
    sum: "0 ₽",
    delivery: "уточняется",
    status: "обработка",
    statusTone: "slate",
    unread: true
  },
  {
    id: "5",
    stage: "clarification",
    requestId: "ДГ-2025-117",
    requestDate: "2026-06-03",
    kpId: "—",
    kpDate: "—",
    hasPdf: false,
    item: "Пневмоцилиндр DSBC-50-100",
    brand: "Festo",
    qty: "6 шт",
    sum: "0 ₽",
    delivery: "нужны параметры",
    status: "уточнение",
    statusTone: "orange",
    unread: true
  },
  {
    id: "6",
    stage: "pay",
    requestId: "ДГ-2025-118",
    requestDate: "2026-06-05",
    kpId: "КП-2025-118",
    kpDate: "2026-06-07",
    hasPdf: true,
    item: "Контактор Siemens 3RT2026",
    brand: "Siemens",
    qty: "10 шт",
    sum: "348 000 ₽",
    delivery: "2–3 недели",
    status: "к оплате",
    statusTone: "sand",
    unread: true
  },
  {
    id: "7",
    stage: "way",
    requestId: "ДГ-2025-119",
    requestDate: "2026-06-08",
    kpId: "КП-2025-119",
    kpDate: "2026-06-10",
    hasPdf: true,
    item: "Частотный преобразователь ABB ACS580",
    brand: "ABB",
    qty: "2 шт",
    sum: "890 000 ₽",
    delivery: "в пути",
    status: "в пути",
    statusTone: "blue"
  },
  {
    id: "8",
    stage: "shipped",
    requestId: "ДГ-2025-120",
    requestDate: "2026-06-09",
    kpId: "КП-2025-120",
    kpDate: "2026-06-11",
    hasPdf: true,
    item: "Редуктор Bonfiglioli VF/W",
    brand: "Bonfiglioli",
    qty: "3 шт",
    sum: "612 400 ₽",
    delivery: "отгружено",
    status: "отгружено",
    statusTone: "green"
  },
  {
    id: "9",
    stage: "cancel",
    requestId: "ДГ-2025-121",
    requestDate: "2026-06-10",
    kpId: "КП-2025-121",
    kpDate: "2026-06-12",
    hasPdf: false,
    item: "Клапан электромагнитный VUVG",
    brand: "Festo",
    qty: "8 шт",
    sum: "184 000 ₽",
    delivery: "—",
    status: "отмена",
    statusTone: "pink"
  },
  {
    id: "10",
    stage: "processing",
    requestId: "ДГ-2025-122",
    requestDate: "2026-06-12",
    kpId: "—",
    kpDate: "—",
    hasPdf: false,
    item: "Блок питания SITOP PSU8200",
    brand: "Siemens",
    qty: "5 шт",
    sum: "0 ₽",
    delivery: "уточняется",
    status: "обработка",
    statusTone: "slate"
  },
  {
    id: "11",
    stage: "way",
    requestId: "ДГ-2025-123",
    requestDate: "2026-06-14",
    kpId: "КП-2025-123",
    kpDate: "2026-06-16",
    hasPdf: true,
    item: "Промышленный коммутатор Scalance",
    brand: "Siemens",
    qty: "4 шт",
    sum: "1 120 000 ₽",
    delivery: "осталось 12 дней",
    status: "в пути",
    statusTone: "blue",
    unread: true
  },
  {
    id: "12",
    stage: "shipped",
    requestId: "ДГ-2025-124",
    requestDate: "2026-06-15",
    kpId: "КП-2025-124",
    kpDate: "2026-06-17",
    hasPdf: true,
    item: "Энкодер Baumer EIL580",
    brand: "Baumer",
    qty: "9 шт",
    sum: "459 000 ₽",
    delivery: "отгружено",
    status: "отгружено",
    statusTone: "green"
  }
];

export const requestRows: RequestRow[] = [
  {
    id: "ДГ-2025-012",
    company: "ООО Снаб",
    status: "в пути",
    statusTone: "blue",
    statusNote: "часть в пути",
    billed: "432 000 ₽",
    paid: "432 000 ₽",
    paidPct: 100,
    updated: "305 дн назад",
    unread: true,
    isNew: true
  },
  {
    id: "ДГ-2025-011",
    company: "ООО Снаб",
    status: "заказан",
    statusTone: "blue",
    statusNote: "заказали у поставщика",
    billed: "540 000 ₽",
    paid: "270 000 ₽",
    paidPct: 50,
    updated: "325 дн назад"
  },
  {
    id: "ДГ-2025-010",
    company: "ООО Снаб",
    status: "подготовка КП",
    statusTone: "blue",
    statusNote: "готовим КП",
    billed: "0 ₽",
    paid: "0 ₽",
    paidPct: 0,
    updated: "345 дн назад"
  }
];

export const orderRows: OrderRow[] = [
  {
    id: "ДГ-2025-021",
    invoice: "СЧ-2025-021",
    invoiceDate: "25.06.2026",
    hasPdf: true,
    item: "Промышленный контроллер Siemens S7-1500",
    brand: "Siemens",
    qty: "1 шт",
    sum: "780 000 ₽",
    delivery: "6–8 недель",
    orderDate: "—",
    supplyDate: "—",
    upd: "—",
    status: "к оплате",
    statusTone: "sand"
  },
  {
    id: "ДГ-2025-018",
    invoice: "СЧ-2025-018",
    invoiceDate: "18.06.2026",
    hasPdf: true,
    item: "Частотный преобразователь ABB ACS880",
    brand: "ABB",
    qty: "2 шт",
    sum: "1 240 000 ₽",
    delivery: "5–7 недель",
    orderDate: "21.06.2026",
    supplyDate: "12.08.2026",
    supplyNote: "осталось 18 дней",
    upd: "—",
    status: "в пути",
    statusTone: "blue"
  }
];

export const docRows: DocRow[] = [
  {
    id: "1",
    title: "Договор №Д-2025-101",
    hasPdf: true,
    date: "02.06.2026",
    item: "Промышленный контроллер S7-1500",
    brand: "Siemens",
    qty: "2 шт",
    sum: "432 000 ₽",
    type: "Договор",
    typeTone: "slate"
  },
  {
    id: "2",
    title: "УПД №1005",
    hasPdf: true,
    date: "06.06.2026",
    requestId: "ДГ-2025-105",
    item: "Частотный преобразователь ACS880",
    brand: "ABB",
    qty: "6 шт",
    sum: "480 000 ₽",
    type: "УПД",
    typeTone: "green"
  }
];

export const chatThreads: ChatThread[] = [
  { id: "1", requestId: "ДГ-2024-055", preview: "SEW Eurodrive • Мотор-редуктор", unread: 2 },
  { id: "2", requestId: "ДГ-2024-048", preview: "Beckhoff • Промышленный ПК", unread: 1 },
  { id: "3", requestId: "ДГ-2024-031", preview: "Siemens • PLC" }
];

export const chatMessages: ChatMessage[] = [
  { id: "1", direction: "out", text: "Оплату по предоплате отправили сегодня утром.", time: "2 дн назад" },
  { id: "2", direction: "in", text: "Спасибо, предоплату вижу. Размещаю заказ у поставщика.", time: "1 дн назад" },
  { id: "3", direction: "out", text: "Подскажите, когда отгрузите остаток по этой заявке?", time: "5 ч назад", daySep: "Сегодня" },
  {
    id: "4",
    direction: "in",
    text: "Остаток отгрузим завтра, ГТД пришлю в чат. УПД появятся в разделе «Документы».",
    time: "40 мин назад"
  }
];

export const kpCardItems: KpCardItem[] = [
  { num: 1, item: "Мотор-редуктор Sew Eurodrive FA47B CD90L-4/II2G", brand: "Sew Eurodrive", article: "—", qty: "2 шт." },
  { num: 2, item: "Диск Sew Eurodrive BM31 300 Nm 230 AC", brand: "Sew Eurodrive", article: "BM31 300Nm", qty: "4 шт." },
  { num: 3, item: "Мотор-редуктор Sew Eurodrive SAF47DT80K4/BMG", brand: "Sew Eurodrive", article: "SAF47DT80K4", qty: "1 шт." }
];

export const requestDetail: RequestDetail = {
  id: "ДГ-2025-014",
  status: "Отменена",
  statusTone: "orange",
  billed: "216 000 ₽",
  paid: "0 ₽",
  paidPct: 0,
  remainder: "216 000 ₽",
  kpId: "КП-2025-014",
  kpValid: "Действует",
  kpDelivery: "16 дней",
  kpItem: "Кран Кр-3 × 3",
  kpSum: "216 000 ₽",
  invoice: "№СЧ-2025-014",
  manager: "Ольга Кузнецова",
  managerPhone: "8 800 500-21-04",
  managerEmail: "info@snabsystem.ru",
  company: "АО «АЭРОПОРТ КОЛЬЦОВО»",
  inn: "7701234567",
  contact: "Малых Кирилл Александрович",
  address: "Россия, г. Екатеринбург, аэропорт Кольцово"
};

export function getRequestDetail(id: string): RequestDetail {
  return { ...requestDetail, id };
}

export function getKpCard(id: string) {
  return {
    id,
    requestId: "ДГ-2025-015",
    brand: "Sew Eurodrive",
    positions: 18,
    qty: "23 шт.",
    status: "отправлено КП",
    totalEur: "€17 429.99",
    totalRub: "1 534 884.90 ₽",
    delivery: "8–11 недель",
    items: kpCardItems
  };
}
