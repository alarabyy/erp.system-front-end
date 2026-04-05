import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  constructor(private readonly api: ApiService) {}

  list(): Observable<Supplier[]> {
    return this.api.get<Supplier[]>('suppliers');
  }
}
