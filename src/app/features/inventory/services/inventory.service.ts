import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { InventoryRecord } from '../models/inventory-record.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private readonly api: ApiService) {}

  list(): Observable<InventoryRecord[]> {
    return this.api.get<InventoryRecord[]>('inventory');
  }
}
