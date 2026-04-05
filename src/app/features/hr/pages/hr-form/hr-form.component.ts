import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Employee } from '../../../../core/services/data-mock.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-hr-form',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>{{ isEdit ? 'تعديل بيانات موظف' : 'إضافة موظف جديد' }}</h1><p class="sub">{{ isEdit ? form.name : 'إدخال بيانات الموظف الجديد في النظام' }}</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/hr">← رجوع للموظفين</button>
      </header>
      <div class="form-page">
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div class="form-card">
            <div class="form-card-title">👤 البيانات الشخصية والوظيفية</div>
            <div class="form-grid">
              <div class="form-group"><label>الاسم الكامل *</label><input class="erp-input" [(ngModel)]="form.name" placeholder="الاسم الثلاثي"></div>
              <div class="form-group"><label>البريد الإلكتروني *</label><input class="erp-input" type="email" [(ngModel)]="form.email" placeholder="email@company.com"></div>
              <div class="form-group"><label>القسم *</label>
                <select class="erp-input erp-select" [(ngModel)]="form.department">
                  <option value="تقنية المعلومات">تقنية المعلومات</option>
                  <option value="المبيعات">المبيعات</option>
                  <option value="المستودعات">المستودعات</option>
                  <option value="المحاسبة">المحاسبة</option>
                  <option value="الموارد البشرية">الموارد البشرية</option>
                  <option value="المشتريات">المشتريات</option>
                </select>
              </div>
              <div class="form-group"><label>المسمى الوظيفي *</label><input class="erp-input" [(ngModel)]="form.position" placeholder="مثال: مدير مبيعات"></div>
              <div class="form-group"><label>الراتب الشهري (USD) *</label><input class="erp-input" type="number" [(ngModel)]="form.salary" min="0"></div>
              <div class="form-group"><label>تاريخ بدء العمل *</label><input class="erp-input" type="date" [(ngModel)]="form.startDate"></div>
              <div class="form-group"><label>الحالة</label>
                <select class="erp-input erp-select" [(ngModel)]="form.status">
                  <option value="active">نشط</option>
                  <option value="on_leave">في إجازة</option>
                  <option value="terminated">منتهي الخدمة</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-luxe btn-primary" (click)="save()">
                {{ isEdit ? '💾 حفظ التعديلات' : '✅ تسجيل الموظف' }}
              </button>
              <button class="btn-luxe btn-ghost" routerLink="/hr">إلغاء</button>
            </div>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="form-card-title">💼 ملف الموظف</div>
          <div class="detail-row"><span class="d-label">الراتب</span><span class="d-value" style="color:var(--color-primary);font-weight:800">{{ (form.salary || 0) | currency:'USD':'symbol':'1.0-0' }}/شهر</span></div>
          <div class="detail-row"><span class="d-label">القسم</span><span class="d-value">{{ form.department || '-' }}</span></div>
          <div class="detail-row"><span class="d-label">المسمى</span><span class="d-value">{{ form.position || '-' }}</span></div>
          <div class="detail-row"><span class="d-label">الحالة</span>
            <span class="d-value status-chip" [class]="form.status === 'active' ? 'active' : form.status === 'on_leave' ? 'pending' : 'inactive'">
              {{ form.status === 'active' ? 'نشط' : form.status === 'on_leave' ? 'في إجازة' : 'منتهي' }}
            </span>
          </div>
          <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem">
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">📅 سجل الحضور</button>
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">💰 كشف الراتب</button>
            <button *ngIf="isEdit" class="btn-luxe" style="width:100%;justify-content:center;background:#fff1f2;color:#f43f5e;border:1px solid #f43f5e">🚫 إنهاء الخدمة</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HrFormComponent implements OnInit {
  isEdit = false;
  form: Partial<Employee> = { name: '', email: '', department: 'المبيعات', position: '', salary: 0, startDate: '', status: 'active' };

  constructor(private route: ActivatedRoute, private router: Router, private data: DataMockService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.data.getEmployeeById(id).subscribe(emp => { if (emp) this.form = { ...emp }; });
    }
  }

  save() {
    alert(this.isEdit ? '✅ تم حفظ بيانات الموظف' : '✅ تم تسجيل الموظف بنجاح');
    this.router.navigate(['/hr']);
  }
}
