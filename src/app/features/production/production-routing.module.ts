import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BomList } from './pages/bom-list/bom-list';
import { ProductionOrdersList } from './pages/orders-list/orders-list';

const routes: Routes = [
  { path: 'bom', component: BomList },
  { path: 'orders', component: ProductionOrdersList },
  { path: '', redirectTo: 'bom', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
