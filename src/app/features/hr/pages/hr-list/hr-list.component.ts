import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Employee } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-hr-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>الموارد البشرية</h1><p class="sub">إدارة الموظفين والرواتب والحضور والانصراف</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">📊 تقرير الرواتب</button>
          <button class="btn-luxe btn-primary" routerLink="/hr/create">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            إضافة موظف
          </button>
        </div>
      </header>

      <!-- HR Stats -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:2rem;margin-bottom:.5rem">👥</div>
          <h2 style="font-size:1.75rem;font-weight:800">28</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">إجمالي الموظفين</span>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:2rem;margin-bottom:.5rem">✅</div>
          <h2 style="font-size:1.75rem;font-weight:800;color:#16a34a">25</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">موظفون نشطون</span>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:2rem;margin-bottom:.5rem">🏖️</div>
          <h2 style="font-size:1.75rem;font-weight:800;color:#d97706">3</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">في إجازة</span>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:2rem;margin-bottom:.5rem">💰</div>
          <h2 style="font-size:1.75rem;font-weight:800;color:var(--color-primary)">$48.5K</h2>
          <span style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">رواتب هذا الشهر</span>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="searchTerm" placeholder="ابحث عن موظف...">
        </div>
        <select [(ngModel)]="filterDept">
          <option value="">كل الأقسام</option>
          <option value="تقنية المعلومات">تقنية المعلومات</option>
          <option value="المبيعات">المبيعات</option>
          <option value="المستودعات">المستودعات</option>
          <option value="الموارد البشرية">الموارد البشرية</option>
          <option value="المحاسبة">المحاسبة</option>
        </select>
      </div>

      <div class="data-table-wrap" *ngIf="employees$ | async as employees">
        <div class="table-header">
          <h3>قائمة الموظفين</h3>
          <div class="table-actions">
            <button class="btn-luxe btn-ghost" style="font-size:.8rem;padding:.5rem 1rem">📅 كشف الحضور</button>
          </div>
        </div>
        <table class="erp-table">
          <thead><tr><th>الموظف</th><th>القسم</th><th>المسمى الوظيفي</th><th>الراتب</th><th>تاريخ التوظيف</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let emp of getFiltered(employees)">
              <td>
                <div style="display:flex;align-items:center;gap:.75rem">
                  <div class="user-avatar">{{ emp.name.charAt(0) }}</div>
                  <div><span style="font-weight:700;display:block">{{ emp.name }}</span><span style="font-size:.75rem;color:var(--color-text-muted)">{{ emp.email }}</span></div>
                </div>
              </td>
              <td>{{ emp.department }}</td>
              <td>{{ emp.position }}</td>
              <td><strong>{{ emp.salary | currency:'USD':'symbol':'1.0-0' }}</strong></td>
              <td>{{ emp.startDate }}</td>
              <td><span class="status-chip" [class]="emp.status === 'active' ? 'active' : emp.status === 'on_leave' ? 'pending' : 'inactive'">{{ emp.status === 'active' ? 'نشط' : emp.status === 'on_leave' ? 'في إجازة' : 'منتهي الخدمة' }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn" [routerLink]="['/hr/edit', emp.id]" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                  <button class="action-btn danger" title="إنهاء الخدمة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <span class="page-info">عرض {{ getFiltered(employees).length }} من {{ employees.length }} موظف</span>
          <div class="page-buttons"><button class="active">1</button><button>←</button></div>
        </div>
      </div>
    </div>
  `
})
export class HrListComponent {
  employees$: Observable<Employee[]>;
  searchTerm = '';
  filterDept = '';

  constructor(private data: DataMockService) {
    this.employees$ = this.data.getEmployees();
  }

  getFiltered(employees: Employee[]): Employee[] {
    return employees.filter(e =>
      (!this.searchTerm || e.name.includes(this.searchTerm)) &&
      (!this.filterDept || e.department === this.filterDept)
    );
  }
}
