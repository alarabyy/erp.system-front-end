import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, FormsModule, NgApexchartsModule],
  selector: 'app-custom-reports',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🎨 منشئ التقارير المخصصة</h1><p class="sub">أنشئ تقاريرك الخاصة بحسب احتياجاتك من البيانات والمخططات</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost" (click)="resetReport()">🔄 إعادة تعيين</button>
          <button class="btn-luxe btn-primary" (click)="generateReport()">⚡ توليد التقرير</button>
        </div>
      </header>

      <div style="display:grid;grid-template-columns:300px 1fr;gap:1.5rem;align-items:start">
        <!-- Configuration Panel -->
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          <div class="luxe-card" style="padding:1.5rem">
            <div class="form-card-title" style="margin-bottom:1.25rem">📋 اختر المصدر</div>
            <div class="form-group"><label>مصدر البيانات</label>
              <select class="erp-input erp-select" [(ngModel)]="config.source">
                <option value="sales">المبيعات</option><option value="inventory">المخزون</option>
                <option value="hr">الموارد البشرية</option><option value="crm">إدارة العملاء</option>
                <option value="financial">المالية</option>
              </select>
            </div>
            <div class="form-group" style="margin-top:1rem"><label>نوع المخطط</label>
              <select class="erp-input erp-select" [(ngModel)]="config.chartType">
                <option value="bar">شريطي (Bar)</option><option value="line">خطي (Line)</option>
                <option value="area">مساحي (Area)</option><option value="pie">دائري (Pie)</option>
                <option value="donut">حلقي (Donut)</option>
              </select>
            </div>
            <div class="form-group" style="margin-top:1rem"><label>الفترة الزمنية</label>
              <select class="erp-input erp-select" [(ngModel)]="config.period">
                <option value="week">أسبوع</option><option value="month">شهر</option>
                <option value="quarter">ربع</option><option value="year">سنة</option>
              </select>
            </div>
          </div>

          <div class="luxe-card" style="padding:1.5rem">
            <div class="form-card-title" style="margin-bottom:1.25rem">🔧 الحقول</div>
            <div *ngFor="let field of getFields()" style="display:flex;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:1px solid #f1f5f9">
              <input type="checkbox" [id]="field.key" [(ngModel)]="field.selected" style="width:16px;height:16px;cursor:pointer">
              <label [for]="field.key" style="font-size:.85rem;font-weight:600;cursor:pointer">{{ field.label }}</label>
            </div>
          </div>

          <div class="luxe-card" style="padding:1.5rem">
            <div class="form-card-title" style="margin-bottom:1.25rem">🔍 الفلاتر</div>
            <div class="form-group"><label>من تاريخ</label><input class="erp-input" type="date" [(ngModel)]="config.dateFrom"></div>
            <div class="form-group" style="margin-top:1rem"><label>إلى تاريخ</label><input class="erp-input" type="date" [(ngModel)]="config.dateTo"></div>
          </div>

          <div style="display:flex;flex-direction:column;gap:.75rem">
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">📥 تصدير PDF</button>
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">📊 تصدير Excel</button>
            <button class="btn-luxe btn-ghost" style="width:100%;justify-content:center">💾 حفظ كتقرير محفوظ</button>
          </div>
        </div>

        <!-- Report Preview -->
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div *ngIf="reportGenerated" class="luxe-card" style="padding:1.75rem">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem">
              <div>
                <h3 style="font-size:1.1rem;font-weight:800">📊 معاينة التقرير</h3>
                <p style="font-size:.8rem;color:var(--color-text-muted);margin-top:.2rem">مصدر: {{ sourceLabel() }} | نوع: {{ config.chartType }} | فترة: {{ config.period }}</p>
              </div>
              <span class="status-chip active">✅ جاهز</span>
            </div>
            <apx-chart *ngIf="previewChart.series" [series]="previewChart.series" [chart]="previewChart.chart" [labels]="previewChart.labels" [xaxis]="previewChart.xaxis" [yaxis]="previewChart.yaxis" [plotOptions]="previewChart.plotOptions" [colors]="previewChart.colors" [stroke]="previewChart.stroke" [fill]="previewChart.fill" [dataLabels]="previewChart.dataLabels" [grid]="previewChart.grid" [legend]="previewChart.legend" [responsive]="previewChart.responsive"></apx-chart>
          </div>

          <div *ngIf="!reportGenerated" class="luxe-card empty-state">
            <div class="es-icon">📊</div>
            <h3>أنشئ تقريرك</h3>
            <p>اختر مصدر البيانات، نوع المخطط، والحقول من اللوحة اليسرى، ثم اضغط "توليد التقرير"</p>
            <button class="btn-luxe btn-primary" (click)="generateReport()">⚡ توليد الآن</button>
          </div>

          <div *ngIf="reportGenerated" class="data-table-wrap">
            <div class="table-header"><h3>📋 البيانات الجدولية</h3></div>
            <table class="erp-table">
              <thead><tr><th *ngFor="let col of getSelectedFields()">{{ col.label }}</th></tr></thead>
              <tbody>
                <tr *ngFor="let row of tableData">
                  <td *ngFor="let col of getSelectedFields()" style="font-weight:col.key==='value'?800:400">{{ row[col.key] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CustomReportsComponent {
  reportGenerated = false;
  previewChart: any = {};
  tableData: any[] = [];

  config = {
    source: 'sales', chartType: 'bar', period: 'month',
    dateFrom: '2026-04-01', dateTo: '2026-04-30'
  };

  private salesFields = [
    { key: 'period', label: 'الفترة', selected: true },
    { key: 'revenue', label: 'الإيرادات', selected: true },
    { key: 'orders', label: 'عدد الطلبات', selected: true },
    { key: 'customer', label: 'العميل', selected: false },
    { key: 'region', label: 'المنطقة', selected: false },
  ];

  private inventoryFields = [
    { key: 'product', label: 'المنتج', selected: true },
    { key: 'stock', label: 'المخزون', selected: true },
    { key: 'value', label: 'القيمة', selected: true },
    { key: 'category', label: 'الفئة', selected: false },
  ];

  getFields() {
    return this.config.source === 'sales' ? this.salesFields : this.inventoryFields;
  }

  getSelectedFields() { return this.getFields().filter(f => f.selected); }

  sourceLabel() {
    const m: any = { sales: 'المبيعات', inventory: 'المخزون', hr: 'الموارد البشرية', crm: 'إدارة العملاء', financial: 'المالية' };
    return m[this.config.source] || this.config.source;
  }

  generateReport() {
    const f = 'Cairo, sans-serif'; const g = '#f1f5f9';
    const isAxisChart = ['bar','line','area'].includes(this.config.chartType);

    if (isAxisChart) {
      const cats = this.config.period === 'month' ? ['الأسبوع 1','الأسبوع 2','الأسبوع 3','الأسبوع 4'] : ['يناير','فبراير','مارس','أبريل','مايو','يونيو'];
      const data = cats.map(() => Math.floor(Math.random()* 100000 + 50000));
      this.previewChart = {
        series: [{ name: this.sourceLabel(), data }], labels: undefined,
        chart: { type: this.config.chartType, height: 320, toolbar: { show: false }, fontFamily: f, background: 'transparent' },
        colors: ['#0062ff'], plotOptions: { bar: { borderRadius: 8, columnWidth: '60%' } },
        stroke: { curve: 'smooth', width: 2 }, fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0.02 } },
        dataLabels: { enabled: false }, xaxis: { categories: cats, labels: { style: { fontFamily: f, fontSize: '11px', colors: '#94a3b8' } } },
        yaxis: { labels: { style: { fontFamily: f, fontSize: '10px', colors: '#94a3b8' }, formatter: (v: number) => '$' + (v/1000).toFixed(0) + 'K' } },
        grid: { borderColor: g, strokeDashArray: 4 }, legend: undefined, responsive: undefined
      };
      this.tableData = cats.map((c, i) => ({ period: c, revenue: '$' + (data[i]/1000).toFixed(0) + 'K', orders: Math.floor(data[i]/3000), customer: '-', region: '-' }));
    } else {
      const labels = ['الرياض','جدة','دبي','أبوظبي','الكويت'];
      const dataPie = [32, 24, 18, 15, 11];
      this.previewChart = {
        series: dataPie, labels, chart: { type: this.config.chartType, height: 320, fontFamily: f, background: 'transparent' },
        colors: ['#0062ff','#7c3aed','#10b981','#f59e0b','#f43f5e'],
        plotOptions: { pie: { donut: { size: '68%', labels: { show: true, total: { show: true, fontFamily: f } } } } },
        legend: { position: 'bottom', fontFamily: f, fontSize: '11px', markers: { size: 7 } }, responsive: [{ breakpoint: 480, options: { chart: { height: 240 } } }],
        xaxis: undefined, yaxis: undefined, stroke: undefined, fill: undefined, dataLabels: { enabled: true }, grid: undefined
      };
      this.tableData = labels.map((l, i) => ({ period: l, revenue: dataPie[i] + '%', orders: '-', customer: '-', region: l }));
    }
    this.reportGenerated = true;
  }

  resetReport() { this.reportGenerated = false; this.previewChart = {}; }
}
