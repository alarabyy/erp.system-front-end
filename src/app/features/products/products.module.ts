import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsDashboardPageComponent } from './pages/products-dashboard/products-dashboard.component';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';

@NgModule({
  imports: [SharedModule, ProductsRoutingModule, ProductsDashboardPageComponent, ProductCatalogComponent]
})
export class ProductsModule {}
