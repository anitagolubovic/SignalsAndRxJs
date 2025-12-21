import { Component, signal } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ProductListComponent } from '../components/product-list/product-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterModule, ProductListComponent],
})
export class AppComponent {
  protected readonly title = signal('SignalsAndRxJs');
}
