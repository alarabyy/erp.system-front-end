import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../core/services/data-mock.service'; // Use the core model

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
  @Input() products: Product[] | null = [];

  onAction(action: string, product: Product) {
    alert(`[Inventory Action] ${action} for ${product.name} (SKU: ${product.sku})`);
  }
}
