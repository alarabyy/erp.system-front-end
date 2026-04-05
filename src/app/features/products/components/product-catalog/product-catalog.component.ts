import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
  @Input() products: Product[] | null = [];
}
