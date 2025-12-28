import { Component, inject, OnInit, Signal } from '@angular/core';
import { ProductService } from '../../app/services/product.service';
import { Product } from '../../app/models/product';
import { Maybe } from '../../ts-utilis/maybe.type';
import { CurrencyPipe } from '@angular/common';
import { isDefined } from '../../ts-utilis/predicates.helper';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardSmImage,
  MatCardActions,
  MatCardTitle,
} from '@angular/material/card';
import { OrderService } from '../../app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSmImage,
    MatCardActions,
    MatCardTitle,
  ],
})
export class ProductComponent {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  product: Signal<Maybe<Product>> = this.productService.selectedProduct;
  private _snackBar = inject(MatSnackBar);

  addToCart(): void {
    if (isDefined(this.product())) {
      this.orderService.addToCart(this.product()!);
      this.showMessage();
    }
  }

  showMessage() {
    this._snackBar.open('Product added!', 'Close');
  }
}
