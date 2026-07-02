export type StatusTone =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "pink"
  | "sand"
  | "slate";

export interface NavCount {
  total?: number;
  unread?: number;
}

export interface StageChip {
  id: string;
  label: string;
  count?: number;
  total?: number;
  unread?: number;
  color?: string;
  active?: boolean;
}

export interface KpRow {
  id: string;
  stage?: string;
  requestId: string;
  requestDate: string;
  kpId: string;
  kpDate: string;
  hasPdf: boolean;
  item: string;
  brand: string;
  qty: string;
  sum: string;
  delivery: string;
  status: string;
  statusTone: StatusTone;
  unread?: boolean;
}

export interface RequestRow {
  id: string;
  company: string;
  status: string;
  statusTone: StatusTone;
  statusNote: string;
  billed: string;
  paid: string;
  paidPct: number;
  updated: string;
  unread?: boolean;
  isNew?: boolean;
}

export interface OrderRow {
  id: string;
  invoice: string;
  invoiceDate: string;
  hasPdf: boolean;
  item: string;
  brand: string;
  qty: string;
  sum: string;
  delivery: string;
  orderDate: string;
  supplyDate: string;
  supplyNote?: string;
  upd: string;
  status: string;
  statusTone: StatusTone;
}

export interface DocRow {
  id: string;
  title: string;
  hasPdf: boolean;
  date: string;
  requestId?: string;
  item: string;
  brand: string;
  qty: string;
  sum: string;
  type: string;
  typeTone: StatusTone;
}

export interface ChatThread {
  id: string;
  requestId: string;
  preview: string;
  unread?: number;
}

export interface ChatMessage {
  id: string;
  direction: "in" | "out";
  text: string;
  time: string;
  daySep?: string;
}

export interface KpCardItem {
  num: number;
  item: string;
  brand: string;
  article: string;
  qty: string;
}

export interface RequestDetail {
  id: string;
  status: string;
  statusTone: StatusTone;
  billed: string;
  paid: string;
  paidPct: number;
  remainder: string;
  kpId: string;
  kpValid: string;
  kpDelivery: string;
  kpItem: string;
  kpSum: string;
  invoice: string;
  manager: string;
  managerPhone: string;
  managerEmail: string;
  company: string;
  inn: string;
  contact: string;
  address: string;
}
