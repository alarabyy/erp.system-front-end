import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataMockService, Lead, Opportunity } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, NgApexchartsModule],
  selector: 'app-crm-analytics',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>❤️ تحليل إدارة العملاء (CRM)</h1><p class="sub">قمع المبيعات، تحويل العملاء، والفرص المتاحة</p></div>
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
        <!-- Funnel Chart (Simulated with horizontal bars) -->
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.5rem">🔥 قمع المبيعات (Sales Funnel)</h3>
          <apx-chart *ngIf="funnelChart.series" [series]="funnelChart.series" [chart]="funnelChart.chart" [plotOptions]="funnelChart.plotOptions" [xaxis]="funnelChart.xaxis" [yaxis]="funnelChart.yaxis" [colors]="funnelChart.colors" [dataLabels]="funnelChart.dataLabels" [grid]="funnelChart.grid"></apx-chart>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <h3 style="font-size:1rem;font-weight:800;margin-bottom:1.25rem">🥧 حالة العملاء المحتملين</h3>
          <apx-chart *ngIf="leadStatusPie.series" [series]="leadStatusPie.series" [chart]="leadStatusPie.chart" [labels]="leadStatusPie.labels" [colors]="leadStatusPie.colors" [plotOptions]="leadStatusPie.plotOptions" [legend]="leadStatusPie.legend" [responsive]="leadStatusPie.responsive"></apx-chart>
        </div>
      </div>
      <div class="data-table-wrap">
        <div class="table-header"><h3>الفرص النشطة</h3></div>
        <table class="erp-table">
          <thead><tr><th>الفرصة</th><th>العميل</th><th>القيمة</th><th>المرحلة</th><th>الاحتمالية</th><th>تاريخ الإغلاق</th></tr></thead>
          <tbody>
            <tr *ngFor="let o of opportunities$ | async">
              <td style="font-weight:700">{{ o.title }}</td>
              <td>{{ o.customer }}</td>
              <td style="font-weight:800;color:var(--color-primary)">{{ o.value | currency:'USD':'symbol':'1.0-0' }}</td>
              <td><span class="status-chip" [class]="stageClass(o.stage)">{{ stageLabel(o.stage) }}</span></td>
              <td>
                <div style="display:flex;align-items:center;gap:.5rem">
                  <div style="flex:1;height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden;min-width:60px"><div [style.width]="o.probability+'%'" [style.background]="o.probability>=70?'#16a34a':o.probability>=40?'#f59e0b':'#f43f5e'" style="height:100%;border-radius:10px"></div></div>
                  <span style="font-weight:700;font-size:.8rem">{{ o.probability }}%</span>
                </div>
              </td>
              <td>{{ o.closeDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CrmAnalyticsComponent implements OnInit {
  opportunities$: Observable<Opportunity[]>;
  kpis = [
    { label: 'إجمالي العملاء المحتملين', value: '48', icon: '👥', color: '#0062ff' },
    { label: 'معدل التحويل', value: '68%', icon: '🎯', color: '#16a34a' },
    { label: 'قيمة الفرص النشطة', value: '$625K', icon: '💰', color: '#7c3aed' },
    { label: 'عملاء خُسروا', value: '8%', icon: '📉', color: '#f43f5e' },
  ];
  funnelChart: any = {}; leadStatusPie: any = {};
  constructor(private data: DataMockService) { this.opportunities$ = this.data.getOpportunities(); }
  stageLabel(s: string) { const m: any = { discovery: 'اكتشاف', proposal: 'عرض', negotiation: 'تفاوض', closed_won: 'مُغلقة-ربح', closed_lost: 'مُغلقة-خسارة' }; return m[s] || s; }
  stageClass(s: string) { const m: any = { discovery: 'new', proposal: 'pending', negotiation: 'qualified', closed_won: 'won', closed_lost: 'lost' }; return m[s] || ''; }
  ngOnInit() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    this.funnelChart = {
      series: [{ name: 'العملاء', data: [120, 86, 54, 32, 18, 48] }],
      chart: { type: 'bar', height: 280, toolbar: { show: false }, fontFamily: f, background: 'transparent' },
      plotOptions: { bar: { borderRadius: 6, horizontal: true, barHeight: '70%', distributed: true } },
      colors: ['#0062ff','#2563eb','#4f46e5','#7c3aed','#a855f7','#10b981'],
      dataLabels: { enabled: true, style: { fontFamily: f, fontSize: '11px', colors: ['#fff'] }, formatter: (v: number) => v + ' عميل' },
      xaxis: { categories: ['إجمالي العملاء','تم التواصل','مؤهلون','تم تقديم عرض','تفاوض','إغلاق بنجاح'], labels: { style: { fontFamily: f, fontSize: '11px', colors: '#94a3b8' } } },
      yaxis: { labels: { style: { fontFamily: f, fontSize: '11px', colors: '#475569' } } }, grid: { borderColor: g, strokeDashArray: 4 }
    };
    this.leadStatusPie = {
      series: [20, 15, 12, 8, 33, 12], labels: ['جديد 🆕','تم التواصل 📞','مؤهل ✅','عرض مقدم 📄','رُبح 🏆','خُسر ❌'],
      chart: { type: 'pie', height: 280, fontFamily: f, background: 'transparent' },
      colors: ['#64748b','#0062ff','#10b981','#7c3aed','#16a34a','#f43f5e'],
      plotOptions: { pie: { dataLabels: { offset: -5 } } },
      legend: { position: 'bottom', fontFamily: f, fontSize: '10px', markers: { size: 7 } }, responsive: [{ breakpoint: 480, options: { chart: { height: 220 } } }]
    };
  }
}
