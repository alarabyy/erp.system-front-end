import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Supplier } from '../../models/supplier.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.scss']
})
export class SupplierCardComponent {
  @Input() suppliers: Supplier[] | null = [];
}
