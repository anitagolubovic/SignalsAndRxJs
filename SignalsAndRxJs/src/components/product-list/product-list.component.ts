import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../app/services/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Maybe } from '../../ts-utilis/maybe.type';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, ProductComponent, MatInputModule, MatFormFieldModule, FormsModule],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  products$: Observable<Product[]> = of([]);
  selectedProduct$: Observable<Maybe<Product>> = of(null);
  searchPattern: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts$();
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
