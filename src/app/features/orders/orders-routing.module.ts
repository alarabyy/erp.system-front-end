import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderListPageComponent } from './pages/order-list/order-list.component';

const routes: Routes = [{ path: '', component: OrderListPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
