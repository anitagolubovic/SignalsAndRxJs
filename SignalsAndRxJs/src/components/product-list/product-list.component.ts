import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../app/models/product';
import { ProductService } from '../../app/services/product.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Maybe } from '../../ts-utilis/maybe.type';
import { isNotDefined } from '../../ts-utilis/predicates.helper';

@Component({
  selector: 'product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductComponent],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  products$: Observable<Product[]> = of([]);
  selectedProduct: Product | null = null;
  @ViewChild('searchInput') searchInput: Maybe<HTMLInputElement>;

  ngOnInit(): void {
    this.products$ = this.productService.getProducts$();
  }

  ngOnDestroy(): void {}

  onSelectProduct(product: Product): void {
    this.productService.selectProduct(product);
  }

  onSearch(query: Maybe<string>): void {
    this.productService.onSearchUpdated(query ?? "");
  }
}
