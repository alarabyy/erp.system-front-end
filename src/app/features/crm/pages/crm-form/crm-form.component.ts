import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService } from '../../../../core/services/data-mock.service';
import { Lead } from '../../../../core/models/data-models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-crm-form',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>{{ isEdit ? 'تعديل العميل المحتمل' : 'إضافة عميل محتمل' }}</h1><p class="sub">{{ isEdit ? form.company : 'إدخال بيانات فرصة بيع جديدة' }}</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/crm">← رجوع للعملاء</button>
      </header>
      <div class="form-page">
        <div class="form-card">
          <div class="form-card-title">🎯 بيانات العميل المحتمل</div>
          <div class="form-grid">
            <div class="form-group"><label>اسم العميل *</label><input class="erp-input" [(ngModel)]="form.name" placeholder="الاسم الكامل"></div>
            <div class="form-group"><label>اسم الشركة</label><input class="erp-input" [(ngModel)]="form.company" placeholder="اسم الشركة"></div>
            <div class="form-group"><label>البريد الإلكتروني</label><input class="erp-input" type="email" [(ngModel)]="form.email"></div>
            <div class="form-group"><label>رقم الهاتف</label><input class="erp-input" [(ngModel)]="asAny(form).phone"></div>
            <div class="form-group"><label>قيمة الفرصة (USD)</label><input class="erp-input" type="number" [(ngModel)]="asAny(form).value" min="0"></div>
            <div class="form-group"><label>المصدر</label>
              <select class="erp-input erp-select" [(ngModel)]="asAny(form).source">
                <option value="موقع إلكتروني">موقع إلكتروني</option>
                <option value="معرض تجاري">معرض تجاري</option>
                <option value="إحالة عميل">إحالة عميل</option>
                <option value="حملة تسويقية">حملة تسويقية</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            <div class="form-group"><label>المرحلة الحالية</label>
              <select class="erp-input erp-select" [(ngModel)]="form.status">
                <option value="new">جديد</option>
                <option value="contacted">تم التواصل</option>
                <option value="qualified">مؤهل</option>
                <option value="proposal">عرض أسعار</option>
                <option value="won">محقق ✅</option>
                <option value="lost">خسارة ❌</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-luxe btn-primary" (click)="save()">{{ isEdit ? '💾 حفظ التعديلات' : '✅ إضافة العميل' }}</button>
            <button class="btn-luxe btn-ghost" routerLink="/crm">إلغاء</button>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="form-card-title">📈 متابعة الفرصة</div>
          <div class="detail-row"><span class="d-label">الحالة</span><span class="d-value status-chip" [class]="form.status">{{ form.status || '-' }}</span></div>
          <div class="detail-row"><span class="d-label">القيمة</span><span class="d-value" style="color:var(--color-primary);font-weight:800">{{ (asAny(form).value || 0) | currency:'USD':'symbol':'1.0-0' }}</span></div>
          <div class="detail-row"><span class="d-label">المصدر</span><span class="d-value">{{ asAny(form).source || '-' }}</span></div>
          <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem">
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">📞 تسجيل مكالمة</button>
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">📧 إرسال بريد</button>
            <button *ngIf="isEdit" class="btn-luxe btn-primary" style="width:100%;justify-content:center">🛒 تحويل لطلب بيع</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CrmFormComponent implements OnInit {
  isEdit = false;
  form: Partial<Lead> = { name: '', company: '', email: '', phone: '', value: 0, source: 'موقع إلكتروني', status: 'new' };

  constructor(private route: ActivatedRoute, private router: Router, private data: DataMockService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.data.getLeadById(id).subscribe((lead: Lead | undefined) => { if (lead) this.form = { ...lead }; });
    }
  }

  asAny(obj: any) { return obj; }

  save() {
    alert(this.isEdit ? '✅ تم حفظ بيانات العميل' : '✅ تم إضافة العميل المحتمل');
    this.router.navigate(['/crm']);
  }
}
