import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService } from '../../../../core/services/data-mock.service';
import { Supplier } from '../../../../core/models/data-models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.html',
  styleUrls: ['./purchases-list.scss'],
})
export class PurchasesListComponent {
  suppliers$: Observable<Supplier[]>;
  searchTerm = '';
  filterStatus = '';
  constructor(private data: DataMockService) { this.suppliers$ = this.data.getSuppliers(); }
  getFiltered(s: Supplier[]) {
    return s.filter(x => (!this.searchTerm || x.name.includes(this.searchTerm) || x.contactPerson.includes(this.searchTerm)) && (!this.filterStatus || x.status === this.filterStatus));
  }
}
