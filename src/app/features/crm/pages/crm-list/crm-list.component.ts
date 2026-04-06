import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Lead } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-crm-list',
  templateUrl: './crm-list.html',
  styleUrls: ['./crm-list.component.scss'],
})
export class CrmListComponent {
  leads$: Observable<Lead[]>;
  searchTerm = '';
  filterStatus = '';
  pipeline = [
    { label: 'جديد', count: 3, color: '#94a3b8' },
    { label: 'مؤهل', count: 8, color: '#2563eb' },
    { label: 'عرض أسعار', count: 5, color: '#7c3aed' },
    { label: 'محقق', count: 12, color: '#16a34a' },
    { label: 'خسارة', count: 2, color: '#f43f5e' },
  ];

  constructor(private data: DataMockService) { this.leads$ = this.data.getLeads(); }

  getFiltered(leads: Lead[]): Lead[] {
    return leads.filter(l =>
      (!this.searchTerm || l.name.includes(this.searchTerm) || l.company.includes(this.searchTerm)) &&
      (!this.filterStatus || l.status === this.filterStatus)
    );
  }

  getStatusLabel(status: string): string {
    const m: Record<string, string> = { new: 'جديد', contacted: 'تم التواصل', qualified: 'مؤهل', proposal: 'عرض أسعار', won: 'محقق', lost: 'خسارة' };
    return m[status] || status;
  }
}
