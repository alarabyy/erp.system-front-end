import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCatalogComponent } from '../../components/product-catalog/product-catalog.component';
import { DataMockService, Statistics, Activity, Product } from '../../../../core/services/data-mock.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCatalogComponent],
  selector: 'app-products-dashboard-page',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardPageComponent {
  readonly products$: Observable<Product[]>;
  readonly stats$: Observable<Statistics>;
  readonly activities$: Observable<Activity[]>;

  constructor(private readonly dataService: DataMockService) {
    this.products$ = this.dataService.getProducts();
    this.stats$ = this.dataService.getDashboardStats();
    this.activities$ = this.dataService.getActivities();
  }
}
