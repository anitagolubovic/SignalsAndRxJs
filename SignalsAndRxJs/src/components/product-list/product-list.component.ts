import { Component, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../app/services/product.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Maybe } from '../../ts-utilis/maybe.type';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { isDefined } from '../../ts-utilis/predicates.helper';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    ProductComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  searchPattern = signal<string>('');
  products: Signal<Product[]> = this.productService.getProducts();
  selectedProduct: Signal<Maybe<Product>> = this.productService.selectedProduct;
  pattern$: Subject<string> = new Subject<string>();
  unsubscribeSubject$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.subscribeToSearchPattern();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject$.next();
    this.unsubscribeSubject$.complete();
  }


  private subscribeToSearchPattern(): void {
    this.pattern$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.unsubscribeSubject$))
      .subscribe((pattern) => {
        this.searchPattern.set(pattern);
        this.productService.searchPattern.set(pattern);
      });
  }

  onSelectProduct(product: Maybe<Product>): void {
    let productToSelect: Maybe<Product> = product;
    if (isDefined(this.selectedProduct()) && this.selectedProduct()?.id === product?.id) {
      productToSelect = null;
    }
    this.productService.selectProduct(productToSelect);
  }
}
