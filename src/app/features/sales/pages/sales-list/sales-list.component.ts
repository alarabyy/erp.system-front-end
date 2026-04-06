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
  templateUrl: './sales-list.html',
  styleUrls: ['./sales-list.scss'],
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
