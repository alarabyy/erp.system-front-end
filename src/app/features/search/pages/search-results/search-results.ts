import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DataMockService, Product, User, SalesOrder } from '../../../../core/services/data-mock.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-search-results',
  template: `
    <div class="erp-page animate-fade-in search-results-page">
      <div class="search-hero luxe-card">
        <div class="hero-content">
          <h1>🔍 نتائج البحث عن: <span class="gradient-text">"{{ query }}"</span></h1>
          <p>وجدنا {{ totalResults }} نتيجة مطابقة في كافة أقسام النظام</p>
        </div>
        <div class="search-filter-tabs">
          <button *ngFor="let tab of tabs" 
                  class="filter-tab" 
                  [class.active]="activeTab === tab.id"
                  (click)="activeTab = tab.id">
            {{ tab.label }}
            <span class="count-badge">{{ tab.count }}</span>
          </button>
        </div>
      </div>

      <div class="results-layout">
        <div class="results-container" [ngSwitch]="activeTab">
          
          <div *ngSwitchCase="'products'" class="grid-results animate-slide-up">
            <div *ngFor="let p of filteredProducts" class="result-item-card luxe-card">
              <div class="item-icon product">📦</div>
              <div class="item-details">
                <span class="item-category">المخزون</span>
                <h3>{{ p.name }}</h3>
                <div class="item-meta">
                  <span>SKU: {{ p.sku }}</span>
                  <span class="price">{{ p.price | currency:'USD' }}</span>
                </div>
              </div>
              <button class="btn-luxe btn-ghost btn-sm" [routerLink]="['/inventory']">عرض</button>
            </div>
          </div>

          <div *ngSwitchCase="'users'" class="grid-results animate-slide-up">
            <div *ngFor="let u of filteredUsers" class="result-item-card luxe-card">
              <div class="item-icon user">{{ u.avatar }}</div>
              <div class="item-details">
                <span class="item-category">الموظفين</span>
                <h3>{{ u.name }}</h3>
                <div class="item-meta">
                  <span>{{ u.role }}</span>
                  <span>{{ u.department }}</span>
                </div>
              </div>
              <button class="btn-luxe btn-ghost btn-sm" [routerLink]="['/users']">الملف</button>
            </div>
          </div>

          <div *ngSwitchCase="'orders'" class="list-results animate-slide-up">
            <div *ngFor="let o of filteredOrders" class="result-list-item luxe-card">
              <div class="item-icon-circle order">🛒</div>
              <div class="item-content">
                <div class="top-row">
                  <span class="order-no">{{ o.orderNo }}</span>
                  <span class="status-badge" [class]="o.status">{{ o.status }}</span>
                </div>
                <h3>{{ o.customer }}</h3>
                <div class="bottom-row">
                  <span>{{ o.date }}</span>
                  <span class="amount">{{ o.total | currency:'USD' }}</span>
                </div>
              </div>
              <button class="btn-luxe btn-primary btn-sm" [routerLink]="['/sales']">التفاصيل</button>
            </div>
          </div>

          <div *ngSwitchCase="'all'" class="all-results-mix">
             <div class="mix-info">يرجى اختيار قسم محدد من الأعلى لعرض النتائج بدقة أكثر</div>
          </div>

        </div>

        <div *ngIf="totalResults === 0" class="empty-results luxe-card">
          <div class="empty-icon">🏜️</div>
          <h2>عذراً، لم نجد أي نتائج لـ "{{ query }}"</h2>
          <p>جرّب كلمات بحث أخرى أو تأكد من القسم الصحيح</p>
          <button class="btn-luxe btn-primary" (click)="goBack()">العودة للوحة القيادة</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-results-page { padding-bottom: 4rem; }
    .search-hero { padding: 3rem; margin-bottom: 2rem; background: linear-gradient(135deg, white 0%, #f8fafc 100%); border: 1.5px solid var(--color-border); }
    .hero-content h1 { font-size: 2.25rem; font-weight: 900; color: #0f172a; margin-bottom: .5rem; }
    .hero-content p { color: #64748b; font-weight: 600; font-size: 1.1rem; }
    
    .search-filter-tabs { display: flex; gap: 1rem; margin-top: 2.5rem; border-top: 1px solid #f1f5f9; padding-top: 2rem; }
    .filter-tab { background: white; border: 1.5px solid #f1f5f9; padding: .8rem 1.5rem; border-radius: 14px; cursor: pointer; color: #64748b; font-weight: 700; display: flex; align-items: center; gap: .75rem; transition: all .3s; font-family: 'Cairo'; }
    .filter-tab:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .filter-tab.active { background: var(--color-primary); color: white; border-color: var(--color-primary); box-shadow: 0 8px 16px -4px rgba(0,98,255,.3); }
    .count-badge { background: #f1f5f9; color: #475569; padding: .1rem .5rem; border-radius: 6px; font-size: .75rem; }
    .active .count-badge { background: rgba(255,255,255,.2); color: white; }

    .grid-results { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .result-item-card { display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem; transition: transform .3s; }
    .result-item-card:hover { transform: translateY(-5px); }
    .item-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .item-icon.product { background: #eff6ff; }
    .item-icon.user { background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); color: white; font-weight: 800; }
    
    .item-details { flex: 1; }
    .item-category { font-size: .7rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; letter-spacing: .05em; }
    .item-details h3 { font-size: 1.05rem; margin-top: .25rem; font-weight: 800; color: #0f172a; }
    .item-meta { display: flex; gap: 1rem; margin-top: .5rem; font-size: .85rem; color: #64748b; font-weight: 600; }
    .price { color: var(--color-primary); font-weight: 800; }

    .list-results { display: flex; flex-direction: column; gap: 1rem; }
    .result-list-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 2rem; }
    .item-icon-circle { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
    .item-icon-circle.order { background: #f0fdf4; }
    .item-content { flex: 1; }
    .top-row { display: flex; justify-content: space-between; margin-bottom: .25rem; }
    .order-no { font-size: .75rem; color: #94a3b8; font-weight: 700; }
    .status-badge { font-size: .65rem; padding: .15rem .5rem; border-radius: 6px; font-weight: 800; text-transform: uppercase; }
    .status-badge.delivered { background: #f0fdf4; color: #16a34a; }
    .item-content h3 { font-size: 1.1rem; color: #1e293b; font-weight: 800; }
    .bottom-row { display: flex; gap: 1.5rem; margin-top: .35rem; font-size: .85rem; color: #64748b; font-weight: 600; }
    .amount { color: #0f172a; font-weight: 800; }

    .empty-results { text-align: center; padding: 6rem; }
    .empty-icon { font-size: 5rem; margin-bottom: 2rem; }
    .btn-sm { padding: .5rem 1rem; font-size: .8rem; }
    .mix-info { text-align: center; color: #94a3b8; font-weight: 700; padding: 5rem 0; font-size: 1.25rem; }
  `]
})
export class SearchResultsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataMockService);
  private readonly router = inject(Router);

  query: string = '';
  activeTab: string = 'products';
  totalResults: number = 0;

  filteredProducts: Product[] = [];
  filteredUsers: User[] = [];
  filteredOrders: SalesOrder[] = [];

  tabs = [
    { id: 'products', label: 'المنتجات', count: 0 },
    { id: 'users', label: 'الموظفين', count: 0 },
    { id: 'orders', label: 'المبيعات', count: 0 }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = (params as any)['q'] || '';
      this.performSearch();
    });
  }

  performSearch() {
    if (!this.query) {
      this.totalResults = 0;
      return;
    }

    const q = this.query.toLowerCase();

    combineLatest([
      this.data.getProducts(),
      this.data.getUsers(),
      this.data.getSalesOrders()
    ]).subscribe(([products, users, orders]) => {
      this.filteredProducts = products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
      this.filteredUsers = users.filter(u => u.name.toLowerCase().includes(q) || u.department.toLowerCase().includes(q));
      this.filteredOrders = orders.filter(o => o.customer.toLowerCase().includes(q) || o.orderNo.toLowerCase().includes(q));

      this.tabs[0].count = this.filteredProducts.length;
      this.tabs[1].count = this.filteredUsers.length;
      this.tabs[2].count = this.filteredOrders.length;

      this.totalResults = this.filteredProducts.length + this.filteredUsers.length + this.filteredOrders.length;
      
      if (this.filteredProducts.length > 0) this.activeTab = 'products';
      else if (this.filteredUsers.length > 0) this.activeTab = 'users';
      else if (this.filteredOrders.length > 0) this.activeTab = 'orders';
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
