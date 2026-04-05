import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Rule } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-rules-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>⚙️ محرك القواعد التلقائية</h1><p class="sub">قواعد شرطية ذكية للأتمتة بدون برمجة</p></div>
        <button class="btn-luxe btn-primary" (click)="showForm = !showForm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          إنشاء قاعدة جديدة
        </button>
      </header>

      <!-- Create Rule Form -->
      <div *ngIf="showForm" class="form-page">
        <div class="form-card" style="grid-column:span 2">
          <div class="form-card-title">🆕 قاعدة جديدة</div>
          <div class="form-grid">
            <div class="form-group"><label>اسم القاعدة *</label><input class="erp-input" [(ngModel)]="newRule.name" placeholder="مثال: تنبيه المخزون المنخفض"></div>
            <div class="form-group"><label>الأولوية</label><input class="erp-input" type="number" [(ngModel)]="newRule.priority" min="1" max="10"></div>
            <div class="form-group" style="grid-column:span 2"><label>الشرط (IF)</label>
              <div style="display:flex;gap:.75rem;align-items:center">
                <select class="erp-input erp-select" style="flex:1">
                  <option>stock</option><option>order_value</option><option>due_date</option><option>customer_orders</option>
                </select>
                <select class="erp-input erp-select" style="width:120px">
                  <option>&lt;</option><option>&gt;</option><option>=</option><option>≥</option>
                </select>
                <input class="erp-input" [(ngModel)]="newRule.condition" placeholder="القيمة" style="flex:1">
              </div>
            </div>
            <div class="form-group" style="grid-column:span 2"><label>الإجراء (THEN)</label>
              <select class="erp-input erp-select" [(ngModel)]="newRule.action">
                <option value="إرسال إشعار للمدير">إرسال إشعار للمدير</option>
                <option value="تطبيق خصم 5%">تطبيق خصم 5%</option>
                <option value="طلب موافقة مدير">طلب موافقة مدير</option>
                <option value="إرسال تذكير للعميل">إرسال تذكير للعميل</option>
                <option value="حجب العملية تلقائياً">حجب العملية تلقائياً</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-luxe btn-primary" (click)="saveRule()">✅ حفظ القاعدة</button>
            <button class="btn-luxe btn-ghost" (click)="showForm = false">إلغاء</button>
          </div>
        </div>
      </div>

      <div class="data-table-wrap">
        <div class="table-header"><h3>القواعد المُعرَّفة</h3></div>
        <table class="erp-table">
          <thead><tr><th>الأولوية</th><th>اسم القاعدة</th><th>الشرط (IF)</th><th>الإجراء (THEN)</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let r of rules$ | async">
              <td style="text-align:center"><span style="background:#eff6ff;color:#2563eb;width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800">{{ r.priority }}</span></td>
              <td style="font-weight:700">{{ r.name }}</td>
              <td style="font-family:monospace;font-size:.82rem;background:#f8fafc;padding:.35rem .75rem;border-radius:8px;white-space:nowrap">{{ r.condition }}</td>
              <td>{{ r.action }}</td>
              <td><span class="status-chip" [class]="r.status">{{ r.status === 'active' ? '✅ نشط' : '⏸️ موقوف' }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                  <button class="action-btn danger" title="حذف"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class RulesListComponent {
  rules$: Observable<Rule[]>;
  showForm = false;
  newRule = { name: '', condition: '', action: 'إرسال إشعار للمدير', priority: 5 };
  constructor(private data: DataMockService) { this.rules$ = this.data.getRules(); }
  saveRule() { alert('✅ تم حفظ القاعدة'); this.showForm = false; this.newRule = { name: '', condition: '', action: 'إرسال إشعار للمدير', priority: 5 }; }
}
