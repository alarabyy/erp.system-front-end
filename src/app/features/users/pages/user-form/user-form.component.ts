import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService } from '../../../../core/services/data-mock.service';
import { User } from '../../../../core/models/data-models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-user-form',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div>
          <h1>{{ isEdit ? 'تعديل مستخدم' : 'إضافة مستخدم جديد' }}</h1>
          <p class="sub">{{ isEdit ? 'تحديث بيانات المستخدم وصلاحياته' : 'إدخال بيانات مستخدم جديد للنظام' }}</p>
        </div>
        <button class="btn-luxe btn-ghost" routerLink="/users">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          رجوع للقائمة
        </button>
      </header>

      <div class="form-page">
        <div class="form-card">
          <div class="form-card-title">{{ isEdit ? '✏️ تعديل البيانات' : '➕ بيانات المستخدم الجديد' }}</div>
          <div class="form-grid">
            <div class="form-group">
              <label>الاسم الكامل *</label>
              <input class="erp-input" [(ngModel)]="form.name" placeholder="مثال: أحمد محمد العلي">
            </div>
            <div class="form-group">
              <label>البريد الإلكتروني *</label>
              <input class="erp-input" type="email" [(ngModel)]="form.email" placeholder="user@quantumerp.com">
            </div>
            <div class="form-group">
              <label>الدور في النظام *</label>
              <select class="erp-input erp-select" [(ngModel)]="form.role">
                <option value="admin">مدير النظام</option>
                <option value="manager">مشرف</option>
                <option value="employee">موظف</option>
                <option value="viewer">متابع</option>
              </select>
            </div>
            <div class="form-group">
              <label>القسم *</label>
              <select class="erp-input erp-select" [(ngModel)]="form.department">
                <option value="تقنية المعلومات">تقنية المعلومات</option>
                <option value="المبيعات">المبيعات</option>
                <option value="المستودعات">المستودعات</option>
                <option value="المحاسبة">المحاسبة</option>
                <option value="المشتريات">المشتريات</option>
                <option value="الموارد البشرية">الموارد البشرية</option>
              </select>
            </div>
            <div class="form-group" *ngIf="!isEdit">
              <label>كلمة المرور *</label>
              <input class="erp-input" type="password" [(ngModel)]="form.password" placeholder="••••••••••">
            </div>
            <div class="form-group">
              <label>الحالة</label>
              <select class="erp-input erp-select" [(ngModel)]="form.status">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-luxe btn-primary" (click)="save()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              {{ isEdit ? 'حفظ التعديلات' : 'إنشاء المستخدم' }}
            </button>
            <button class="btn-luxe btn-ghost" routerLink="/users">إلغاء</button>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="form-card-title">🔐 الصلاحيات والوصول</div>
          <div class="detail-row">
            <span class="d-label">لوحة القيادة</span>
            <span class="d-value status-chip active">مسموح</span>
          </div>
          <div class="detail-row">
            <span class="d-label">المبيعات</span>
            <span class="d-value status-chip" [class.active]="form.role !== 'viewer'" [class.inactive]="form.role === 'viewer'">{{ form.role !== 'viewer' ? 'مسموح' : 'محظور' }}</span>
          </div>
          <div class="detail-row">
            <span class="d-label">إدارة المستخدمين</span>
            <span class="d-value status-chip" [class.active]="form.role === 'admin'" [class.inactive]="form.role !== 'admin'">{{ form.role === 'admin' ? 'مسموح' : 'محظور' }}</span>
          </div>
          <div class="detail-row">
            <span class="d-label">الإعدادات</span>
            <span class="d-value status-chip" [class.active]="form.role === 'admin'" [class.inactive]="form.role !== 'admin'">{{ form.role === 'admin' ? 'مسموح' : 'محظور' }}</span>
          </div>
          <div *ngIf="isEdit" style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--color-border)">
            <p style="font-size:.8rem;color:var(--color-text-muted);margin-bottom:1rem">أدوات الحساب</p>
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center;margin-bottom:.75rem">🔑 إعادة تعيين كلمة المرور</button>
            <button class="btn-luxe" style="width:100%;justify-content:center;background:#fff1f2;color:#f43f5e;border:1px solid #f43f5e">🚫 إيقاف الحساب</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserFormComponent implements OnInit {
  isEdit = false;
  form: Partial<User> & { password?: string } = {
    name: '', email: '', role: 'employee', department: 'المبيعات', status: 'active', password: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private data: DataMockService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.data.getUserById(id).subscribe((user: User | undefined) => { if (user) this.form = { ...user }; });
    }
  }

  save() {
    alert(this.isEdit ? '✅ تم حفظ التعديلات بنجاح' : '✅ تم إنشاء المستخدم بنجاح');
    this.router.navigate(['/users']);
  }
}
