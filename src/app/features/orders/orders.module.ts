import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListPageComponent } from './pages/order-list/order-list.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';

@NgModule({
  imports: [SharedModule, OrdersRoutingModule, OrderListPageComponent, OrderStatusComponent]
})
export class OrdersModule {}
