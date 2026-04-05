import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private readonly api: ApiService) {}

  list(): Observable<Product[]> {
    return this.api.get<Product[]>('products');
  }
}
