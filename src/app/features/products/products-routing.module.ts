import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsDashboardPageComponent } from './pages/products-dashboard/products-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsDashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
