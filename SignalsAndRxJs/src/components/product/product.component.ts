import { Component } from "@angular/core";
import { ProductService } from "../../app/services/product.service";
import { Product } from "../../app/models/product";
import { Maybe } from "../../ts-utilis/maybe.type";
import { Observable } from "rxjs";

@Component({
    selector: "product-component",
    templateUrl: "./product.component.html",   
    styleUrls: ["./product.component.scss"]
})
export class ProductComponent {
    product: Maybe<Product> = null;
    product$: Maybe<Observable<Product>> = null;
    
    constructor(private productService: ProductService) {
        this.productService.selectedProductChanged.subscribe(product => {
            this.product = product;
            console.log('Selected product updated:', product);
        });
        
    }

}