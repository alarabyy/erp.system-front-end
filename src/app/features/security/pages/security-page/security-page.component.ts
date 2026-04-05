import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataMockService, SecurityLog } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule],
  selector: 'app-security-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🔐 الأمان والحماية</h1><p class="sub">سجلات تسجيل الدخول، محاولات الاختراق، وإعدادات الأمان</p></div>
        <button class="btn-luxe btn-ghost">📥 تصدير السجلات</button>
      </header>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem;border-right:3px solid #16a34a">
          <div style="font-size:1.5rem">✅</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#16a34a">142</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600">دخول ناجح اليوم</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;border-right:3px solid #f43f5e">
          <div style="font-size:1.5rem">❌</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#f43f5e">8</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600">محاولة دخول فاشلة</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;border-right:3px solid #f59e0b">
          <div style="font-size:1.5rem">⚠️</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#f59e0b">3</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600">تحذيرات أمنية</p>
        </div>
        <div class="luxe-card" style="padding:1.5rem;border-right:3px solid #0062ff">
          <div style="font-size:1.5rem">🛡️</div>
          <h2 style="font-size:1.6rem;font-weight:800;color:#0062ff">99.4%</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600">معدل الأمان</p>
        </div>
      </div>

      <div class="data-table-wrap">
        <div class="table-header"><h3>🔍 سجل دخول المستخدمين</h3></div>
        <table class="erp-table">
          <thead><tr><th>المستخدم</th><th>الإجراء</th><th>عنوان IP</th><th>الوقت</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr *ngFor="let log of logs$ | async">
              <td style="font-weight:700">{{ log.user }}</td>
              <td>{{ log.action }}</td>
              <td style="font-family:monospace;font-size:.82rem;color:var(--color-text-muted)">{{ log.ip }}</td>
              <td>{{ log.time }}</td>
              <td>
                <span class="status-chip" [class]="log.status === 'success' ? 'active' : log.status === 'warning' ? 'pending' : 'cancelled'">
                  {{ log.status === 'success' ? '✅ نجاح' : log.status === 'warning' ? '⚠️ تحذير' : '❌ فشل' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <div class="form-card-title">⚙️ إعدادات الأمان</div>
          <div class="detail-row"><span class="d-label">المصادقة الثنائية (2FA)</span><span class="d-value" style="color:#16a34a;font-weight:700">✅ مُفعّل</span></div>
          <div class="detail-row"><span class="d-label">انتهاء الجلسة</span><span class="d-value">30 دقيقة</span></div>
          <div class="detail-row"><span class="d-label">حد محاولات الدخول</span><span class="d-value">5 محاولات</span></div>
          <div class="detail-row"><span class="d-label">تشفير البيانات</span><span class="d-value" style="color:#16a34a;font-weight:700">AES-256</span></div>
          <div class="detail-row"><span class="d-label">آخر تحديث أمني</span><span class="d-value">2026-04-01</span></div>
          <button class="btn-luxe btn-primary" style="margin-top:1.5rem;width:100%;justify-content:center">⚙️ تعديل الإعدادات</button>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <div class="form-card-title">🌐 عناوين IP المحظورة</div>
          <div *ngFor="let ip of blockedIPs" style="display:flex;justify-content:space-between;align-items:center;padding:.75rem 0;border-bottom:1px solid #f1f5f9">
            <span style="font-family:monospace;font-weight:600">{{ ip.address }}</span>
            <div style="display:flex;align-items:center;gap:.75rem">
              <span style="font-size:.75rem;color:var(--color-text-muted)">{{ ip.reason }}</span>
              <button class="action-btn danger" title="رفع الحظر"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
          </div>
          <button class="btn-luxe btn-ghost" style="margin-top:1.25rem;width:100%;justify-content:center">+ حظر IP جديد</button>
        </div>
      </div>
    </div>
  `
})
export class SecurityPageComponent {
  logs$: Observable<SecurityLog[]>;
  blockedIPs = [
    { address: '185.220.101.42', reason: 'محاولات اختراق متعددة' },
    { address: '103.21.244.0', reason: 'هجوم brute force' },
    { address: '45.130.229.168', reason: 'نشاط مشبوه' },
  ];
  constructor(private data: DataMockService) { this.logs$ = this.data.getSecurityLogs(); }
}
