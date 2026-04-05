import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-system-analytics',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>⚙️ تحليل النظام</h1><p class="sub">استخدام النظام، الأخطاء، وأداء الخوادم في الوقت الحقيقي</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/analytics">← لوحة التحليلات</button>
      </header>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem" *ngFor="let k of kpis">
          <div style="font-size:1.5rem;margin-bottom:.5rem">{{ k.icon }}</div>
          <h2 style="font-size:1.6rem;font-weight:800" [style.color]="k.color">{{ k.value }}</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600">{{ k.label }}</p>
          <div style="height:4px;background:#f1f5f9;border-radius:10px;margin-top:.75rem;overflow:hidden"><div [style.width]="k.pct" [style.background]="k.color" style="height:100%;border-radius:10px"></div></div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📈 استخدام النظام (المستخدمون النشطون)</h3>
          <apx-chart *ngIf="usageChart.series" [series]="usageChart.series" [chart]="usageChart.chart" [xaxis]="usageChart.xaxis" [yaxis]="usageChart.yaxis" [stroke]="usageChart.stroke" [fill]="usageChart.fill" [colors]="usageChart.colors" [dataLabels]="usageChart.dataLabels" [grid]="usageChart.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🔴 الأخطاء والتحذيرات</h3>
          <apx-chart *ngIf="errorsChart.series" [series]="errorsChart.series" [chart]="errorsChart.chart" [xaxis]="errorsChart.xaxis" [yaxis]="errorsChart.yaxis" [plotOptions]="errorsChart.plotOptions" [colors]="errorsChart.colors" [dataLabels]="errorsChart.dataLabels" [grid]="errorsChart.grid"></apx-chart>
        </div>
      </div>
      <div class="data-table-wrap">
        <div class="table-header"><h3>⚡ سجل الطلبات الأخيرة (API Requests)</h3></div>
        <table class="erp-table">
          <thead><tr><th>الطريقة</th><th>المسار</th><th>الاستجابة</th><th>الوقت</th><th>المستخدم</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr *ngFor="let r of apiLogs">
              <td><span style="background:#eff6ff;color:#2563eb;padding:.25rem .6rem;border-radius:6px;font-weight:700;font-size:.75rem;font-family:monospace">{{ r.method }}</span></td>
              <td style="font-family:monospace;font-size:.82rem">{{ r.path }}</td>
              <td style="font-family:monospace;font-weight:700" [style.color]="r.code<400?'#16a34a':'#f43f5e'">{{ r.code }}</td>
              <td style="color:var(--color-text-muted)">{{ r.time }}</td>
              <td>{{ r.user }}</td>
              <td><span class="status-chip" [class]="r.code < 400 ? 'active' : 'cancelled'">{{ r.code < 400 ? '✅ نجاح' : '❌ خطأ' }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SystemAnalyticsComponent implements OnInit {
  kpis = [
    { label: 'وقت التشغيل (Uptime)', value: '99.97%', icon: '🟢', color: '#16a34a', pct: '99.97%' },
    { label: 'المستخدمون النشطون', value: '18', icon: '👤', color: '#0062ff', pct: '65%' },
    { label: 'طلبات API اليوم', value: '4,821', icon: '⚡', color: '#7c3aed', pct: '48%' },
    { label: 'أخطاء النظام', value: '3', icon: '🔴', color: '#f43f5e', pct: '3%' },
  ];
  apiLogs = [
    { method: 'GET', path: '/api/orders', code: 200, time: '45ms', user: 'أحمد الرشيد' },
    { method: 'POST', path: '/api/orders/create', code: 201, time: '89ms', user: 'سارة الخليل' },
    { method: 'PUT', path: '/api/products/7', code: 200, time: '62ms', user: 'محمد التركي' },
    { method: 'DELETE', path: '/api/users/9', code: 403, time: '12ms', user: 'مجهول' },
    { method: 'GET', path: '/api/reports/monthly', code: 200, time: '234ms', user: 'نورة السالم' },
    { method: 'POST', path: '/api/auth/login', code: 401, time: '8ms', user: 'مجهول' },
  ];
  usageChart: any = {}; errorsChart: any = {};
  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.usageChart = {
      series: [
        { name: 'المستخدمون النشطون', data: [4, 8, 12, 18, 22, 28, 24, 20, 15, 12, 9, 6, 8, 14, 18, 22, 26, 28, 24,19,16,12,8,5] },
        { name: 'الطلبات (×100)', data: [2, 4, 6, 9, 12, 15, 13, 10, 8, 7, 5, 3, 4, 7, 9, 11, 14, 16, 13, 10, 8, 6, 4, 2] }
      ],
      chart: { type: 'area', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#e2e8f0'],
      stroke: { curve: 'smooth', width: [2, 2] }, fill: { type: 'gradient', gradient: { opacityFrom: [0.35, 0.1], opacityTo: [0.02, 0] } }, dataLabels: { enabled: false },
      xaxis: { categories: Array.from({length:24}, (_, i) => i + ':00'), labels: { style: { fontFamily: f, fontSize: '9px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } }, grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } }
    };
    this.errorsChart = {
      series: [{ name: 'أخطاء', data: [0, 1, 0, 0, 2, 0, 1, 3, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0] }],
      chart: { type: 'bar', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#f43f5e'],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } }, dataLabels: { enabled: false },
      xaxis: { categories: Array.from({length:24}, (_, i) => i + ':00'), labels: { style: { fontFamily: f, fontSize: '8px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
  }
}
