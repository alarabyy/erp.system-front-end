import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Account { id: string; code: string; name: string; type: string; balance: number; }
interface JournalEntry { id: string; date: string; description: string; debit: number; credit: number; status: string; }

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-accounting-list',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>الإدارة المالية والمحاسبة</h1><p class="sub">شجرة الحسابات والقيود المحاسبية والتقارير المالية</p></div>
        <div class="header-actions">
          <button class="btn-luxe btn-ghost">📊 تقرير الميزانية</button>
          <button class="btn-luxe btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            قيد محاسبي جديد
          </button>
        </div>
      </header>

      <!-- Financial KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem">
        <div class="luxe-card" style="padding:1.75rem">
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.5rem">إجمالي الأصول</p>
          <h2 style="font-size:1.6rem;font-weight:800">$2.4M</h2>
          <span style="color:#16a34a;font-size:.8rem;font-weight:700">▲ 8.2% نمو</span>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.5rem">إجمالي الخصوم</p>
          <h2 style="font-size:1.6rem;font-weight:800">$840K</h2>
          <span style="color:#f43f5e;font-size:.8rem;font-weight:700">▼ 2.1%</span>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.5rem">صافي الربح</p>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--color-primary)">$1.56M</h2>
          <span style="color:#16a34a;font-size:.8rem;font-weight:700">▲ 12.4% نمو</span>
        </div>
        <div class="luxe-card" style="padding:1.75rem">
          <p style="font-size:.8rem;color:var(--color-text-muted);font-weight:600;margin-bottom:.5rem">التدفق النقدي</p>
          <h2 style="font-size:1.6rem;font-weight:800;color:#16a34a">+$320K</h2>
          <span style="color:var(--color-text-muted);font-size:.8rem;font-weight:600">هذا الشهر</span>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem">
        <!-- Journal Entries -->
        <div class="data-table-wrap">
          <div class="table-header"><h3>القيود المحاسبية الأخيرة</h3></div>
          <table class="erp-table">
            <thead><tr><th>التاريخ</th><th>الوصف</th><th>مدين</th><th>دائن</th><th>الحالة</th></tr></thead>
            <tbody>
              <tr *ngFor="let entry of journalEntries">
                <td>{{ entry.date }}</td>
                <td>{{ entry.description }}</td>
                <td style="color:#16a34a;font-weight:700">{{ entry.debit | currency:'USD':'symbol':'1.0-0' }}</td>
                <td style="color:#f43f5e;font-weight:700">{{ entry.credit | currency:'USD':'symbol':'1.0-0' }}</td>
                <td><span class="status-chip" [class]="entry.status === 'posted' ? 'active' : 'pending'">{{ entry.status === 'posted' ? 'مرحّل' : 'مسودة' }}</span></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <span class="page-info">عرض 5 من 48 قيد</span>
            <div class="page-buttons"><button class="active">1</button><button>2</button><button>←</button></div>
          </div>
        </div>

        <!-- Chart of Accounts -->
        <div class="data-table-wrap">
          <div class="table-header"><h3>شجرة الحسابات</h3></div>
          <table class="erp-table">
            <thead><tr><th>الكود</th><th>الحساب</th><th>النوع</th><th>الرصيد</th></tr></thead>
            <tbody>
              <tr *ngFor="let acc of accounts">
                <td><span style="font-family:monospace;font-weight:700;color:var(--color-primary)">{{ acc.code }}</span></td>
                <td style="font-weight:600">{{ acc.name }}</td>
                <td><span style="background:#f8fafc;padding:.25rem .6rem;border-radius:6px;font-size:.75rem;font-weight:600">{{ acc.type }}</span></td>
                <td style="font-weight:800">{{ acc.balance | currency:'USD':'symbol':'1.0-0' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AccountingListComponent {
  journalEntries: JournalEntry[] = [
    { id: '1', date: '2026-04-05', description: 'مبيعات شركة تك نيكسوس', debit: 45600, credit: 0, status: 'posted' },
    { id: '2', date: '2026-04-04', description: 'مدفوعات الموردين - مستودع', debit: 0, credit: 12400, status: 'posted' },
    { id: '3', date: '2026-04-03', description: 'رواتب الموظفين - أبريل', debit: 0, credit: 48500, status: 'draft' },
    { id: '4', date: '2026-04-02', description: 'إيجار المستودع الرئيسي', debit: 0, credit: 8500, status: 'posted' },
    { id: '5', date: '2026-04-01', description: 'استلام دفعة من مجموعة الأفق', debit: 31500, credit: 0, status: 'posted' },
  ];

  accounts: Account[] = [
    { id: '1', code: '1000', name: 'النقدية وما يعادلها', type: 'أصول', balance: 320000 },
    { id: '2', code: '1100', name: 'المدينون التجاريون', type: 'أصول', balance: 185000 },
    { id: '3', code: '1200', name: 'المخزون', type: 'أصول', balance: 1240500 },
    { id: '4', code: '2000', name: 'الدائنون التجاريون', type: 'خصوم', balance: 420000 },
    { id: '5', code: '3000', name: 'حقوق الملكية', type: 'حقوق', balance: 1560000 },
    { id: '6', code: '4000', name: 'إيرادات المبيعات', type: 'دخل', balance: 1240500 },
  ];
}
