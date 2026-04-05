import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { InventoryRecord } from '../../models/inventory-record.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-inventory-summary',
  templateUrl: './inventory-summary.component.html',
  styleUrls: ['./inventory-summary.component.scss']
})
export class InventorySummaryComponent {
  @Input() records: InventoryRecord[] | null = [];
}
