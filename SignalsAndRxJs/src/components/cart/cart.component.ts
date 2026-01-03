import { Component, computed, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../app/services/order.service';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
  MatCardFooter,
  MatCardSubtitle,
} from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import { Order } from '../../app/models/order';
import { MatIcon } from '@angular/material/icon';
import { Dictionary } from '../../ts-utilis/dictionary.type';
import { Router } from '@angular/router';
import { Product } from '../../app/models/product';

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
export class CartComponent implements OnInit, OnDestroy {
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

  logEffect = effect(() => {
    if (this.total() > 1000) {
      console.log('Free delivery');
    }
  });

  ngOnInit(): void {
    this.subscribeOnInputChange();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject$.next();
    this.unsubscribeSubject$.complete();
  }

  private subscribeOnInputChange(): void {
    this.quantityChange$
      .pipe(takeUntil(this.unsubscribeSubject$))
      .subscribe((order) => this.updateTotalPrice(order));
  }

  updateTotalPrice(order: Order): void {
    this.orderService.addToCart(order.product, order.quantity);
    this.logEffect;
  }

  onQuantityChange(product: Product, quantity: string): void {
    this.quantityChange$.next({ product, quantity: Number(quantity) });
  }

  applyOrderItemUpdate(order: Order): void {
    const updatedOrers: Dictionary<Order> = this.orderItems()
      .filter((orderItem) => orderItem.product.id !== order.product.id)
      .reduce((acc: Dictionary<Order>, order: Order) => {
        acc[order.product.id] = { product: order.product, quantity: order.quantity };
        return acc;
      }, {});
    this.orderService.orders.set(updatedOrers);
  }

  continueShopping(): void {
    this.router.navigateByUrl('/products');
  }
}
