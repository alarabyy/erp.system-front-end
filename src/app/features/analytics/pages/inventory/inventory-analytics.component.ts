import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-inventory-analytics',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>📦 تحليل المخزون</h1><p class="sub">مستويات المخزون، المنتجات السريعة والبطيئة، والمخزون الميت</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/analytics">← لوحة التحليلات</button>
      </header>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem;border-top:3px solid" *ngFor="let k of kpis" [style.borderColor]="k.color">
          <div style="font-size:1.5rem;margin-bottom:.5rem">{{ k.icon }}</div>
          <h2 style="font-size:1.6rem;font-weight:800" [style.color]="k.color">{{ k.value }}</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);margin-top:.25rem;font-weight:600">{{ k.label }}</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📊 مستويات المخزون بالفئات</h3>
          <apx-chart *ngIf="stockLevels.series" [series]="stockLevels.series" [chart]="stockLevels.chart" [xaxis]="stockLevels.xaxis" [yaxis]="stockLevels.yaxis" [plotOptions]="stockLevels.plotOptions" [colors]="stockLevels.colors" [dataLabels]="stockLevels.dataLabels" [grid]="stockLevels.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🥧 توزيع المنتجات بالفئة</h3>
          <apx-chart *ngIf="categoryDist.series" [series]="categoryDist.series" [chart]="categoryDist.chart" [labels]="categoryDist.labels" [colors]="categoryDist.colors" [plotOptions]="categoryDist.plotOptions" [legend]="categoryDist.legend" [responsive]="categoryDist.responsive"></apx-chart>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🔄 دوران المخزون (معدل شهري)</h3>
          <apx-chart *ngIf="turnoverBar.series" [series]="turnoverBar.series" [chart]="turnoverBar.chart" [xaxis]="turnoverBar.xaxis" [yaxis]="turnoverBar.yaxis" [stroke]="turnoverBar.stroke" [fill]="turnoverBar.fill" [colors]="turnoverBar.colors" [dataLabels]="turnoverBar.dataLabels" [grid]="turnoverBar.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">⚠️ تنبيهات المخزون</h3>
          <div style="display:flex;flex-direction:column;gap:1rem">
            <div *ngFor="let a of alerts" style="display:flex;align-items:center;gap:1rem;padding:.875rem;background:#fafafa;border-radius:14px;border-right:3px solid" [style.borderColor]="a.color">
              <span style="font-size:1.25rem">{{ a.icon }}</span>
              <div style="flex:1">
                <p style="font-weight:700;font-size:.88rem;margin:0">{{ a.product }}</p>
                <p style="font-size:.75rem;color:var(--color-text-muted);margin:.1rem 0 0;font-weight:600">{{ a.msg }}</p>
              </div>
              <span style="font-size:.9rem;font-weight:800" [style.color]="a.color">{{ a.stock }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InventoryAnalyticsComponent implements OnInit {
  kpis = [
    { label: 'إجمالي الأصناف', value: '148', icon: '📦', color: '#0062ff' },
    { label: 'بضاعة سريعة بيع', value: '48', icon: '🚀', color: '#16a34a' },
    { label: 'بضاعة بطيئة (ميتة)', value: '12', icon: '🐢', color: '#f59e0b' },
    { label: 'قيمة المخزون', value: '$1.24M', icon: '💰', color: '#7c3aed' },
  ];
  alerts = [
    { product: 'شاشة استوديو نانو', msg: 'مخزون منخفض جداً', stock: '8 قطع', color: '#f59e0b', icon: '⚠️' },
    { product: 'سماعات إيربودز ماكس', msg: 'نفد المخزون', stock: '0 قطع', color: '#f43f5e', icon: '❌' },
    { product: 'ماوس ماجيك 3', msg: 'نفد المخزون', stock: '0 قطع', color: '#f43f5e', icon: '❌' },
    { product: 'ساعة آبل الترا 2', msg: 'مخزون منخفض', stock: '12 قطعة', color: '#f59e0b', icon: '⚠️' },
  ];
  stockLevels: any = {}; categoryDist: any = {}; turnoverBar: any = {};
  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.stockLevels = {
      series: [{ name: 'المتوفر', data: [45, 120, 8, 0, 65, 210, 12, 0] }],
      chart: { type: 'bar', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' },
      colors: ['#0062ff'], plotOptions: { bar: { borderRadius: 6, columnWidth: '60%',
        colors: { ranges: [{ from: 0, to: 0, color: '#f43f5e' }, { from: 1, to: 15, color: '#f59e0b' }] } } },
      dataLabels: { enabled: true, style: { fontFamily: f, fontSize: '10px' } },
      xaxis: { categories: ['ماك بوك','آيفون','شاشة','إيربودز','آيباد','لوحة مفاتيح','ساعة','ماوس'], labels: { style: { fontFamily: f, fontSize: '9px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
    this.categoryDist = {
      series: [32, 28, 18, 12, 10], labels: ['هواتف محمولة','أجهزة كمبيوتر','إكسسوارات','شاشات','أخرى'],
      chart: { type: 'donut', height: 260, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#7c3aed','#10b981','#f59e0b','#f43f5e'],
      plotOptions: { pie: { donut: { size: '68%', labels: { show: true, total: { show: true, label: 'الأصناف', fontFamily: f } } } } },
      legend: { position: 'bottom', fontFamily: f, fontSize: '10px', markers: { size: 7 } }, responsive: [{ breakpoint: 480, options: { chart: { height: 200 } } }]
    };
    this.turnoverBar = {
      series: [{ name: 'معدل الدوران %', data: [92, 73, 28, 0, 58, 88, 45, 0] }],
      chart: { type: 'area', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#10b981'],
      stroke: { curve: 'smooth', width: 2 }, fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.02 } }, dataLabels: { enabled: false },
      xaxis: { categories: ['آيفون','ماك بوك','شاشة','إيربودز','آيباد','لوحة','ساعة','ماوس'], labels: { style: { fontFamily: f, fontSize: '9px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => v + '%' } }, grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } }
    };
  }
}
