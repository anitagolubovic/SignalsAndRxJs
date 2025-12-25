import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../app/services/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Maybe } from '../../ts-utilis/maybe.type';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';


@Component({
  selector: 'product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, ProductComponent, MatInputModule, MatFormFieldModule, FormsModule, MatCard, MatCardHeader, MatCardTitle]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]> = of([]);
  selectedProduct$: Observable<Maybe<Product>> = of(null);
  searchPattern: string = '';
  private productService = inject(ProductService);
  products: Signal<Product[]> = this.productService.getProducts();
  

  ngOnInit(): void {
    
    this.selectedProduct$ = this.productService.selectedProductChanged.asObservable();
  }

  ngOnDestroy(): void {}

  onSelectProduct(product: Product): void {
    this.productService.selectProduct(product);
  }

  onSearch(query: Maybe<string>): void {
    this.productService.onSearchUpdated(query ?? '');
  }
}
