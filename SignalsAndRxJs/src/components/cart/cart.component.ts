import { Component, computed, inject, OnInit } from '@angular/core';
import { OrderService } from '../../app/services/order.service';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
  MatCardFooter,
  MatCardSubtitle,
  MatCardActions,
} from '@angular/material/card';
import { Product } from '../../app/models/product';
import { debounceTime, Subject } from 'rxjs';
import { Order } from '../../app/models/order';
import { MatIcon } from '@angular/material/icon';
import { Dictionary } from '../../ts-utilis/dictionary.type';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    CommonModule,
    MatCardTitle,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardSubtitle,

    CommonModule,
    MatIcon,
  ],
})
export class CartComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);
  orders = this.orderService.orders;

  orderItems = computed(() => {
    const ordersDict = this.orders();
    return Object.values(ordersDict);
  });
  total = computed(() => {
    return this.orderItems().reduce((acc: number, order: Order) => {
      acc += order.product.price * order.quantity;
      return acc;
    }, 0);
  });
  quantityChange$: Subject<Order> = new Subject<Order>();
  unsubscribeSubject$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.subscribeOnInputChange();
  }

  private subscribeOnInputChange(): void {
    this.quantityChange$.pipe().subscribe((order) => this.updateTotalPrice(order));
  }

  updateTotalPrice(order: Order): void {
    this.orderService.addToCart(order.product, order.quantity);
  }

  onQuantityChange(product: Product, quantity: string): void {
    this.quantityChange$.next({ product, quantity: Number(quantity) });
  }

  removeItem(order: Order): void {
    const newOrders: Dictionary<Order> = this.orderItems()
      .filter((orderItem) => orderItem.product.id !== order.product.id)
      .reduce((acc: Dictionary<Order>, order: Order) => {
        acc[order.product.id] = { product: order.product, quantity: order.quantity };
        return acc;
      }, {});
    this.orderService.orders.set(newOrders);
  }

  continueShopping(): void {
    this.router.navigateByUrl('/products');
  }
}
