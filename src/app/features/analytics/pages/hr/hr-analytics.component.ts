import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataMockService, Employee } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-hr-analytics',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>👥 تحليل الموارد البشرية</h1><p class="sub">الحضور والغياب، الأداء الوظيفي، والرواتب</p></div>
        <button class="btn-luxe btn-ghost" routerLink="/analytics">← لوحة التحليلات</button>
      </header>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.5rem" *ngFor="let k of kpis">
          <div style="font-size:1.5rem;margin-bottom:.5rem">{{ k.icon }}</div>
          <h2 style="font-size:1.6rem;font-weight:800" [style.color]="k.color">{{ k.value }}</h2>
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600">{{ k.label }}</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📊 معدلات الحضور بالقسم</h3>
          <apx-chart *ngIf="attendanceBar.series" [series]="attendanceBar.series" [chart]="attendanceBar.chart" [xaxis]="attendanceBar.xaxis" [yaxis]="attendanceBar.yaxis" [plotOptions]="attendanceBar.plotOptions" [colors]="attendanceBar.colors" [dataLabels]="attendanceBar.dataLabels" [grid]="attendanceBar.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">📈 اتجاه أداء الموظفين</h3>
          <apx-chart *ngIf="performanceLine.series" [series]="performanceLine.series" [chart]="performanceLine.chart" [xaxis]="performanceLine.xaxis" [yaxis]="performanceLine.yaxis" [stroke]="performanceLine.stroke" [fill]="performanceLine.fill" [colors]="performanceLine.colors" [dataLabels]="performanceLine.dataLabels" [grid]="performanceLine.grid"></apx-chart>
        </div>
      </div>
      <div class="data-table-wrap">
        <div class="table-header"><h3>أداء الموظفين الفردي</h3></div>
        <table class="erp-table">
          <thead><tr><th>الموظف</th><th>القسم</th><th>الحضور</th><th>الأداء</th><th>الراتب</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr *ngFor="let e of employees$ | async">
              <td><div class="user-avatar" style="width:32px;height:32px;font-size:.75rem;display:inline-flex;margin-left:.75rem">{{ e.name[0] }}</div>{{ e.name }}</td>
              <td>{{ e.department }}</td>
              <td>
                <div style="display:flex;align-items:center;gap:.5rem">
                  <div style="flex:1;height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden;min-width:60px"><div [style.width]="(e.attendanceRate||0)+'%'" [style.background]="(e.attendanceRate||0)>90?'#10b981':'#f59e0b'" style="height:100%;border-radius:10px"></div></div>
                  <span style="font-weight:700;font-size:.8rem">{{ e.attendanceRate }}%</span>
                </div>
              </td>
              <td>
                <div style="display:flex;align-items:center;gap:.5rem">
                  <div style="flex:1;height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden;min-width:60px"><div [style.width]="(e.performance||0)+'%'" style="height:100%;background:var(--color-primary);border-radius:10px"></div></div>
                  <span style="font-weight:700;font-size:.8rem">{{ e.performance }}%</span>
                </div>
              </td>
              <td style="font-weight:700">{{ e.salary | currency:'USD':'symbol':'1.0-0' }}</td>
              <td><span class="status-chip" [class]="e.status === 'active' ? 'active' : e.status === 'on_leave' ? 'pending' : 'cancelled'">{{ e.status === 'active' ? 'نشط' : e.status === 'on_leave' ? 'إجازة' : 'منتهي' }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HrAnalyticsComponent implements OnInit {
  employees$: Observable<Employee[]>;
  kpis = [
    { label: 'إجمالي الموظفين', value: '28', icon: '👥', color: '#0062ff' },
    { label: 'معدل الحضور', value: '94%', icon: '📅', color: '#16a34a' },
    { label: 'في إجازة', value: '3', icon: '🏖️', color: '#f59e0b' },
    { label: 'إجمالي الرواتب', value: '$52K', icon: '💰', color: '#7c3aed' },
  ];
  attendanceBar: any = {}; performanceLine: any = {};
  constructor(private data: DataMockService) { this.employees$ = this.data.getEmployees(); }
  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.attendanceBar = {
      series: [{ name: 'معدل الحضور %', data: [98, 94, 91, 96, 88] }],
      chart: { type: 'bar', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#0062ff'],
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } }, dataLabels: { enabled: true, style: { fontFamily: f, fontSize: '11px' }, formatter: (v: number) => v + '%' },
      xaxis: { categories: ['المبيعات','تقنية المعلومات','المستودعات','الموارد البشرية','المحاسبة'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } } },
      yaxis: { min: 80, max: 100, labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => v + '%' } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
    this.performanceLine = {
      series: [{ name: 'متوسط الأداء', data: [88, 86, 89, 91, 87, 92, 90, 94, 91, 93, 95, 92] }],
      chart: { type: 'area', height: 260, toolbar: { show: false }, fontFamily: f, background: 'transparent' }, colors: ['#7c3aed'],
      stroke: { curve: 'smooth', width: 2 }, fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0.02 } }, dataLabels: { enabled: false },
      xaxis: { categories: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'], labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 80, max: 100, labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => v + '%' } }, grid: { borderColor: g, strokeDashArray: 4, xaxis: { lines: { show: false } } }
    };
  }
}
