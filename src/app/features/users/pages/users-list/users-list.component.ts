import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, User } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-users-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div>
          <h1>إدارة المستخدمين</h1>
          <p class="sub">عرض وإدارة جميع مستخدمي النظام وصلاحياتهم</p>
        </div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
            تصدير Excel
          </button>
          <button class="btn-luxe btn-primary" routerLink="/users/create">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            إضافة مستخدم
          </button>
        </div>
      </header>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="searchTerm" placeholder="ابحث عن مستخدم...">
        </div>
        <select [(ngModel)]="filterRole">
          <option value="">جميع الأدوار</option>
          <option value="admin">مدير النظام</option>
          <option value="manager">مشرف</option>
          <option value="employee">موظف</option>
          <option value="viewer">متابع</option>
        </select>
        <select [(ngModel)]="filterStatus">
          <option value="">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>

      <div class="data-table-wrap" *ngIf="users$ | async as users">
        <div class="table-header">
          <h3>قائمة المستخدمين ({{ getFiltered(users).length }})</h3>
          <div class="table-actions">
            <button class="action-btn" title="تحديث"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg></button>
          </div>
        </div>
        <table class="erp-table">
          <thead><tr>
            <th>المستخدم</th><th>البريد الإلكتروني</th><th>الدور</th><th>القسم</th><th>الحالة</th><th>تاريخ الانضمام</th><th>إجراءات</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let user of getFiltered(users)">
              <td>
                <div style="display:flex;align-items:center;gap:.75rem">
                  <div class="user-avatar">{{ user.avatar }}</div>
                  <span style="font-weight:700">{{ user.name }}</span>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td><span class="badge" [style]="getRoleBadgeStyle(user.role)">{{ getRoleLabel(user.role) }}</span></td>
              <td>{{ user.department }}</td>
              <td><span class="status-chip" [class]="user.status">{{ user.status === 'active' ? 'نشط' : 'غير نشط' }}</span></td>
              <td>{{ user.joinDate }}</td>
              <td>
                <div class="row-actions">
                  <button class="action-btn" [routerLink]="['/users/edit', user.id]" title="تعديل">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button class="action-btn danger" title="حذف">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <span class="page-info">عرض {{ getFiltered(users).length }} من {{ users.length }} مستخدم</span>
          <div class="page-buttons">
            <button class="active">1</button><button>2</button><button>←</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UsersListComponent {
  users$: Observable<User[]>;
  searchTerm = '';
  filterRole = '';
  filterStatus = '';

  constructor(private data: DataMockService) {
    this.users$ = this.data.getUsers();
  }

  getFiltered(users: User[]): User[] {
    return users.filter(u =>
      (!this.searchTerm || u.name.includes(this.searchTerm) || u.email.includes(this.searchTerm)) &&
      (!this.filterRole || u.role === this.filterRole) &&
      (!this.filterStatus || u.status === this.filterStatus)
    );
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = { admin: 'مدير النظام', manager: 'مشرف', employee: 'موظف', viewer: 'متابع' };
    return labels[role] || role;
  }

  getRoleBadgeStyle(role: string): string {
    const styles: Record<string, string> = {
      admin: 'background:#fff1f2;color:#f43f5e',
      manager: 'background:#eff6ff;color:#2563eb',
      employee: 'background:#f0fdf4;color:#16a34a',
      viewer: 'background:#f8fafc;color:#64748b'
    };
    return styles[role] || '';
  }
}
