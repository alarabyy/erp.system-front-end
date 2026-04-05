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
          <h1>قائمة الطلبات والمبيعات</h1>
          <p class="sub">إدارة جميع طلبات البيع والفواتير والمدفوعات</p>
        </div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">📥 تصدير PDF</button>
          <button class="btn-luxe btn-ghost">📊 تصدير Excel</button>
          <button class="btn-luxe btn-primary" routerLink="/sales/create">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            إنشاء طلب جديد
          </button>
        </div>
      </header>

      <div class="filter-bar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input [(ngModel)]="searchTerm" placeholder="ابحث برقم الطلب أو اسم العميل...">
        </div>
        <select [(ngModel)]="filterStatus">
          <option value="">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="confirmed">مؤكد</option>
          <option value="shipped">مشحون</option>
          <option value="delivered">مسلّم</option>
          <option value="cancelled">ملغي</option>
        </select>
        <select [(ngModel)]="filterPayment">
          <option value="">كل الدفعات</option>
          <option value="paid">مدفوع</option>
          <option value="partial">جزئي</option>
          <option value="unpaid">غير مدفوع</option>
        </select>
      </div>

      <div class="data-table-wrap" *ngIf="orders$ | async as orders">
        <div class="table-header">
          <h3>الطلبات ({{ getFiltered(orders).length }})</h3>
        </div>
        <table class="erp-table">
          <thead><tr>
            <th>رقم الطلب</th><th>العميل</th><th>التاريخ</th><th>القيمة</th><th>عدد الأصناف</th><th>حالة الطلب</th><th>الدفع</th><th>إجراءات</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let order of getFiltered(orders)">
              <td><strong style="color:var(--color-primary)">{{ order.orderNo }}</strong></td>
              <td>{{ order.customer }}</td>
              <td>{{ order.date }}</td>
              <td><strong>{{ order.total | currency:'USD':'symbol':'1.0-0' }}</strong></td>
              <td>{{ order.items }} صنف</td>
              <td><span class="status-chip" [class]="order.status">{{ getStatusLabel(order.status) }}</span></td>
              <td><span class="status-chip" [class]="getPaymentClass(order.paymentStatus)">{{ getPaymentLabel(order.paymentStatus) }}</span></td>
              <td>
                <div class="row-actions">
                  <button class="action-btn success" [routerLink]="['/sales/edit', order.id]" title="عرض/تعديل">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button class="action-btn" title="طباعة فاتورة">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  </button>
                  <button class="action-btn danger" title="حذف">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <span class="page-info">عرض {{ getFiltered(orders).length }} من {{ orders.length }} طلب</span>
          <div class="page-buttons"><button class="active">1</button><button>2</button><button>←</button></div>
        </div>
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
      (!this.searchTerm || o.orderNo.includes(this.searchTerm) || o.customer.includes(this.searchTerm)) &&
      (!this.filterStatus || o.status === this.filterStatus) &&
      (!this.filterPayment || o.paymentStatus === this.filterPayment)
    );
  }

  getStatusLabel(status: string): string {
    const m: Record<string, string> = { pending: 'قيد الانتظار', confirmed: 'مؤكد', shipped: 'مشحون', delivered: 'مسلّم', cancelled: 'ملغي' };
    return m[status] || status;
  }

  getPaymentLabel(status: string): string {
    const m: Record<string, string> = { paid: 'مدفوع', partial: 'جزئي', unpaid: 'غير مدفوع' };
    return m[status] || status;
  }

  getPaymentClass(status: string): string {
    const m: Record<string, string> = { paid: 'delivered', partial: 'pending', unpaid: 'cancelled' };
    return m[status] || '';
  }
}
