import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-financial-analytics',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>💰 التحليل المالي</h1><p class="sub">الأرباح والخسائر، تفصيل المصاريف، والتدفق النقدي</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/analytics">← لوحة التحليلات</button>
      </header>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem" *ngFor="let k of kpis">
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.4rem">{{ k.label }}</p>
          <h2 style="font-size:1.6rem;font-weight:800" [style.color]="k.color">{{ k.value }}</h2>
          <span style="font-size:.75rem;font-weight:700" [style.color]="k.growthP?'#16a34a':'#f43f5e'">{{ k.growthP?'▲':'▼' }} {{ k.growth }}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📉 اتجاه الأرباح والخسائر السنوي</h3>
          <apx-chart *ngIf="plChart.series" [series]="plChart.series" [chart]="plChart.chart" [xaxis]="plChart.xaxis" [yaxis]="plChart.yaxis" [stroke]="plChart.stroke" [fill]="plChart.fill" [colors]="plChart.colors" [dataLabels]="plChart.dataLabels" [grid]="plChart.grid" [tooltip]="plChart.tooltip"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🥧 تفصيل المصاريف</h3>
          <apx-chart *ngIf="expensePie.series" [series]="expensePie.series" [chart]="expensePie.chart" [labels]="expensePie.labels" [colors]="expensePie.colors" [plotOptions]="expensePie.plotOptions" [legend]="expensePie.legend" [responsive]="expensePie.responsive"></apx-chart>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📊 الإيرادات الربعية</h3>
          <apx-chart *ngIf="quarterlyRevenue.series" [series]="quarterlyRevenue.series" [chart]="quarterlyRevenue.chart" [xaxis]="quarterlyRevenue.xaxis" [yaxis]="quarterlyRevenue.yaxis" [plotOptions]="quarterlyRevenue.plotOptions" [colors]="quarterlyRevenue.colors" [dataLabels]="quarterlyRevenue.dataLabels" [grid]="quarterlyRevenue.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📋 المؤشرات المالية الرئيسية</h3>
          <div class="detail-row" *ngFor="let kpi of financialKPIs">
            <span class="d-label">{{ kpi.label }}</span>
            <span class="d-value" style="font-weight:800" [style.color]="kpi.color">{{ kpi.value }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FinancialAnalyticsComponent implements OnInit {
  kpis = [
    { label: 'إجمالي الإيرادات', value: '$1.24M', color: '#0062ff', growth: '12.4%', growthP: true },
    { label: 'إجمالي المصاريف', value: '$800K', color: '#f43f5e', growth: '8.1%', growthP: false },
    { label: 'صافي الربح', value: '$440K', color: '#16a34a', growth: '18.2%', growthP: true },
    { label: 'هامش الربح', value: '35.5%', color: '#7c3aed', growth: '2.3%', growthP: true },
  ];
  financialKPIs = [
    { label: 'العائد على الأصول', value: '18.3%', color: '#16a34a' },
    { label: 'نسبة السيولة', value: '2.4x', color: '#0062ff' },
    { label: 'أيام المدينين', value: '28 يوم', color: '#f59e0b' },
    { label: 'الدين إلى حقوق الملكية', value: '0.54', color: '#7c3aed' },
    { label: 'التدفق النقدي الحر', value: '$320K', color: '#16a34a' },
  ];
  plChart: any = {}; expensePie: any = {}; quarterlyRevenue: any = {};
  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.plChart = {
      series: [{ name: 'الإيرادات', data: [98400,112000,134500,124000,145000,162000,138000,158000,172000,145000,168000,189000] }, { name: 'المصاريف', data: [65000,74000,88000,82000,96000,105000,90000,103000,112000,95000,109000,122000] }, { name: 'الربح', data: [33400,38000,46500,42000,49000,57000,48000,55000,60000,50000,59000,67000] }],
      chart: { type: 'area', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#f43f5e','#10b981'],
      stroke: { curve: 'smooth', width: [2, 2, 2] }, fill: { type: 'gradient', gradient: { opacityFrom: 0.25, opacityTo: 0.02 } }, dataLabels: { enabled: false },
      xaxis: { categories: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } }, grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } },
      tooltip: { theme: 'light', style: { fontFamily: f }, y: { formatter: (v: number) => '$' + v.toLocaleString() } }
    };
    this.expensePie = {
      series: [35, 25, 18, 12, 10], labels: ['الرواتب والمكافآت','المشتريات','الإيجارات','التسويق','أخرى'],
      chart: { type: 'donut', height: 260, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#7c3aed','#f59e0b','#10b981','#f43f5e'],
      plotOptions: { pie: { donut: { size: '68%', labels: { show: true, total: { show: true, label: 'إجمالي المصاريف', fontFamily: f, formatter: () => '$800K' } } } } },
      legend: { position: 'bottom', fontFamily: f, fontSize: '10px', markers: { size: 7 } }, responsive: [{ breakpoint: 480, options: { chart: { height: 200 } } }]
    };
    this.quarterlyRevenue = {
      series: [{ name: 'الإيرادات', data: [344900,421500,389000,485100] }, { name: 'الربح', data: [118000,148000,134000,170000] }],
      chart: { type: 'bar', height: 240, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#10b981'],
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } }, dataLabels: { enabled: false },
      xaxis: { categories: ['الربع الأول','الربع الثاني','الربع الثالث','الربع الرابع'], labels: { style: { fontFamily: f, fontSize: '11px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
  }
}
