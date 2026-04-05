import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, CustomField } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-custom-fields-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🧱 الحقول المخصصة</h1><p class="sub">أضف حقولاً مخصصة لزيادة مرونة النظام وتتبع بياناتك الخاصة</p></div>
        <button class="btn-luxe btn-primary" (click)="showForm = !showForm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          إضافة حقل مخصص
        </button>
      </header>

      <div *ngIf="showForm" class="form-page luxe-card" style="margin-bottom:2rem;padding:2rem">
        <div class="form-card-title">📦 حقل مخصص جديد</div>
        <div class="form-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
          <div class="form-group"><label>اسم الحقل (System Name)</label><input class="erp-input" [(ngModel)]="newField.name" placeholder="مثال: custom_field_1"></div>
          <div class="form-group"><label>التسمية (Label)</label><input class="erp-input" [(ngModel)]="newField.label" placeholder="ماذا سيظهر للمستخدم؟"></div>
          <div class="form-group"><label>نوع البيانات</label>
            <select class="erp-input erp-select" [(ngModel)]="newField.type">
              <option value="text">نص (Text)</option>
              <option value="number">رقم (Number)</option>
              <option value="date">تاريخ (Date)</option>
              <option value="select">قائمة (Select)</option>
              <option value="checkbox">خيار (Checkbox)</option>
            </select>
          </div>
          <div class="form-group"><label>الوحدة (Module)</label>
            <select class="erp-input erp-select" [(ngModel)]="newField.module">
              <option value="المبيعات">المبيعات</option><option value="المخزون">المخزون</option>
              <option value="الموردين">الموردين</option><option value="الموارد البشرية">الموارد البشرية</option>
              <option value="CRM">إدارة العملاء</option>
            </select>
          </div>
          <div class="form-group" style="display:flex;align-items:center;gap:.75rem">
            <input type="checkbox" [(ngModel)]="newField.required" id="req_chk" style="width:20px;height:20px">
            <label for="req_chk" style="margin:0;font-weight:700">حقل مطلوب</label>
          </div>
        </div>
        <div class="form-actions" style="margin-top:1.5rem">
          <button class="btn-luxe btn-primary" (click)="saveField()">✅ حفظ الحقل</button>
          <button class="btn-luxe btn-ghost" (click)="showForm = false">إلغاء</button>
        </div>
      </div>

      <div class="data-table-wrap luxe-card">
        <div class="table-header"><h3>قائمة الحقول المخصصة المتاحة</h3></div>
        <table class="erp-table">
          <thead><tr><th>التسمية</th><th>اسم النظام</th><th>النوع</th><th>الوحدة</th><th>مطلوب</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let f of fields$ | async">
              <td style="font-weight:700">{{ f.label }}</td>
              <td style="font-family:monospace;font-size:.82rem">{{ f.name }}</td>
              <td><span style="background:#f1f5f9;padding:.2rem .6rem;border-radius:6px;font-size:.78rem;font-weight:700">{{ f.type }}</span></td>
              <td><span style="background:#eff6ff;color:#2563eb;padding:.2rem .6rem;border-radius:6px;font-size:.78rem;font-weight:800">{{ f.module }}</span></td>
              <td><span class="status-chip" [class]="f.required ? 'active' : 'inactive'">{{ f.required ? '✅ نعم' : '❌ لا' }}</span></td>
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
export class CustomFieldsListComponent {
  fields$: Observable<CustomField[]>;
  showForm = false;
  newField = { name: '', label: '', type: 'text', module: 'المخزون', required: false };
  constructor(private data: DataMockService) { this.fields$ = this.data.getCustomFields(); }
  saveField() { alert('✅ تم حفظ الحقل بنجاح!'); this.showForm = false; }
}
