import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, WorkflowItem } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-workflow-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🔄 سير العمل التلقائي</h1><p class="sub">إدارة التدفقات التلقائية وقواعد الأتمتة</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-primary" (click)="showDesigner = !showDesigner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            {{ showDesigner ? 'العودة للقائمة' : 'مصمم سير العمل' }}
          </button>
        </div>
      </header>

      <div *ngIf="!showDesigner">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.5rem">
          <div class="luxe-card" style="padding:1.5rem;text-align:center">
            <div style="font-size:1.75rem">⚡</div>
            <h2 style="font-size:1.75rem;font-weight:800;color:var(--color-primary)">5</h2>
            <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">إجمالي التدفقات</p>
          </div>
          <div class="luxe-card" style="padding:1.5rem;text-align:center">
            <div style="font-size:1.75rem">✅</div>
            <h2 style="font-size:1.75rem;font-weight:800;color:#16a34a">3</h2>
            <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">تدفقات نشطة</p>
          </div>
          <div class="luxe-card" style="padding:1.5rem;text-align:center">
            <div style="font-size:1.75rem">🔢</div>
            <h2 style="font-size:1.75rem;font-weight:800;color:#7c3aed">483</h2>
            <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">تنفيذ إجمالي</p>
          </div>
        </div>

        <div class="data-table-wrap">
          <div class="table-header"><h3>التدفقات التلقائية</h3></div>
          <table class="erp-table">
            <thead><tr><th>الاسم</th><th>المحفز (Trigger)</th><th>الحالة</th><th>آخر تشغيل</th><th>التشغيلات</th><th>إجراءات</th></tr></thead>
            <tbody>
              <tr *ngFor="let w of workflows$ | async">
                <td style="font-weight:700">{{ w.name }}</td>
                <td style="font-size:.82rem;color:var(--color-text-muted)">{{ w.trigger }}</td>
                <td><span class="status-chip" [class]="w.status === 'active' ? 'active' : w.status === 'draft' ? 'pending' : 'inactive'">{{ w.status === 'active' ? '✅ نشط' : w.status === 'draft' ? '📝 مسودة' : '⏸️ موقوف' }}</span></td>
                <td>{{ w.lastRun }}</td>
                <td><span style="background:#eff6ff;color:#2563eb;padding:.25rem .75rem;border-radius:8px;font-weight:700;font-size:.8rem">{{ w.runs }}</span></td>
                <td>
                  <div class="row-actions">
                    <button class="action-btn" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    <button class="action-btn success" title="تشغيل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
                    <button class="action-btn danger" title="حذف"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Workflow Designer -->
      <div *ngIf="showDesigner" class="luxe-card" style="padding:2rem">
        <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:2rem">🎨 مصمم سير العمل المرئي</h3>
        <div style="background:#f8fafc;border-radius:14px;border:1px dashed var(--color-border);padding:2rem;min-height:400px;display:flex;gap:2rem;overflow-x:auto">
          <div *ngFor="let step of designerSteps; let i = index" style="display:flex;align-items:center;gap:1rem;flex-shrink:0">
            <div style="background:white;border:2px solid;border-radius:16px;padding:1.25rem 1.5rem;text-align:center;min-width:150px;cursor:grab;transition:var(--transition-smooth)" [style.borderColor]="step.color">
              <div style="font-size:1.75rem;margin-bottom:.5rem">{{ step.icon }}</div>
              <p style="font-weight:800;font-size:.85rem;margin-bottom:.25rem" [style.color]="step.color">{{ step.type }}</p>
              <p style="font-size:.75rem;color:var(--color-text-muted);font-weight:600">{{ step.name }}</p>
            </div>
            <div *ngIf="i < designerSteps.length - 1" style="font-size:1.5rem;color:var(--color-text-muted)">→</div>
          </div>
          <div style="display:flex;align-items:center">
            <button class="btn-luxe btn-ghost" (click)="addStep()" style="height:fit-content">+ إضافة خطوة</button>
          </div>
        </div>
        <div class="form-actions" style="margin-top:1.5rem">
          <button class="btn-luxe btn-primary" (click)="saveWorkflow()">💾 حفظ التدفق</button>
          <button class="btn-luxe btn-ghost" (click)="showDesigner = false">إلغاء</button>
        </div>
      </div>
    </div>
  `
})
export class WorkflowListComponent {
  workflows$: Observable<WorkflowItem[]>;
  showDesigner = false;
  designerSteps = [
    { type: 'محفز', name: 'مخزون < 10', icon: '⚡', color: '#f59e0b' },
    { type: 'فلتر', name: 'تحقق من الفئة', icon: '🔍', color: '#0062ff' },
    { type: 'إجراء', name: 'إرسال إشعار', icon: '📧', color: '#16a34a' },
  ];
  constructor(private data: DataMockService) { this.workflows$ = this.data.getWorkflows(); }
  addStep() { this.designerSteps.push({ type: 'إجراء', name: 'خطوة جديدة', icon: '⚙️', color: '#7c3aed' }); }
  saveWorkflow() { alert('✅ تم حفظ التدفق بنجاح'); this.showDesigner = false; }
}
