import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataMockService, Activity, Product } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ApexChart, ApexAxisChartSeries, ApexXAxis, ApexDataLabels,
  ApexStroke, ApexFill, ApexTooltip, ApexGrid, ApexYAxis,
  ApexPlotOptions, ApexLegend, ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = { series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; stroke: ApexStroke; fill: ApexFill; tooltip: ApexTooltip; dataLabels: ApexDataLabels; grid: ApexGrid; yaxis: ApexYAxis; colors: string[]; };
export type DonutOptions = { series: ApexNonAxisChartSeries; chart: ApexChart; labels: string[]; colors: string[]; legend: ApexLegend; plotOptions: ApexPlotOptions; responsive: ApexResponsive[]; };
export type BarOptions = { series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; yaxis: ApexYAxis; plotOptions: ApexPlotOptions; colors: string[]; dataLabels: ApexDataLabels; grid: ApexGrid; };

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  stats$: Observable<any>;
  activities$: Observable<Activity[]>;
  products$: Observable<Product[]>;

  revenueChart!: ChartOptions;
  ordersDonut!: DonutOptions;
  topProductsBar!: BarOptions;

  today = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private data: DataMockService) {
    this.stats$ = this.data.getStats();
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
        { name: 'الإيرادات', data: [420, 580, 710, 630, 890, 950, 1120, 980, 1240, 1340, 1190, 1480] },
        { name: 'المصروفات', data: [280, 350, 420, 380, 510, 560, 630, 580, 720, 790, 680, 850] }
      ],
      chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily: 'Cairo', background: 'transparent' },
      colors: ['#0062ff', '#a855f7'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        labels: { style: { fontFamily: 'Cairo', fontSize: '11px', colors: '#94a3b8' } },
        axisBorder: { show: false }, axisTicks: { show: false }
      },
      yaxis: { labels: { style: { fontFamily: 'Cairo', fontSize: '11px', colors: '#94a3b8' }, formatter: (val) => '$' + val + 'K' } },
      grid: { borderColor: '#f1f5f9', strokeDashArray: 4, xaxis: { lines: { show: false } } },
      tooltip: { theme: 'light', style: { fontFamily: 'Cairo' } }
    };
  }

  initOrdersDonut() {
    this.ordersDonut = {
      series: [44, 22, 18, 16],
      chart: { type: 'donut', height: 280, fontFamily: 'Cairo', background: 'transparent' },
      labels: ['مسلّم ✅', 'معالجة 🔄', 'مشحون 🚚', 'ملغي ❌'],
      colors: ['#10b981', '#0062ff', '#7c3aed', '#f43f5e'],
      plotOptions: {
        pie: {
          donut: { size: '70%', labels: { show: true, name: { fontFamily: 'Cairo', fontSize: '13px' }, value: { fontFamily: 'Cairo', fontSize: '20px', fontWeight: '800', formatter: (val) => val + '%' }, total: { show: true, label: 'إجمالي', fontFamily: 'Cairo', fontSize: '13px', formatter: () => '100%' } } }
        }
      },
      legend: { position: 'bottom', fontFamily: 'Cairo', fontSize: '12px' },
      responsive: [{ breakpoint: 480, options: { chart: { height: 240 } } }]
    };
  }

  initTopProductsBar() {
    this.topProductsBar = {
      series: [{ name: 'المبيعات', data: [840, 720, 615, 468, 342] }],
      chart: { type: 'bar', height: 220, toolbar: { show: false }, fontFamily: 'Cairo', background: 'transparent' },
      colors: ['#0062ff'],
      plotOptions: { bar: { borderRadius: 8, horizontal: true, barHeight: '55%' } },
      dataLabels: { enabled: true, style: { fontFamily: 'Cairo', fontSize: '11px' }, formatter: (val) => val + ' وحدة' },
      xaxis: {
        categories: ['آيفون 15 بروميوم', 'سامسونج S24 ألترا', 'ماك بوك برو M3', 'شاشة LG OLED', 'سماعات سوني'],
        labels: { style: { fontFamily: 'Cairo', fontSize: '11px', colors: '#94a3b8' } }
      },
      yaxis: { labels: { style: { fontFamily: 'Cairo', fontSize: '11px', colors: '#475569' } } },
      grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
    };
  }

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = { order: '🛒', stock: '📦', system: '⚙️', user: '👤' };
    return icons[type] || '📋';
  }

  handleAction(action: string) {}
}
