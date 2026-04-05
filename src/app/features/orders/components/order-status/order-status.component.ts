import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Order } from '../../models/order.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  @Input() orders: Order[] | null = [];
}
