import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataMockService, SystemJob } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule],
  selector: 'app-jobs-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>⚡ المهام الخلفية (Background Jobs)</h1><p class="sub">إدارة المهام المجدولة وعمليات الأتمتة في الخلفية</p></div>
        <button class="btn-luxe btn-primary" (click)="runAll()">▶️ تشغيل الكل</button>
      </header>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">✅</div>
          <h2 style="font-size:1.75rem;font-weight:800;color:#16a34a">3</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">مهام نشطة</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">⏸️</div>
          <h2 style="font-size:1.75rem;font-weight:800;color:#f59e0b">1</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">موقوفة</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">❌</div>
          <h2 style="font-size:1.75rem;font-weight:800;color:#f43f5e">1</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">فاشلة</p>
        </div>
      </div>

      <div class="data-table-wrap">
        <div class="table-header"><h3>قائمة المهام المجدولة</h3></div>
        <table class="erp-table">
          <thead><tr><th>اسم المهمة</th><th>الجدول الزمني</th><th>آخر تشغيل</th><th>التالي</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let job of jobs$ | async">
              <td style="font-weight:700">{{ job.name }}</td>
              <td style="font-size:.82rem;color:var(--color-text-muted)">⏰ {{ job.schedule }}</td>
              <td>{{ job.lastRun }}</td>
              <td style="color:var(--color-primary)">{{ job.nextRun }}</td>
              <td>
                <span class="status-chip" [class]="job.status === 'active' ? 'active' : job.status === 'paused' ? 'pending' : 'cancelled'">
                  {{ job.status === 'active' ? '✅ نشط' : job.status === 'paused' ? '⏸️ موقوف' : '❌ فاشل' }}
                </span>
              </td>
              <td>
                <div class="row-actions">
                  <button class="action-btn success" title="تشغيل الآن" (click)="runJob(job.name)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
                  <button class="action-btn" title="إيقاف مؤقت"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg></button>
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
export class JobsPageComponent {
  jobs$: Observable<SystemJob[]>;
  constructor(private data: DataMockService) { this.jobs$ = this.data.getJobs(); }
  runJob(name: string) { alert(`✅ تم تشغيل المهمة: ${name}`); }
  runAll() { alert('✅ تم تشغيل جميع المهام النشطة'); }
}
