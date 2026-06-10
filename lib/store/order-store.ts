import { readJsonFile, writeJsonFile } from "@/lib/store/fs";
import type { Order } from "@/types/checkout";

const FILE = "orders.json";

let cache: Order[] | null = null;

export function loadOrders(): Order[] {
  if (cache) return cache;
  cache = readJsonFile<Order[]>(FILE, []);
  return cache;
}

export function saveOrders(orders: Order[]): Order[] {
  cache = orders;
  writeJsonFile(FILE, orders);
  return orders;
}

export function getOrders(): Order[] {
  return loadOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | undefined {
  return loadOrders().find((o) => o.id === id);
}

export function addOrder(order: Order): Order {
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
  return order;
}
