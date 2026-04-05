import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Activity } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-events-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>📡 سجل الأحداث (Event Log)</h1><p class="sub">تتبع جميع أحداث النظام والعمليات في الوقت الفعلي</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">🔄 تحديث</button>
          <button class="btn-luxe btn-ghost">📥 تصدير</button>
        </div>
      </header>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="search" placeholder="ابحث في الأحداث...">
        </div>
        <select [(ngModel)]="typeFilter">
          <option value="">كل الأنواع</option>
          <option value="order">الطلبات</option>
          <option value="stock">المخزون</option>
          <option value="payment">المدفوعات</option>
          <option value="user">المستخدمين</option>
          <option value="system">النظام</option>
        </select>
        <select [(ngModel)]="dateFilter">
          <option value="today">اليوم</option>
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
        </select>
      </div>

      <div class="data-table-wrap">
        <div class="table-header">
          <h3>📋 الأحداث ({{ allEvents.length }} حدث)</h3>
          <span class="live-badge" style="font-size:.75rem;font-weight:700;color:#16a34a;background:#f0fdf4;padding:.25rem .75rem;border-radius:20px">● مباشر</span>
        </div>
        <table class="erp-table">
          <thead><tr><th>النوع</th><th>الحدث</th><th>المستخدم</th><th>الوقت</th><th>القيمة</th></tr></thead>
          <tbody>
            <tr *ngFor="let e of getFiltered()">
              <td><span style="padding:.3rem .7rem;border-radius:8px;font-size:.75rem;font-weight:700;background:#f8fafc">{{ typeIcon(e.type) }} {{ typeLabel(e.type) }}</span></td>
              <td style="font-weight:700">{{ e.message }}</td>
              <td>{{ e.user }}</td>
              <td style="color:var(--color-text-muted)">{{ e.time }}</td>
              <td style="font-weight:800;color:var(--color-primary)">{{ e.amount ? ('$' + e.amount.toLocaleString()) : '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class EventsPageComponent {
  search = ''; typeFilter = ''; dateFilter = 'today';
  allEvents = [
    { id:'1', type:'order', message:'طلب جديد من شركة تك نيكسوس - ORD-2026-0087', user:'النظام', time:'منذ 5 دقائق', amount:15300 },
    { id:'2', type:'payment', message:'تم استلام دفعة من مجموعة الأفق', user:'المحاسبة', time:'منذ 15 دقيقة', amount:8900 },
    { id:'3', type:'stock', message:'إعادة تعبئة مخزون: آيفون 15 برو (+50 وحدة)', user:'مدير المستودع', time:'منذ ساعة', amount:undefined },
    { id:'4', type:'user', message:'تم إضافة مستخدم جديد: ريم العبدالله', user:'مدير النظام', time:'منذ ساعتين', amount:undefined },
    { id:'5', type:'system', message:'النسخ الاحتياطي التلقائي اكتمل بنجاح (2.4 GB)', user:'النظام', time:'منذ 3 ساعات', amount:undefined },
    { id:'6', type:'order', message:'تم تسليم الطلب ORD-2026-0081 بنجاح', user:'فريق التوصيل', time:'منذ 5 ساعات', amount:45600 },
    { id:'7', type:'stock', message:'تنبيه: مخزون شاشة استوديو منخفض جداً (8 قطع)', user:'المراقب الذكي', time:'منذ 6 ساعات', amount:undefined },
    { id:'8', type:'payment', message:'فاتورة INV-2026-0044 متأخرة عن الدفع', user:'المحاسبة', time:'أمس', amount:31500 },
  ];
  getFiltered() {
    return this.allEvents.filter(e => (!this.search || e.message.includes(this.search) || e.user.includes(this.search)) && (!this.typeFilter || e.type === this.typeFilter));
  }
  typeLabel(t: string) { const m: any = { order:'طلبات', payment:'مدفوعات', stock:'مخزون', user:'مستخدمون', system:'النظام', alert:'تنبيهات', supplier:'موردون', backup:'نسخ احتياطي' }; return m[t] || t; }
  typeIcon(t: string) { const m: any = { order:'🛒', payment:'💳', stock:'📦', user:'👤', system:'⚙️', alert:'⚠️', supplier:'🤝', backup:'💾' }; return m[t] || '📋'; }
  constructor(private data: DataMockService) {}
}
