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
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>إدارة علاقات العملاء (CRM)</h1><p class="sub">تتبع العملاء المحتملين وفرص البيع والأنشطة</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">📊 تقرير المبيعات</button>
          <button class="btn-luxe btn-primary" routerLink="/crm/create">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            إضافة عميل محتمل
          </button>
        </div>
      </header>

      <!-- Pipeline Stats -->
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem">
        <div *ngFor="let stage of pipeline" class="luxe-card" style="padding:1.25rem;text-align:center;border-top:3px solid {{stage.color}}">
          <h3 style="font-size:.85rem;color:var(--color-text-muted);margin-bottom:.75rem">{{ stage.label }}</h3>
          <span style="font-size:1.75rem;font-weight:800">{{ stage.count }}</span>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="searchTerm" placeholder="ابحث عن عميل أو شركة...">
        </div>
        <select [(ngModel)]="filterStatus">
          <option value="">كل المراحل</option>
          <option value="new">جديد</option>
          <option value="contacted">تم التواصل</option>
          <option value="qualified">مؤهل</option>
          <option value="proposal">عرض أسعار</option>
          <option value="won">محقق</option>
          <option value="lost">خسارة</option>
        </select>
      </div>

      <div class="data-table-wrap" *ngIf="leads$ | async as leads">
        <div class="table-header"><h3>العملاء المحتملون ({{ getFiltered(leads).length }})</h3></div>
        <table class="erp-table">
          <thead><tr><th>العميل / الشركة</th><th>البريد</th><th>الهاتف</th><th>قيمة الفرصة</th><th>المصدر</th><th>المرحلة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let lead of getFiltered(leads)">
              <td>
                <div style="display:flex;flex-direction:column">
                  <span style="font-weight:700">{{ lead.name }}</span>
                  <span style="font-size:.75rem;color:var(--color-text-muted)">{{ lead.company }}</span>
                </div>
              </td>
              <td>{{ lead.email }}</td>
              <td>{{ lead.phone }}</td>
              <td><strong style="color:var(--color-primary)">{{ lead.value | currency:'USD':'symbol':'1.0-0' }}</strong></td>
              <td><span style="background:#f8fafc;padding:.3rem .75rem;border-radius:8px;font-size:.75rem;font-weight:600">{{ lead.source }}</span></td>
              <td><span class="status-chip" [class]="lead.status">{{ getStatusLabel(lead.status) }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn" [routerLink]="['/crm/edit', lead.id]" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                  <button class="action-btn success" title="تحويل لطلب"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></button>
                  <button class="action-btn danger" title="حذف"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <span class="page-info">عرض {{ getFiltered(leads).length }} من {{ leads.length }} عميل محتمل</span>
          <div class="page-buttons"><button class="active">1</button><button>←</button></div>
        </div>
      </div>
    </div>
  `
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
