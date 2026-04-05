import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Supplier } from '../../../../core/services/data-mock.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-purchases-form',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>{{ isEdit ? 'تعديل المورد / أمر الشراء' : 'إنشاء أمر شراء جديد' }}</h1><p class="sub">{{ isEdit ? form.name : 'تحديد المورد وإدخال تفاصيل الأمر' }}</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/purchases">← رجوع للمشتريات</button>
      </header>
      <div class="form-page">
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div class="form-card">
            <div class="form-card-title">🏭 بيانات المورد</div>
            <div class="form-grid">
              <div class="form-group"><label>اسم الشركة / المورد *</label><input class="erp-input" [(ngModel)]="form.name" placeholder="الاسم الرسمي للمورد"></div>
              <div class="form-group"><label>الشخص المسؤول</label><input class="erp-input" [(ngModel)]="form.contactPerson" placeholder="اسم مسؤول التواصل"></div>
              <div class="form-group"><label>البريد الإلكتروني</label><input class="erp-input" type="email" [(ngModel)]="form.email"></div>
              <div class="form-group"><label>رقم الهاتف</label><input class="erp-input" [(ngModel)]="form.phone"></div>
              <div class="form-group"><label>الدولة</label>
                <select class="erp-input erp-select" [(ngModel)]="form.country">
                  <option value="السعودية">السعودية</option>
                  <option value="الإمارات">الإمارات</option>
                  <option value="الكويت">الكويت</option>
                  <option value="مصر">مصر</option>
                  <option value="الأردن">الأردن</option>
                </select>
              </div>
              <div class="form-group"><label>الحالة</label>
                <select class="erp-input erp-select" [(ngModel)]="form.status">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-card">
            <div class="form-card-title">📦 تفاصيل أمر الشراء</div>
            <div class="form-grid">
              <div class="form-group"><label>تاريخ الأمر</label><input class="erp-input" type="date" [(ngModel)]="orderDate"></div>
              <div class="form-group"><label>تاريخ التسليم المتوقع</label><input class="erp-input" type="date" [(ngModel)]="deliveryDate"></div>
              <div class="form-group"><label>العملة</label>
                <select class="erp-input erp-select" [(ngModel)]="currency">
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                </select>
              </div>
              <div class="form-group"><label>ملاحظات</label><input class="erp-input" [(ngModel)]="notes" placeholder="أي ملاحظات خاصة"></div>
            </div>
            <!-- Items -->
            <div style="margin-top:1.5rem">
              <table class="erp-table" style="margin-bottom:1rem">
                <thead><tr><th>الصنف</th><th>الكمية</th><th>سعر التكلفة</th><th>الإجمالي</th><th></th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of items; let i = index">
                    <td><input class="erp-input" [(ngModel)]="item.name" placeholder="اسم الصنف" style="min-width:160px"></td>
                    <td><input class="erp-input" type="number" [(ngModel)]="item.qty" min="1" style="width:80px"></td>
                    <td><input class="erp-input" type="number" [(ngModel)]="item.cost" min="0" style="width:120px"></td>
                    <td><strong>{{ (item.qty * item.cost) | currency:'USD':'symbol':'1.0-0' }}</strong></td>
                    <td><button class="action-btn danger" (click)="removeItem(i)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></td>
                  </tr>
                </tbody>
              </table>
              <button class="btn-luxe btn-ghost" (click)="addItem()">+ إضافة صنف</button>
            </div>
            <div class="form-actions">
              <button class="btn-luxe btn-primary" (click)="save()">{{ isEdit ? '💾 حفظ التعديلات' : '✅ إصدار أمر الشراء' }}</button>
              <button class="btn-luxe btn-ghost" routerLink="/purchases">إلغاء</button>
            </div>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="form-card-title">💰 ملخص الطلب</div>
          <div class="detail-row"><span class="d-label">المجموع</span><span class="d-value">{{ getTotal() | currency:'USD':'symbol':'1.0-0' }}</span></div>
          <div class="detail-row"><span class="d-label">الضريبة (15%)</span><span class="d-value">{{ (getTotal() * 0.15) | currency:'USD':'symbol':'1.0-0' }}</span></div>
          <div class="detail-row" style="border-top:2px solid var(--color-primary);padding-top:1rem;margin-top:.5rem">
            <span class="d-label" style="font-weight:800">الإجمالي الكلي</span>
            <span class="d-value" style="font-size:1.2rem;font-weight:800;color:var(--color-primary)">{{ (getTotal() * 1.15) | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
          <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem">
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">🖨️ طباعة الأمر</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PurchasesFormComponent implements OnInit {
  isEdit = false;
  form: Partial<Supplier> = { name: '', contactPerson: '', email: '', phone: '', country: 'السعودية', status: 'active' };
  orderDate = new Date().toISOString().split('T')[0];
  deliveryDate = '';
  currency = 'USD';
  notes = '';
  items: { name: string; qty: number; cost: number }[] = [{ name: '', qty: 1, cost: 0 }];

  constructor(private route: ActivatedRoute, private router: Router, private data: DataMockService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.data.getSupplierById(id).subscribe(s => { if (s) this.form = { ...s }; });
    }
  }

  addItem() { this.items.push({ name: '', qty: 1, cost: 0 }); }
  removeItem(i: number) { this.items.splice(i, 1); }
  getTotal() { return this.items.reduce((s, i) => s + i.qty * i.cost, 0); }
  save() { alert(this.isEdit ? '✅ تم التحديث' : '✅ تم إصدار أمر الشراء'); this.router.navigate(['/purchases']); }
}
