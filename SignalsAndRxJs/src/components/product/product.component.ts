import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../app/services/product.service';
import { Product } from '../../app/models/product';
import { Maybe } from '../../ts-utilis/maybe.type';
import { Observable, of } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { isDefined } from '../../ts-utilis/predicates.helper';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent, MatCardSmImage, MatCardActions, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [AsyncPipe, CurrencyPipe, MatButtonModule, MatCard, MatCardHeader, MatCardContent, MatCardSmImage, MatCardActions, MatCardTitle],
})
export class ProductComponent implements OnInit {
  product: Maybe<Product> = null;
  product$: Observable<Maybe<Product>> = of(null);

  constructor(private productService: ProductService) {
    this.productService.selectedProductChanged.subscribe((product) => {
      this.product = product;
      console.log('Selected product updated:', product);
    });
  }

  ngOnInit(): void {
    this.product$ = this.productService.selectedProductChanged.asObservable();
  }

  addToCart(): void {
    if (isDefined(this.product)) {
      this.productService.addToCart(this.product);
    }
  }
}
