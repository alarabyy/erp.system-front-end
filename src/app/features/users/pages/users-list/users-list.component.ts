import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService } from '../../../../core/services/data-mock.service';
import { User } from '../../../../core/models/data-models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-users-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div>
          <h1>👥 إدارة المستخدمين والموظفين</h1>
          <p class="sub">عرض وصلاحيات {{ (users$ | async)?.length }} مستخدم نشط في النظام</p>
        </div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost" (click)="onExport()">
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
          <input [(ngModel)]="searchTerm" placeholder="ابحث عن مستخدم بالاسم أو البريد...">
        </div>
        <select [(ngModel)]="filterRole">
          <option value="">جميع الأدوار</option>
          <option value="admin">مدير النظام</option>
          <option value="manager">مشرف</option>
          <option value="employee">موظف</option>
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
        </div>
        <table class="erp-table">
          <thead><tr>
            <th>المستخدم</th><th>البريد الإلكتروني</th><th>الدور</th><th>القسم</th><th>الحالة</th><th>إجراءات</th>
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
              <td>
                <div class="row-actions">
                  <button class="action-btn success" (click)="onProfile(user)" title="الملف الشخصي">
                    👤
                  </button>
                  <button class="action-btn" [routerLink]="['/users/edit', user.id]" title="تعديل">
                    ✏️
                  </button>
                  <button class="action-btn danger" (click)="onDelete(user)" title="حذف">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      (!this.searchTerm || u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || u.email.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.filterRole || u.role === this.filterRole) &&
      (!this.filterStatus || u.status === this.filterStatus)
    );
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = { admin: 'مدير النظام', manager: 'مشرف', employee: 'موظف' };
    return labels[role] || role;
  }

  getRoleBadgeStyle(role: string): string {
    const styles: Record<string, string> = {
      admin: 'background:#fff1f2;color:#f43f5e',
      manager: 'background:#eff6ff;color:#2563eb',
      employee: 'background:#f0fdf4;color:#16a34a'
    };
    return styles[role] || '';
  }

  onProfile(user: User) { alert(`عرض الملف الشخصي لـ ${user.name}`); }
  onDelete(user: User) { 
    if(confirm(`هل أنت متأكد من تعطيل/حذف المستخدم ${user.name}؟`)) {
      alert('تم تنفيذ الإجراء بنجاح (Simulation)');
    }
  }
  onExport() { alert('تصدير قائمة المستخدمين بصيغة Excel...'); }
}
