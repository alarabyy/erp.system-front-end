import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { DataMockService, Statistics } from '../../../../core/services/data-mock.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule, FormsModule],
  selector: 'app-analytics-overview',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>📊 لوحة التحليلات الشاملة</h1><p class="sub">نظرة شاملة على أداء الشركة بالأرقام والمؤشرات</p></div>
        <div class="header-actions">
          <select class="erp-select" style="width:auto;padding:.6rem 2rem .6rem 1rem" [(ngModel)]="period" (change)="onPeriodChange()">
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="quarter">هذا الربع</option>
            <option value="year">هذه السنة</option>
          </select>
          <button class="btn-luxe btn-ghost">📥 تصدير التقرير</button>
        </div>
      </header>

      <!-- Quick Navigation -->
      <div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <a *ngFor="let nav of navLinks" [routerLink]="nav.path" class="btn-luxe btn-ghost" style="font-size:.82rem">{{ nav.icon }} {{ nav.label }}</a>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.75rem" *ngFor="let kpi of kpis">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem">
            <div style="font-size:1.75rem">{{ kpi.icon }}</div>
            <span style="font-size:.75rem;font-weight:700;padding:.25rem .6rem;border-radius:20px" [style.background]="kpi.growthPositive?'#f0fdf4':'#fff1f2'" [style.color]="kpi.growthPositive?'#16a34a':'#f43f5e'">{{ kpi.growthPositive?'▲':'▼' }} {{ kpi.growth }}</span>
          </div>
          <h2 style="font-size:1.75rem;font-weight:800;margin-bottom:.3rem" [style.color]="kpi.color">{{ kpi.value }}</h2>
          <p style="font-size:.82rem;color:var(--color-text-muted);font-weight:600">{{ kpi.label }}</p>
        </div>
      </div>

      <!-- Main Charts -->
      <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📈 الإيرادات عبر الزمن ({{ period === 'year' ? '12 شهر' : period === 'month' ? '30 يوم' : '7 أيام' }})</h3>
          <apx-chart [series]="revenueChart.series" [chart]="revenueChart.chart" [xaxis]="revenueChart.xaxis" [yaxis]="revenueChart.yaxis" [stroke]="revenueChart.stroke" [fill]="revenueChart.fill" [colors]="revenueChart.colors" [dataLabels]="revenueChart.dataLabels" [grid]="revenueChart.grid" [tooltip]="revenueChart.tooltip"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🥧 توزيع المبيعات بالفئات</h3>
          <apx-chart [series]="categoryPie.series" [chart]="categoryPie.chart" [labels]="categoryPie.labels" [colors]="categoryPie.colors" [plotOptions]="categoryPie.plotOptions" [legend]="categoryPie.legend" [responsive]="categoryPie.responsive"></apx-chart>
        </div>
      </div>

      <!-- Secondary Charts -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📊 المشتريات مقابل المبيعات</h3>
          <apx-chart [series]="salesVsPurchases.series" [chart]="salesVsPurchases.chart" [xaxis]="salesVsPurchases.xaxis" [yaxis]="salesVsPurchases.yaxis" [plotOptions]="salesVsPurchases.plotOptions" [colors]="salesVsPurchases.colors" [dataLabels]="salesVsPurchases.dataLabels" [grid]="salesVsPurchases.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📉 اتجاه الأرباح</h3>
          <apx-chart [series]="profitTrend.series" [chart]="profitTrend.chart" [xaxis]="profitTrend.xaxis" [yaxis]="profitTrend.yaxis" [stroke]="profitTrend.stroke" [fill]="profitTrend.fill" [colors]="profitTrend.colors" [dataLabels]="profitTrend.dataLabels" [grid]="profitTrend.grid" [annotations]="profitTrend.annotations"></apx-chart>
        </div>
      </div>

      <!-- Analytics Sub Pages -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div *ngFor="let card of analyticsCards" class="luxe-card" style="padding:1.5rem;cursor:pointer;transition:var(--transition-smooth)" [routerLink]="card.path">
          <div style="font-size:2rem;margin-bottom:.75rem">{{ card.icon }}</div>
          <h3 style="font-size:.95rem;font-weight:800;margin-bottom:.4rem">{{ card.label }}</h3>
          <p style="font-size:.78rem;color:var(--color-text-muted);font-weight:500;margin-bottom:1rem">{{ card.description }}</p>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:1.25rem;font-weight:800" [style.color]="card.color">{{ card.value }}</span>
            <span style="color:var(--color-primary);font-size:.8rem;font-weight:700">عرض ←</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsOverviewComponent implements OnInit {
  period = 'month';

  navLinks = [
    { path: '/analytics/sales', icon: '📈', label: 'تحليل المبيعات' },
    { path: '/analytics/inventory', icon: '📦', label: 'تحليل المخزون' },
    { path: '/analytics/financial', icon: '💰', label: 'التحليل المالي' },
    { path: '/analytics/hr', icon: '👥', label: 'تحليل HR' },
    { path: '/analytics/crm', icon: '❤️', label: 'تحليل CRM' },
    { path: '/analytics/system', icon: '⚙️', label: 'تحليل النظام' },
    { path: '/analytics/custom-reports', icon: '🎨', label: 'تقارير مخصصة' },
  ];

  kpis = [
    { label: 'إجمالي الإيرادات', value: '$1.24M', icon: '💰', color: '#0062ff', growth: '12.4%', growthPositive: true },
    { label: 'صافي الربح', value: '$440K', icon: '📈', color: '#16a34a', growth: '8.2%', growthPositive: true },
    { label: 'معدل النمو', value: '14.2%', icon: '🚀', color: '#7c3aed', growth: '2.1%', growthPositive: true },
    { label: 'إجمالي الطلبات', value: '316', icon: '🛒', color: '#0284c7', growth: '5.4%', growthPositive: false },
  ];

  analyticsCards = [
    { path: '/analytics/sales', icon: '📈', label: 'تحليل المبيعات', description: 'أفضل المنتجات والعملاء والمناطق', color: '#0062ff', value: '$1.24M' },
    { path: '/analytics/inventory', icon: '📦', label: 'تحليل المخزون', description: 'المنتجات البطيئة والسريعة', color: '#f59e0b', value: '148 صنف' },
    { path: '/analytics/financial', icon: '💰', label: 'التحليل المالي', description: 'الأرباح والخسائر والتدفق النقدي', color: '#16a34a', value: '35.5%' },
    { path: '/analytics/hr', icon: '👥', label: 'تحليل HR', description: 'الحضور والأداء والرواتب', color: '#7c3aed', value: '94%' },
    { path: '/analytics/crm', icon: '❤️', label: 'تحليل CRM', description: 'تحويل العملاء والفرص', color: '#f43f5e', value: '68%' },
    { path: '/analytics/system', icon: '⚙️', label: 'تحليل النظام', description: 'الاستخدام والأخطاء والأداء', color: '#64748b', value: '99.7%' },
    { path: '/analytics/custom-reports', icon: '🎨', label: 'تقارير مخصصة', description: 'ابنِ تقاريرك الخاصة', color: '#0062ff', value: '🔥 جديد' },
    { path: '/reports', icon: '📊', label: 'كل التقارير', description: 'عرض جميع التقارير الجاهزة', color: '#475569', value: 'عرض' },
  ];

  revenueChart: any = {};
  categoryPie: any = {};
  salesVsPurchases: any = {};
  profitTrend: any = {};

  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.revenueChart = {
      series: [{ name: 'الإيرادات', data: [98400, 112000, 134500, 124000, 145000, 162000, 138000, 158000, 172000, 145000, 168000, 189000] }],
      chart: { type: 'area', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff'],
      stroke: { curve: 'smooth', width: 2 }, fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0.02 } }, dataLabels: { enabled: false },
      xaxis: { categories: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } },
      grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } },
      tooltip: { theme: 'light', style: { fontFamily: f }, y: { formatter: (v: number) => '$' + v.toLocaleString() } }
    };
    this.categoryPie = {
      series: [35, 28, 18, 12, 7], labels: ['هواتف محمولة','أجهزة كمبيوتر','إكسسوارات','أجهزة لوحية','أخرى'],
      chart: { type: 'pie', height: 260, fontFamily: f, background: 'transparent' },
      colors: ['#0062ff','#7c3aed','#10b981','#f59e0b','#f43f5e'],
      plotOptions: { pie: { dataLabels: { offset: -5 } } },
      legend: { position: 'bottom', fontFamily: f, fontSize: '11px', markers: { size: 7 } },
      responsive: [{ breakpoint: 480, options: { chart: { height: 220 } } }]
    };
    this.salesVsPurchases = {
      series: [{ name: 'المبيعات', data: [145, 132, 162, 148, 175, 192] }, { name: 'المشتريات', data: [98, 87, 108, 96, 118, 124] }],
      chart: { type: 'bar', height: 240, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff','#e2e8f0'],
      plotOptions: { bar: { borderRadius: 6, columnWidth: '60%' } }, dataLabels: { enabled: false },
      xaxis: { categories: ['نوفمبر','ديسمبر','يناير','فبراير','مارس','أبريل'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } },
      grid: { borderColor: g, strokeDashArray: 4 }
    };
    this.profitTrend = {
      series: [{ name: 'الربح', data: [38000, 45000, 52000, 48000, 61000, 58000, 73000, 68000, 82000, 75000, 91000, 89000] }],
      chart: { type: 'area', height: 240, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#10b981'],
      stroke: { curve: 'smooth', width: 2 }, fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.02 } }, dataLabels: { enabled: false },
      xaxis: { categories: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } },
      grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } },
      annotations: { yaxis: [{ y: 60000, borderColor: '#0062ff', strokeDashArray: 4, label: { text: 'الهدف: $60K', style: { fontFamily: f, background: '#fff', color: '#0062ff' } } }] }
    };
  }

  onPeriodChange() { this.ngOnInit(); }
}
