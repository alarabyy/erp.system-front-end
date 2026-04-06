import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMockService, SecurityLog } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-audit-logs',
  template: `
    <div class="erp-page animate-fade-in luxe-audit-logs">
      <div class="page-header-luxe">
        <div class="ph-content">
          <h1>🔐 سجلات الرقابة (Audit Logs)</h1>
          <p>تتبع كافة التحركات والعمليات الحساسة في النظام لضمان أعلى مستويات الأمان</p>
        </div>
        <div class="ph-actions">
          <button class="btn-luxe btn-secondary">تصدير السجل (Excel)</button>
          <button class="btn-luxe btn-ghost">تصفية متقدمة</button>
        </div>
      </div>

      <div class="audit-stats-grid">
        <div class="stat-mini-card">
          <span class="s-icon danger">🚨</span>
          <div class="s-info">
            <span class="s-label">عمليات فاشلة</span>
            <span class="s-value">12</span>
          </div>
        </div>
        <div class="stat-mini-card">
          <span class="s-icon success">✅</span>
          <div class="s-info">
            <span class="s-label">عمليات ناجحة</span>
            <span class="s-value">1,402</span>
          </div>
        </div>
        <div class="stat-mini-card">
          <span class="s-icon warning">⚠️</span>
          <div class="s-info">
            <span class="s-label">تحذيرات أمنية</span>
            <span class="s-value">4</span>
          </div>
        </div>
        <div class="stat-mini-card">
          <span class="s-icon info">👤</span>
          <div class="s-info">
            <span class="s-label">نشاط اليوم</span>
            <span class="s-value">284</span>
          </div>
        </div>
      </div>

      <div class="luxe-card table-card">
        <table class="luxe-table">
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>العملية</th>
              <th>عنوان الـ IP</th>
              <th>الوقت والتاريخ</th>
              <th>الحالة</th>
              <th>التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of (logs$ | async)" class="audit-row">
              <td class="user-cell">
                <div class="u-avatar">أح</div>
                <span class="u-name">{{ log.user }}</span>
              </td>
              <td class="action-cell">
                <span class="action-tag">{{ log.action }}</span>
              </td>
              <td class="ip-cell"><code>{{ log.ip }}</code></td>
              <td class="time-cell">{{ log.time }}</td>
              <td>
                <span class="status-badge" [class]="log.status">
                  {{ log.status === 'success' ? 'ناجحة' : log.status === 'failed' ? 'فاشلة' : 'تحذير' }}
                </span>
              </td>
              <td>
                <button class="icon-btn-luxe">👁️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .luxe-audit-logs { padding-bottom: 2rem; }
    .page-header-luxe { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
    .ph-content h1 { font-size: 2.25rem; font-weight: 900; color: #0f172a; }
    .ph-content p { color: #64748b; font-weight: 600; margin-top: .5rem; }
    .ph-actions { display: flex; gap: 1rem; }

    .audit-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-mini-card { background: white; padding: 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 1.25rem; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,.02); }
    .s-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .s-icon.danger { background: #fef2f2; }
    .s-icon.success { background: #f0fdf4; }
    .s-icon.warning { background: #fffbeb; }
    .s-icon.info { background: #eff6ff; }
    .s-info { display: flex; flex-direction: column; }
    .s-label { font-size: .85rem; color: #64748b; font-weight: 700; }
    .s-value { font-size: 1.5rem; font-weight: 800; color: #0f172a; }

    .luxe-table { width: 100%; border-collapse: collapse; }
    .luxe-table th { text-align: right; padding: 1.25rem; background: #f8fafc; color: #475569; font-weight: 800; font-size: .85rem; border-bottom: 1px solid #e2e8f0; }
    .luxe-table td { padding: 1.25rem; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-weight: 600; font-size: .95rem; }
    
    .user-cell { display: flex; align-items: center; gap: .75rem; }
    .u-avatar { width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 800; color: #475569; }
    .action-tag { background: #f1f5f9; padding: .35rem .75rem; border-radius: 8px; font-size: .85rem; font-weight: 700; }
    .ip-cell code { background: #f8fafc; color: #64748b; padding: .25rem .5rem; border-radius: 6px; font-family: monospace; font-size: .85rem; border: 1px solid #e2e8f0; }
    .time-cell { color: #94a3b8; font-family: monospace; }
    
    .status-badge { display: inline-flex; align-items: center; padding: .35rem .85rem; border-radius: 99px; font-size: .8rem; font-weight: 800; }
    .status-badge.success { background: #f0fdf4; color: #16a34a; }
    .status-badge.failed { background: #fef2f2; color: #dc2626; }
    .status-badge.warning { background: #fffbeb; color: #ca8a04; }

    .icon-btn-luxe { border: none; background: #f1f5f9; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; transition: all .2s; }
    .icon-btn-luxe:hover { background: #e2e8f0; transform: scale(1.1); }
  `]
})
export class AuditLogsComponent implements OnInit {
  logs$: Observable<SecurityLog[]>;

  constructor(private data: DataMockService) {
    this.logs$ = this.data.getSecurityLogs();
  }

  ngOnInit() {}
}
