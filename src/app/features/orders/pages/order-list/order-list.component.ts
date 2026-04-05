import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderStatusComponent } from '../../components/order-status/order-status.component';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';

@Component({
  standalone: true,
  imports: [CommonModule, OrderStatusComponent],
  selector: 'app-order-list-page',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListPageComponent {
  readonly orders$: Observable<Order[]>;

  constructor(private readonly ordersService: OrdersService) {
    this.orders$ = this.ordersService.list();
  }
}
