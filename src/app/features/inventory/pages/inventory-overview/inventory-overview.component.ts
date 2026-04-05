import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductCatalogComponent } from '../../../products/components/product-catalog/product-catalog.component';
import { DataMockService, Product } from '../../../../core/services/data-mock.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCatalogComponent, NgApexchartsModule],
  selector: 'app-inventory-overview-page',
  templateUrl: './inventory-overview.component.html',
  styleUrls: ['./inventory-overview.component.scss']
})
export class InventoryOverviewPageComponent implements OnInit {
  readonly products$: Observable<Product[]>;

  // Charts
  stockStatusChart: any = {};
  stockMovementChart: any = {};

  stats = [
    { label: 'إجمالي الأصناف', value: '148', icon: '📦', color: '#0062ff', bg: '#eff6ff' },
    { label: 'متوفر بالكامل', value: '98', icon: '✅', color: '#16a34a', bg: '#f0fdf4' },
    { label: 'مخزون منخفض', value: '32', icon: '⚠️', color: '#d97706', bg: '#fffbeb' },
    { label: 'نفد المخزون', value: '18', icon: '❌', color: '#f43f5e', bg: '#fff1f2' },
    { label: 'إجمالي القيمة', value: '$1.24M', icon: '💰', color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'أصناف جديدة الشهر', value: '12', icon: '🆕', color: '#0284c7', bg: '#f0f9ff' },
  ];

  constructor(private readonly dataService: DataMockService) {
    this.products$ = this.dataService.getProducts();
  }

  ngOnInit() {
    const fontFamily = 'Cairo, sans-serif';

    this.stockStatusChart = {
      series: [98, 32, 18],
      chart: { type: 'donut', height: 260, fontFamily, background: 'transparent', toolbar: { show: false } },
      labels: ['متوفر ✅', 'منخفض ⚠️', 'نفد ❌'],
      colors: ['#10b981', '#f59e0b', '#f43f5e'],
      plotOptions: {
        pie: { donut: { size: '72%', labels: { show: true, name: { fontFamily, fontSize: '13px' }, value: { fontFamily, fontSize: '22px', fontWeight: '800' }, total: { show: true, label: 'الأصناف', fontFamily, fontSize: '12px', formatter: () => '148' } } } }
      },
      legend: { position: 'bottom', fontFamily, fontSize: '12px', markers: { size: 8 } },
      responsive: [{ breakpoint: 480, options: { chart: { height: 200 } } }]
    };

    this.stockMovementChart = {
      series: [
        { name: 'وارد', data: [42, 38, 55, 48, 62, 71, 58, 44, 67, 73, 59, 82] },
        { name: 'صادر (مبيعات)', data: [35, 29, 48, 41, 55, 63, 49, 38, 58, 64, 51, 74] }
      ],
      chart: { type: 'bar', height: 260, toolbar: { show: false }, fontFamily, background: 'transparent' },
      colors: ['#0062ff', '#10b981'],
      plotOptions: { bar: { borderRadius: 6, columnWidth: '60%' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        labels: { style: { fontFamily, fontSize: '10px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false }
      },
      yaxis: { labels: { style: { fontFamily, fontSize: '10px', colors: '#94a3b8' } } },
      grid: { borderColor: '#f1f5f9', strokeDashArray: 4, xaxis: { lines: { show: false } } },
      legend: { position: 'top', fontFamily, fontSize: '12px', markers: { size: 7 } },
      tooltip: { theme: 'light', style: { fontFamily } }
    };
  }
}
