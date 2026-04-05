import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SupplierCardComponent } from '../../components/supplier-card/supplier-card.component';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from '../../models/supplier.model';

@Component({
  standalone: true,
  imports: [CommonModule, SupplierCardComponent],
  selector: 'app-supplier-directory-page',
  templateUrl: './supplier-directory.component.html',
  styleUrls: ['./supplier-directory.component.scss']
})
export class SupplierDirectoryPageComponent {
  readonly suppliers$: Observable<Supplier[]>;

  constructor(private readonly suppliersService: SuppliersService) {
    this.suppliers$ = this.suppliersService.list();
  }
}
