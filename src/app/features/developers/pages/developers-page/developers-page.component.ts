import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-developers-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🧑‍💻 بيئة المطورين</h1><p class="sub">اختبار API، سجلات الأداء، والتوثيق التقني</p></div>
        <span style="background:#1e293b;color:#e2e8f0;padding:.5rem 1.25rem;border-radius:20px;font-size:.82rem;font-weight:700;font-family:monospace">v2.4.1 API</span>
      </header>

      <!-- API Tester -->
      <div class="form-page">
        <div style="grid-column:span 2;display:flex;flex-direction:column;gap:1.5rem">
          <div class="luxe-card" style="padding:1.75rem">
            <div class="form-card-title">⚡ اختبار API (API Tester)</div>
            <div style="display:flex;gap:.75rem;margin-bottom:1.25rem">
              <select class="erp-input erp-select" [(ngModel)]="method" style="width:120px;font-family:monospace;font-weight:700" [style.color]="method==='GET'?'#16a34a':method==='POST'?'#0062ff':method==='PUT'?'#f59e0b':'#f43f5e'">
                <option value="GET">GET</option><option value="POST">POST</option><option value="PUT">PUT</option><option value="DELETE">DELETE</option>
              </select>
              <input class="erp-input" [(ngModel)]="endpoint" placeholder="https://api.quantumerp.com/v1/..." style="flex:1;font-family:monospace">
              <button class="btn-luxe btn-primary" (click)="sendRequest()">▶ إرسال</button>
            </div>
            <div class="form-group" *ngIf="method !== 'GET'">
              <label>Request Body (JSON)</label>
              <textarea class="erp-input" [(ngModel)]="requestBody" style="font-family:monospace;min-height:100px;font-size:.82rem" placeholder='{ "key": "value" }'></textarea>
            </div>
            <div *ngIf="response" style="margin-top:1.25rem">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem">
                <span style="font-weight:800;font-size:.9rem">الاستجابة</span>
                <div style="display:flex;gap:.75rem">
                  <span style="padding:.25rem .75rem;border-radius:8px;font-size:.78rem;font-weight:800" [style.background]="responseCode<300?'#f0fdf4':'#fff1f2'" [style.color]="responseCode<300?'#16a34a':'#f43f5e'">{{ responseCode }}</span>
                  <span style="font-size:.78rem;color:var(--color-text-muted)">{{ responseTime }}ms</span>
                </div>
              </div>
              <pre style="background:#0f172a;color:#e2e8f0;padding:1.25rem;border-radius:14px;font-size:.8rem;overflow-x:auto;line-height:1.7">{{ response }}</pre>
            </div>
          </div>

          <div class="luxe-card" style="padding:1.75rem">
            <div class="form-card-title">📚 نقاط API المتاحة</div>
            <table class="erp-table">
              <thead><tr><th>الطريقة</th><th>المسار</th><th>الوصف</th><th>التوثيق</th></tr></thead>
              <tbody>
                <tr *ngFor="let api of apiEndpoints">
                  <td><span style="font-family:monospace;font-weight:700;padding:.2rem .6rem;border-radius:6px;font-size:.75rem" [style.background]="api.method==='GET'?'#f0fdf4':api.method==='POST'?'#eff6ff':api.method==='PUT'?'#fffbeb':'#fff1f2'" [style.color]="api.method==='GET'?'#16a34a':api.method==='POST'?'#2563eb':api.method==='PUT'?'#d97706':'#f43f5e'">{{ api.method }}</span></td>
                  <td style="font-family:monospace;font-size:.82rem">/api/{{ api.path }}</td>
                  <td>{{ api.description }}</td>
                  <td><button class="action-btn" title="تعيين في الاختبار" (click)="setEndpoint(api)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DevelopersPageComponent {
  method = 'GET'; endpoint = 'https://api.quantumerp.com/v1/orders'; requestBody = '';
  response = ''; responseCode = 0; responseTime = 0;
  apiEndpoints = [
    { method: 'GET', path: 'orders', description: 'الحصول على قائمة الطلبات' },
    { method: 'POST', path: 'orders/create', description: 'إنشاء طلب جديد' },
    { method: 'PUT', path: 'orders/:id', description: 'تحديث طلب موجود' },
    { method: 'DELETE', path: 'orders/:id', description: 'حذف طلب' },
    { method: 'GET', path: 'products', description: 'الحصول على قائمة المنتجات' },
    { method: 'GET', path: 'users', description: 'قائمة المستخدمين' },
    { method: 'GET', path: 'reports/monthly', description: 'التقرير الشهري' },
    { method: 'POST', path: 'auth/login', description: 'تسجيل الدخول' },
  ];
  sendRequest() {
    this.responseTime = Math.floor(Math.random() * 200 + 20);
    this.responseCode = this.method === 'DELETE' ? 204 : this.method === 'POST' ? 201 : 200;
    const mockData = this.method === 'GET' ? JSON.stringify({ success: true, data: [{ id: '1', orderNo: 'ORD-2026-0081', customer: 'شركة تك نيكسوس', total: 45600, status: 'delivered' }], meta: { total: 7, page: 1 } }, null, 2) : JSON.stringify({ success: true, message: this.method === 'DELETE' ? 'تم الحذف بنجاح' : 'تم الحفظ بنجاح', id: 'new-' + Date.now() }, null, 2);
    this.response = mockData;
  }
  setEndpoint(api: any) { this.method = api.method; this.endpoint = `https://api.quantumerp.com/v1/${api.path}`; }
}
