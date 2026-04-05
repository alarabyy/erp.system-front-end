import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataMockService, BackupRecord } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule],
  selector: 'app-backup-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>💾 النسخ الاحتياطي والاستعادة</h1><p class="sub">إدارة النسخ الاحتياطية التلقائية واليدوية، واستعادة البيانات</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost" (click)="restore()">♻️ استعادة نسخة</button>
          <button class="btn-luxe btn-primary" (click)="createBackup()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path></svg>
            نسخة احتياطية الآن
          </button>
        </div>
      </header>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">💾</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-primary)">4</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">نسخ احتياطية</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">📦</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#16a34a">6.7 GB</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">الحجم الإجمالي</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">🕑</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#f59e0b">اليوم</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">آخر نسخة</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;text-align:center">
          <div style="font-size:1.5rem">✅</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#16a34a">75%</h2>
          <p style="color:var(--color-text-muted);font-size:.85rem;font-weight:600">معدل النجاح</p>
        </div>
      </div>

      <div *ngIf="isCreating" class="luxe-card" style="padding:2rem;text-align:center">
        <div style="font-size:2rem;margin-bottom:1rem">⏳</div>
        <h3 style="font-size:1.2rem;font-weight:800;margin-bottom:.5rem">جاري إنشاء النسخة الاحتياطية...</h3>
        <div style="background:#f1f5f9;border-radius:10px;height:8px;margin:1.5rem auto;max-width:400px;overflow:hidden">
          <div [style.width]="progress+'%'" style="height:100%;background:var(--color-primary);border-radius:10px;transition:width 0.5s ease"></div>
        </div>
        <p style="color:var(--color-text-muted);font-weight:600">{{ progress }}% مكتمل...</p>
      </div>

      <div class="data-table-wrap">
        <div class="table-header"><h3>سجل النسخ الاحتياطية</h3></div>
        <table class="erp-table">
          <thead><tr><th>الاسم</th><th>النوع</th><th>الحجم</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr *ngFor="let b of backups$ | async">
              <td style="font-weight:700">{{ b.name }}</td>
              <td><span style="background:#eff6ff;color:#2563eb;padding:.25rem .7rem;border-radius:8px;font-size:.78rem;font-weight:700">{{ b.type === 'auto' ? '🤖 تلقائي' : '👤 يدوي' }}</span></td>
              <td>{{ b.size }}</td>
              <td>{{ b.date }}</td>
              <td><span class="status-chip" [class]="b.status === 'success' ? 'active' : b.status === 'running' ? 'pending' : 'cancelled'">{{ b.status === 'success' ? '✅ نجاح' : b.status === 'running' ? '⏳ جاري' : '❌ فشل' }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn" title="تنزيل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
                  <button class="action-btn success" title="استعادة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-3.93"></path></svg></button>
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
export class BackupPageComponent {
  backups$: Observable<BackupRecord[]>;
  isCreating = false; progress = 0;
  constructor(private data: DataMockService) { this.backups$ = this.data.getBackups(); }
  createBackup() {
    this.isCreating = true; this.progress = 0;
    const interval = setInterval(() => { this.progress += 10; if (this.progress >= 100) { clearInterval(interval); setTimeout(() => { this.isCreating = false; alert('✅ تم إنشاء النسخة الاحتياطية بنجاح'); }, 500); } }, 300);
  }
  restore() { if (confirm('♻️ هل تريد استعادة النسخة الاحتياطية الأخيرة؟')) alert('✅ تم استعادة البيانات بنجاح'); }
}
