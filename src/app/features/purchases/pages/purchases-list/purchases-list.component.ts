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
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>المشتريات والموردون</h1><p class="sub">إدارة أوامر الشراء والموردين والفواتير</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">📥 تصدير PDF</button>
          <button class="btn-luxe btn-primary" routerLink="/purchases/create">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            إنشاء أمر شراء
          </button>
        </div>
      </header>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.75rem">
          <div style="font-size:1.75rem;margin-bottom:.75rem">🏭</div>
          <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:.25rem">12</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">إجمالي الموردون</span>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <div style="font-size:1.75rem;margin-bottom:.75rem">📋</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-primary);margin-bottom:.25rem">24</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">أوامر شراء نشطة</span>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <div style="font-size:1.75rem;margin-bottom:.75rem">💰</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#16a34a;margin-bottom:.25rem">$128K</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">قيمة المشتريات الشهرية</span>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="searchTerm" placeholder="ابحث عن مورد أو أمر شراء...">
        </div>
        <select [(ngModel)]="filterStatus">
          <option value="">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>

      <div class="data-table-wrap" *ngIf="suppliers$ | async as suppliers">
        <div class="table-header"><h3>قائمة الموردون ({{ getFiltered(suppliers).length }})</h3></div>
        <table class="erp-table">
          <thead><tr><th>المورد</th><th>المسؤول</th><th>البريد</th><th>الهاتف</th><th>الدولة</th><th>الطلبات</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let s of getFiltered(suppliers)">
              <td><strong>{{ s.name }}</strong></td>
              <td>{{ s.contactPerson }}</td>
              <td style="font-size:.8rem;color:var(--color-text-muted)">{{ s.email }}</td>
              <td>{{ s.phone }}</td>
              <td>{{ s.country }}</td>
              <td><span style="background:#eff6ff;color:#2563eb;padding:.3rem .8rem;border-radius:8px;font-weight:700;font-size:.8rem">{{ s.totalOrders }} طلب</span></td>
              <td><span class="status-chip" [class]="s.status">{{ s.status === 'active' ? 'نشط' : 'غير نشط' }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn" [routerLink]="['/purchases/edit', s.id]" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                  <button class="action-btn success" title="إنشاء أمر شراء"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                  <button class="action-btn danger" title="حذف"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <span class="page-info">عرض {{ getFiltered(suppliers).length }} من {{ suppliers.length }} مورد</span>
          <div class="page-buttons"><button class="active">1</button><button>←</button></div>
        </div>
      </div>
    </div>
  `
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
