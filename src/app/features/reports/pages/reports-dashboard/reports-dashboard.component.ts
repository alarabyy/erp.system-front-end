import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart, ApexAxisChartSeries, ApexXAxis, ApexYAxis,
  ApexDataLabels, ApexStroke, ApexFill, ApexTooltip, ApexGrid,
  ApexPlotOptions, ApexLegend, ApexNonAxisChartSeries, ApexResponsive
} from 'ng-apexcharts';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-reports-dashboard',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>التقارير والتحليلات</h1><p class="sub">رؤية شاملة للأداء المالي والمبيعات والمخزون</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">📥 PDF</button>
          <button class="btn-luxe btn-ghost">📊 Excel</button>
        </div>
      </header>

      <!-- Report Type Tabs -->
      <div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <button *ngFor="let tab of tabs" class="btn-luxe" [class.btn-primary]="activeTab===tab.id" [class.btn-ghost]="activeTab!==tab.id" (click)="activeTab=tab.id">
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <!-- SALES REPORT -->
      <ng-container *ngIf="activeTab==='sales'">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
          <div class="luxe-card" style="padding:1.5rem" *ngFor="let kpi of salesKPIs">
            <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.5rem">{{ kpi.label }}</p>
            <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:.25rem" [style.color]="kpi.color">{{ kpi.value }}</h2>
            <span style="font-size:.75rem;font-weight:700" [style.color]="kpi.growthColor">{{ kpi.growth }}</span>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem">
          <div class="luxe-card" style="padding:1.75rem">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">📈 منحنى المبيعات الشهرية</h3>
            <apx-chart [series]="salesLineChart.series" [chart]="salesLineChart.chart" [xaxis]="salesLineChart.xaxis" [yaxis]="salesLineChart.yaxis" [stroke]="salesLineChart.stroke" [fill]="salesLineChart.fill" [colors]="salesLineChart.colors" [dataLabels]="salesLineChart.dataLabels" [grid]="salesLineChart.grid" [tooltip]="salesLineChart.tooltip"></apx-chart>
          </div>
          <div class="luxe-card" style="padding:1.75rem">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">🥧 مصادر الإيراد</h3>
            <apx-chart [series]="revenueSourcePie.series" [chart]="revenueSourcePie.chart" [labels]="revenueSourcePie.labels" [colors]="revenueSourcePie.colors" [plotOptions]="revenueSourcePie.plotOptions" [legend]="revenueSourcePie.legend" [responsive]="revenueSourcePie.responsive"></apx-chart>
          </div>
        </div>

        <div class="data-table-wrap">
          <div class="table-header"><h3>تفاصيل المبيعات الشهرية</h3></div>
          <table class="erp-table">
            <thead><tr><th>الشهر</th><th>الإيرادات</th><th>عدد الطلبات</th><th>متوسط الطلب</th><th>النمو</th></tr></thead>
            <tbody>
              <tr *ngFor="let row of salesReport">
                <td style="font-weight:700">{{ row.month }}</td>
                <td style="font-weight:800;color:var(--color-primary)">{{ row.revenue | currency:'USD':'symbol':'1.0-0' }}</td>
                <td>{{ row.orders }}</td>
                <td>{{ (row.revenue / row.orders) | currency:'USD':'symbol':'1.0-0' }}</td>
                <td><span [style.color]="row.growth>=0?'#16a34a':'#f43f5e'" style="font-weight:700">{{ row.growth>=0?'▲':'▼' }} {{ (row.growth < 0 ? -row.growth : row.growth) | number:'1.1-1' }}%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- INVENTORY REPORT -->
      <ng-container *ngIf="activeTab==='inventory'">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
          <div class="luxe-card" style="padding:1.75rem">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">📦 حالة المخزون</h3>
            <apx-chart [series]="stockStatusDonut.series" [chart]="stockStatusDonut.chart" [labels]="stockStatusDonut.labels" [colors]="stockStatusDonut.colors" [plotOptions]="stockStatusDonut.plotOptions" [legend]="stockStatusDonut.legend" [responsive]="stockStatusDonut.responsive"></apx-chart>
          </div>
          <div class="luxe-card" style="padding:1.75rem">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">🔄 معدل دوران المخزون</h3>
            <apx-chart [series]="inventoryTurnover.series" [chart]="inventoryTurnover.chart" [xaxis]="inventoryTurnover.xaxis" [yaxis]="inventoryTurnover.yaxis" [plotOptions]="inventoryTurnover.plotOptions" [colors]="inventoryTurnover.colors" [dataLabels]="inventoryTurnover.dataLabels" [grid]="inventoryTurnover.grid"></apx-chart>
          </div>
        </div>

        <div class="data-table-wrap">
          <div class="table-header"><h3>أداء المنتجات</h3></div>
          <table class="erp-table">
            <thead><tr><th>المنتج</th><th>الكمية الحالية</th><th>المبيعات</th><th>معدل الدوران</th><th>الحالة</th></tr></thead>
            <tbody>
              <tr *ngFor="let row of inventoryReport">
                <td style="font-weight:700">{{ row.product }}</td>
                <td>{{ row.stock }} وحدة</td>
                <td style="color:var(--color-primary);font-weight:700">{{ row.sold }} وحدة</td>
                <td>
                  <div style="display:flex;align-items:center;gap:.75rem">
                    <div style="flex:1;height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden;min-width:80px"><div [style.width]="row.turnover+'%'" style="height:100%;background:var(--color-primary);border-radius:10px"></div></div>
                    <span style="font-weight:700;font-size:.8rem">{{ row.turnover }}%</span>
                  </div>
                </td>
                <td><span class="status-chip" [class]="row.status==='In Stock'?'active':row.status==='Low Stock'?'pending':'cancelled'">{{ row.status==='In Stock'?'متوفر':row.status==='Low Stock'?'منخفض':'نفد' }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- FINANCIAL REPORT -->
      <ng-container *ngIf="activeTab==='financial'">
        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem">
          <div class="luxe-card" style="padding:1.75rem">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">💹 الأداء المالي الربعي</h3>
            <apx-chart [series]="quarterlyBar.series" [chart]="quarterlyBar.chart" [xaxis]="quarterlyBar.xaxis" [yaxis]="quarterlyBar.yaxis" [plotOptions]="quarterlyBar.plotOptions" [colors]="quarterlyBar.colors" [dataLabels]="quarterlyBar.dataLabels" [grid]="quarterlyBar.grid"></apx-chart>
          </div>
          <div class="luxe-card" style="padding:1.75rem">
            <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">📋 قائمة الدخل</h3>
            <div class="detail-row" *ngFor="let item of incomeStatement">
              <span class="d-label">{{ item.label }}</span>
              <span class="d-value" [style.color]="item.type==='income'?'#16a34a':'#f43f5e'" style="font-weight:800">{{ item.value | currency:'USD':'symbol':'1.0-0' }}</span>
            </div>
            <div class="detail-row" style="border-top:2px solid var(--color-primary);margin-top:.5rem;padding-top:1rem">
              <span class="d-label" style="font-weight:800;color:#0f172a">صافي الربح</span>
              <span class="d-value" style="font-size:1.2rem;font-weight:800;color:var(--color-primary)">$440,500</span>
            </div>
            <div style="margin-top:1.5rem;padding:1rem;background:#f0fdf4;border-radius:14px;text-align:center">
              <p style="font-size:.8rem;font-weight:700;color:#16a34a">هامش الربح الصافي</p>
              <h2 style="font-size:2rem;font-weight:800;color:#16a34a">35.5%</h2>
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
          <div class="luxe-card" style="padding:1.5rem;text-align:center" *ngFor="let kpi of financialKPIs">
            <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.5rem">{{ kpi.label }}</p>
            <h2 style="font-size:1.5rem;font-weight:800;color:var(--color-primary)">{{ kpi.value }}</h2>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class ReportsDashboardPageComponent implements OnInit {
  activeTab: 'sales' | 'inventory' | 'financial' = 'sales';
  tabs: { id: 'sales' | 'inventory' | 'financial', label: string, icon: string }[] = [
    { id: 'sales', label: 'تقرير المبيعات', icon: '📈' },
    { id: 'inventory', label: 'تقرير المخزون', icon: '📦' },
    { id: 'financial', label: 'التقرير المالي', icon: '💰' },
  ];

  // ── Chart options ──
  salesLineChart: any = {};
  revenueSourcePie: any = {};
  stockStatusDonut: any = {};
  inventoryTurnover: any = {};
  quarterlyBar: any = {};

  salesKPIs = [
    { label: 'إجمالي الإيرادات', value: '$1.24M', color: '#0062ff', growth: '▲ 8.2% من الربع الماضي', growthColor: '#16a34a' },
    { label: 'إجمالي الطلبات', value: '316', color: '#7c3aed', growth: '▲ 12.4% نمو', growthColor: '#16a34a' },
    { label: 'متوسط قيمة الطلب', value: '$3,924', color: '#0284c7', growth: '▲ 5.1% تحسن', growthColor: '#16a34a' },
    { label: 'معدل إلغاء الطلبات', value: '3.2%', color: '#f43f5e', growth: '▼ 0.8% تحسن', growthColor: '#16a34a' },
  ];

  salesReport = [
    { month: 'يناير 2026', revenue: 98400, orders: 62, growth: 10.2 },
    { month: 'فبراير 2026', revenue: 112000, orders: 78, growth: 13.8 },
    { month: 'مارس 2026', revenue: 134500, orders: 92, growth: 20.1 },
    { month: 'أبريل 2026', revenue: 124000, orders: 84, growth: -7.8 },
  ];

  inventoryReport = [
    { product: 'لابتوب ماك بوك M3', stock: 45, sold: 120, turnover: 73, status: 'In Stock' },
    { product: 'آيفون 15 برو تيتانيوم', stock: 120, sold: 340, turnover: 92, status: 'In Stock' },
    { product: 'شاشة استوديو نانو', stock: 8, sold: 25, turnover: 28, status: 'Low Stock' },
    { product: 'سماعات إيربودز ماكس', stock: 0, sold: 45, turnover: 100, status: 'Out of Stock' },
    { product: 'آيباد برو OLED', stock: 65, sold: 88, turnover: 58, status: 'In Stock' },
  ];

  incomeStatement = [
    { label: 'إيرادات المبيعات', value: 1240500, type: 'income' },
    { label: 'تكلفة البضاعة المباعة', value: 620000, type: 'expense' },
    { label: 'مجمل الربح', value: 620500, type: 'income' },
    { label: 'المصاريف التشغيلية', value: 180000, type: 'expense' },
  ];

  financialKPIs = [
    { label: 'هامش الربح الصافي', value: '35.5%' },
    { label: 'العائد على الأصول', value: '18.3%' },
    { label: 'نسبة السيولة', value: '2.4x' },
    { label: 'أيام استيفاء المدينين', value: '28 يوم' },
  ];

  ngOnInit() {
    const fontFamily = 'Cairo, sans-serif';
    const gridBorder = '#f1f5f9';

    this.salesLineChart = {
      series: [
        { name: 'الإيرادات', data: [98400, 112000, 134500, 124000, 145000, 162000, 138000, 158000, 172000, 145000, 168000, 189000] },
        { name: 'الهدف', data: [95000, 105000, 125000, 115000, 135000, 155000, 130000, 150000, 165000, 140000, 160000, 180000] }
      ],
      chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily },
      colors: ['#0062ff', '#e2e8f0'],
      stroke: { curve: 'smooth', width: [2, 2], dashArray: [0, 6] },
      fill: { type: ['gradient', 'solid'], gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        labels: { style: { fontFamily, fontSize: '10px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false }
      },
      yaxis: { labels: { style: { fontFamily, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v / 1000).toFixed(0) + 'K' } },
      grid: { borderColor: gridBorder, strokeDashArray: 4, xaxis: { lines: { show: false } } },
      tooltip: { theme: 'light', style: { fontFamily }, y: { formatter: (v: number) => '$' + v.toLocaleString() } }
    };

    this.revenueSourcePie = {
      series: [45, 28, 18, 9],
      chart: { type: 'donut', height: 280, fontFamily },
      labels: ['مبيعات مباشرة', 'مبيعات إلكترونية', 'موزعون', 'أخرى'],
      colors: ['#0062ff', '#7c3aed', '#10b981', '#f59e0b'],
      plotOptions: { pie: { donut: { size: '65%', labels: { show: true, total: { show: true, label: 'الإجمالي', fontFamily, formatter: () => '$1.24M' } } } } },
      legend: { position: 'bottom', fontFamily, fontSize: '11px', markers: { size: 7 } },
      responsive: [{ breakpoint: 480, options: { chart: { height: 220 } } }]
    };

    this.stockStatusDonut = {
      series: [68, 22, 10],
      chart: { type: 'donut', height: 280, fontFamily },
      labels: ['متوفر ✅', 'منخفض ⚠️', 'نفد ❌'],
      colors: ['#10b981', '#f59e0b', '#f43f5e'],
      plotOptions: { pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'إجمالي الأصناف', fontFamily, formatter: () => '148 صنف' } } } } },
      legend: { position: 'bottom', fontFamily, fontSize: '11px', markers: { size: 7 } },
      responsive: [{ breakpoint: 480, options: { chart: { height: 220 } } }]
    };

    this.inventoryTurnover = {
      series: [{ name: 'معدل الدوران %', data: [92, 73, 58, 45, 28] }],
      chart: { type: 'bar', height: 280, toolbar: { show: false }, fontFamily },
      colors: ['#0062ff'],
      plotOptions: { bar: { borderRadius: 8, horizontal: true, barHeight: '55%' } },
      dataLabels: { enabled: true, style: { fontFamily, fontSize: '11px' }, formatter: (v: number) => v + '%' },
      xaxis: {
        categories: ['آيفون 15 برو', 'ماك بوك M3', 'آيباد برو', 'AirPods ماكس', 'شاشة ستوديو'],
        labels: { style: { fontFamily, fontSize: '10px', colors: '#94a3b8' } }
      },
      yaxis: { labels: { style: { fontFamily, fontSize: '10px', colors: '#475569' } } },
      grid: { borderColor: gridBorder, strokeDashArray: 4 }
    };

    this.quarterlyBar = {
      series: [
        { name: 'الإيرادات', data: [344900, 421500, 389000, 485100] },
        { name: 'المصروفات', data: [205000, 248000, 232000, 290000] }
      ],
      chart: { type: 'bar', height: 280, toolbar: { show: false }, fontFamily },
      colors: ['#0062ff', '#f1f5f9'],
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%', grouped: true } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع'],
        labels: { style: { fontFamily, fontSize: '11px', colors: '#94a3b8' } }
      },
      yaxis: { labels: { style: { fontFamily, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v / 1000).toFixed(0) + 'K' } },
      grid: { borderColor: gridBorder, strokeDashArray: 4 }
    };
  }
}
