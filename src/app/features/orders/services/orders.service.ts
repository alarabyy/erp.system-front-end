import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private readonly api: ApiService) {}

  list(): Observable<Order[]> {
    return this.api.get<Order[]>('orders');
  }
}
