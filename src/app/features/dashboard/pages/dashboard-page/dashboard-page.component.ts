import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataMockService, Statistics, Activity, Product } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

import {
  ApexChart, ApexAxisChartSeries, ApexXAxis, ApexDataLabels,
  ApexStroke, ApexFill, ApexTooltip, ApexGrid, ApexYAxis,
  ApexPlotOptions, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  colors: string[];
};

export type DonutOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

export type BarOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  colors: string[];
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
};

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  stats$: Observable<Statistics>;
  activities$: Observable<Activity[]>;
  products$: Observable<Product[]>;

  // Revenue Area Chart
  revenueChart!: ChartOptions;
  // Orders Donut Chart
  ordersDonut!: DonutOptions;
  // Top Products Bar Chart
  topProductsBar!: BarOptions;

  constructor(private data: DataMockService) {
    this.stats$ = this.data.getDashboardStats();
    this.activities$ = this.data.getActivities();
    this.products$ = this.data.getProducts();
  }

  ngOnInit(): void {
    this.initRevenueChart();
    this.initOrdersDonut();
    this.initTopProductsBar();
  }

  initRevenueChart() {
    this.revenueChart = {
      series: [
        {
          name: 'الإيرادات',
          data: [42000, 58000, 71000, 63000, 89000, 95000, 112000, 98000, 124000, 134000, 119000, 148000]
        },
        {
          name: 'المصروفات',
          data: [28000, 35000, 42000, 38000, 51000, 56000, 63000, 58000, 72000, 79000, 68000, 85000]
        }
      ],
      chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily: 'Cairo, sans-serif', background: 'transparent' },
      colors: ['#0062ff', '#a855f7'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        labels: { style: { fontFamily: 'Cairo, sans-serif', fontSize: '11px', colors: '#94a3b8' } },
        axisBorder: { show: false }, axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          style: { fontFamily: 'Cairo, sans-serif', fontSize: '11px', colors: '#94a3b8' },
          formatter: (val) => '$' + (val / 1000).toFixed(0) + 'K'
        }
      },
      grid: { borderColor: '#f1f5f9', strokeDashArray: 4, xaxis: { lines: { show: false } } },
      tooltip: { theme: 'light', style: { fontFamily: 'Cairo, sans-serif' }, y: { formatter: (val) => '$' + val.toLocaleString() } }
    };
  }

  initOrdersDonut() {
    this.ordersDonut = {
      series: [44, 22, 18, 16],
      chart: { type: 'donut', height: 280, fontFamily: 'Cairo, sans-serif', background: 'transparent' },
      labels: ['مسلّم ✅', 'قيد المعالجة 🔄', 'مشحون 🚚', 'ملغي ❌'],
      colors: ['#10b981', '#0062ff', '#7c3aed', '#f43f5e'],
      plotOptions: {
        pie: {
          donut: { size: '70%', labels: { show: true, name: { fontFamily: 'Cairo, sans-serif', fontSize: '13px' }, value: { fontFamily: 'Cairo, sans-serif', fontSize: '20px', fontWeight: '800', formatter: (val) => val + '%' }, total: { show: true, label: 'إجمالي', fontFamily: 'Cairo, sans-serif', fontSize: '13px', formatter: () => '100%' } } }
        }
      },
      legend: { position: 'bottom', fontFamily: 'Cairo, sans-serif', fontSize: '12px', markers: { size: 8 } },
      responsive: [{ breakpoint: 480, options: { chart: { height: 240 } } }]
    };
  }

  initTopProductsBar() {
    this.topProductsBar = {
      series: [{ name: 'المبيعات', data: [340, 280, 195, 168, 142] }],
      chart: { type: 'bar', height: 220, toolbar: { show: false }, fontFamily: 'Cairo, sans-serif', background: 'transparent' },
      colors: ['#0062ff'],
      plotOptions: { bar: { borderRadius: 8, horizontal: true, barHeight: '60%', distributed: false } },
      dataLabels: { enabled: true, style: { fontFamily: 'Cairo, sans-serif', fontSize: '11px' }, formatter: (val) => val + ' وحدة' },
      xaxis: {
        categories: ['آيفون 15 برو', 'ماك بوك برو M3', 'آيباد برو', 'سماعات AirPods', 'شاشة Studio'],
        labels: { style: { fontFamily: 'Cairo, sans-serif', fontSize: '11px', colors: '#94a3b8' } }
      },
      yaxis: { labels: { style: { fontFamily: 'Cairo, sans-serif', fontSize: '11px', colors: '#475569' } } },
      grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
    };
  }

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = { order: '🛒', stock: '📦', alert: '⚠️', payment: '💳', user: '👤', supplier: '🤝' };
    return icons[type] || '📋';
  }
}
