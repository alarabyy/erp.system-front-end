import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, SalesOrder } from '../../../../core/services/data-mock.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-sales-form',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div>
          <h1>{{ isEdit ? 'تعديل الطلب' : 'إنشاء طلب بيع جديد' }}</h1>
          <p class="sub">{{ isEdit ? ('طلب رقم: ' + form.orderNo) : 'ملء تفاصيل طلب البيع الجديد' }}</p>
        </div>
        <button class="btn-luxe btn-ghost" routerLink="/sales">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          رجوع للطلبات
        </button>
      </header>

      <div class="form-page">
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <!-- Order Details -->
          <div class="form-card">
            <div class="form-card-title">📋 تفاصيل الطلب</div>
            <div class="form-grid">
              <div class="form-group">
                <label>اسم العميل *</label>
                <input class="erp-input" [(ngModel)]="form.customer" placeholder="اسم الشركة أو العميل">
              </div>
              <div class="form-group">
                <label>تاريخ الطلب *</label>
                <input class="erp-input" type="date" [(ngModel)]="form.date">
              </div>
              <div class="form-group">
                <label>حالة الطلب</label>
                <select class="erp-input erp-select" [(ngModel)]="form.status">
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="shipped">مشحون</option>
                  <option value="delivered">مسلّم</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
              <div class="form-group">
                <label>حالة الدفع</label>
                <select class="erp-input erp-select" [(ngModel)]="form.paymentStatus">
                  <option value="paid">مدفوع بالكامل</option>
                  <option value="partial">دفع جزئي</option>
                  <option value="unpaid">غير مدفوع</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Items -->
          <div class="form-card">
            <div class="form-card-title">📦 أصناف الطلب</div>
            <table class="erp-table" style="margin-bottom:1rem">
              <thead><tr><th>المنتج</th><th>الكمية</th><th>سعر الوحدة</th><th>الإجمالي</th><th></th></tr></thead>
              <tbody>
                <tr *ngFor="let item of items; let i = index">
                  <td><input class="erp-input" style="min-width:180px" [(ngModel)]="item.name" placeholder="اسم المنتج"></td>
                  <td><input class="erp-input" type="number" style="width:80px" [(ngModel)]="item.qty" min="1"></td>
                  <td><input class="erp-input" type="number" style="width:120px" [(ngModel)]="item.price" min="0"></td>
                  <td><strong>{{ (item.qty * item.price) | currency:'USD':'symbol':'1.0-0' }}</strong></td>
                  <td><button class="action-btn danger" (click)="removeItem(i)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></td>
                </tr>
              </tbody>
            </table>
            <button class="btn-luxe btn-ghost" (click)="addItem()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              إضافة صنف
            </button>
          </div>

          <div class="form-card">
            <div class="form-group single">
              <label>ملاحظات على الطلب</label>
              <textarea class="erp-input" [(ngModel)]="form.notes" placeholder="أي ملاحظات خاصة بهذا الطلب أو تعليمات للشحن..."></textarea>
            </div>
            <div class="form-actions">
              <button class="btn-luxe btn-primary" (click)="save()">
                {{ isEdit ? '💾 حفظ التعديلات' : '✅ تأكيد الطلب' }}
              </button>
              <button class="btn-luxe btn-ghost" routerLink="/sales">إلغاء</button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="sidebar-card">
          <div class="form-card-title">💰 ملخص الطلب</div>
          <div class="detail-row"><span class="d-label">المجموع الفرعي</span><span class="d-value">{{ getSubtotal() | currency:'USD':'symbol':'1.0-0' }}</span></div>
          <div class="detail-row"><span class="d-label">الضريبة (15%)</span><span class="d-value">{{ getTax() | currency:'USD':'symbol':'1.0-0' }}</span></div>
          <div class="detail-row" style="border-top:2px solid var(--color-primary);padding-top:1rem;margin-top:.5rem">
            <span class="d-label" style="font-weight:800;color:#0f172a">الإجمالي الكلي</span>
            <span class="d-value" style="font-size:1.3rem;font-weight:800;color:var(--color-primary)">{{ getTotal() | currency:'USD':'symbol':'1.0-0' }}</span>
          </div>
          <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--color-border)">
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center;">🖨️ طباعة الفاتورة</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SalesFormComponent implements OnInit {
  isEdit = false;
  form: Partial<SalesOrder> & { notes?: string } = {
    customer: '', date: new Date().toISOString().split('T')[0],
    status: 'pending', paymentStatus: 'unpaid', notes: ''
  };
  items: { name: string; qty: number; price: number }[] = [
    { name: '', qty: 1, price: 0 }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private data: DataMockService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.data.getSalesOrderById(id).subscribe(order => {
        if (order) {
          this.form = { ...order };
          this.items = Array.from({ length: order.items }, (_, i) => ({
            name: 'منتج ' + (i + 1), qty: Math.floor(Math.random() * 5) + 1, price: Math.floor(Math.random() * 500) + 100
          }));
        }
      });
    }
  }

  addItem() { this.items.push({ name: '', qty: 1, price: 0 }); }
  removeItem(i: number) { this.items.splice(i, 1); }
  getSubtotal(): number { return this.items.reduce((s, i) => s + i.qty * i.price, 0); }
  getTax(): number { return this.getSubtotal() * 0.15; }
  getTotal(): number { return this.getSubtotal() + this.getTax(); }

  save() {
    alert(this.isEdit ? '✅ تم حفظ تعديلات الطلب' : '✅ تم إنشاء الطلب بنجاح');
    this.router.navigate(['/sales']);
  }
}
