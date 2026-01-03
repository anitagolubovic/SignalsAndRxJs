import { Injectable, signal } from '@angular/core';
import { Dictionary } from '../../ts-utilis/dictionary.type';
import { Product } from '../models/product';
import { Maybe } from '../../ts-utilis/maybe.type';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders = signal<Dictionary<Order>>({});

  addToCart(product: Product, quantity: Maybe<number> = null): void {
    const existingOrder: Maybe<Order> = this.orders()[product.id];
    const resolvedQuantity = quantity ?? (existingOrder?.quantity ?? 0) + 1;

    this.orders.update((prev) => ({
      ...prev,
      [product.id]: {
        product,
        quantity: resolvedQuantity,
      },
    }));
  }
}
