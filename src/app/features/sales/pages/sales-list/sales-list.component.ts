import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, SalesOrder } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-sales-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div>
          <h1>💼 كشف البيعات والطلبات</h1>
          <p class="sub">عندنا {{ (orders$ | async)?.length }} بيعة مسجلة في السيستم حالياً</p>
        </div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost" (click)="onExport('PDF')">📥 طلع ملف PDF</button>
          <button class="btn-luxe btn-ghost" (click)="onExport('Excel')">📊 شيت إكسيل</button>
          <button class="btn-luxe btn-primary" routerLink="/sales/create">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             سجل بيعة جديدة
          </button>
        </div>
      </header>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="searchTerm" placeholder="دور بالاسم أو رقم الفاتورة...">
        </div>
        <select [(ngModel)]="filterStatus">
          <option value="">كل الحالات</option>
          <option value="pending">طلبات لسه</option>
          <option value="processing">جاري التجهيز</option>
          <option value="shipped">طلعت للشحن</option>
          <option value="delivered">وصلت للزبون</option>
        </select>
        <select [(ngModel)]="filterPayment">
          <option value="">حالة الكاش</option>
          <option value="paid">دفع كله</option>
          <option value="partial">دفع جزء</option>
          <option value="unpaid">لسه مدفعش</option>
        </select>
      </div>

      <div class="data-table-wrap" *ngIf="orders$ | async as orders">
        <div class="table-header">
          <h3>البيعات ({{ getFiltered(orders).length }})</h3>
        </div>
        <table class="erp-table">
          <thead><tr>
            <th>رقم الفاتورة</th><th>الزبون</th><th>التاريخ</th><th>الإجمالي</th><th>قطع</th><th>الحالة</th><th>الكاش</th><th>إجراءات</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let order of getFiltered(orders)">
              <td><strong style="color:var(--color-primary)">{{ order.orderNo }}</strong></td>
              <td>{{ order.customer }}</td>
              <td>{{ order.date }}</td>
              <td><strong>{{ order.total | currency:'USD' }}</strong></td>
              <td>{{ order.items }}</td>
              <td><span class="status-chip" [class]="order.status">{{ getStatusLabel(order.status) }}</span></td>
              <td><span class="status-chip" [class]="getPaymentClass(order.paymentStatus)">{{ getPaymentLabel(order.paymentStatus) }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn success" (click)="onView(order)" title="أفتح التفاصيل">👁️</button>
                  <button class="action-btn" (click)="onPrint(order)" title="اطبع فاتورة">🖨️</button>
                  <button class="action-btn danger" (click)="onDelete(order)" title="إلغاء/حذف">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SalesListComponent {
  orders$: Observable<SalesOrder[]>;
  searchTerm = '';
  filterStatus = '';
  filterPayment = '';

  constructor(private data: DataMockService) {
    this.orders$ = this.data.getSalesOrders();
  }

  getFiltered(orders: SalesOrder[]): SalesOrder[] {
    return orders.filter(o =>
      (!this.searchTerm || o.orderNo.toLowerCase().includes(this.searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.filterStatus || o.status === this.filterStatus) &&
      (!this.filterPayment || o.paymentStatus === this.filterPayment)
    );
  }

  getStatusLabel(status: string): string {
    const m: Record<string, string> = { pending: 'لسه', processing: 'تجهيز', shipped: 'اتشحنت', delivered: 'وصلت' };
    return m[status] || status;
  }

  getPaymentLabel(status: string): string {
    const m: Record<string, string> = { paid: 'خالص', partial: 'جزء', unpaid: 'عليه فلوس' };
    return m[status] || status;
  }

  getPaymentClass(status: string): string {
    const m: Record<string, string> = { paid: 'delivered', partial: 'pending', unpaid: 'cancelled' };
    return m[status] || '';
  }

  onView(order: SalesOrder) { alert(`تفاصيل الفاتورة: ${order.orderNo}`); }
  onPrint(order: SalesOrder) { alert(`بدأ الطباعة للفاتورة: ${order.orderNo}`); }
  onDelete(order: SalesOrder) { if(confirm(`هتلغي البيعة دي ${order.orderNo}؟`)) alert('اتلغت خلاص!'); }
  onExport(type: string) { alert(`جاري تحضير ${type}...`); }
}
