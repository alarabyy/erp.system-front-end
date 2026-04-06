import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMockService } from '../../../../core/services/data-mock.service';
import { ErpNotification } from '../../../../core/models/data-models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-notifications-page',
  template: `
    <div class="erp-page animate-fade-in luxe-notifications-center">
      <div class="page-header-luxe">
        <div class="ph-content">
          <h1>🔔 مركز التنبيهات</h1>
          <p>تابع كافة التحركات، التنبيهات، والرسائل الواردة من نظام كوانتم</p>
        </div>
        <div class="ph-actions">
          <button class="btn-luxe btn-ghost" (click)="markAllRead()">تحديد الكل كمقروء</button>
          <button class="btn-luxe btn-danger" (click)="clearAll()">حذف الكل</button>
        </div>
      </div>

      <div class="notif-layout luxe-card">
        <div class="notif-sidebar">
          <button class="notif-tab active">
            <span class="icon-wrap info">📁</span> الكل
          </button>
          <button class="notif-tab">
            <span class="icon-wrap warning">⚡</span> التنبيهات
          </button>
          <button class="notif-tab">
            <span class="icon-wrap success">✅</span> العمليات الناجحة
          </button>
          <button class="notif-tab">
            <span class="icon-wrap danger">🚨</span> أمن النظام
          </button>
        </div>
        
        <div class="notif-content-area">
          <div *ngFor="let n of (notifications$ | async)" class="full-notif-item" [class.unread]="!n.read" (click)="markRead(n.id)">
            <div class="n-type-indicator" [class]="n.type"></div>
            <div class="n-body">
              <div class="n-row">
                <span class="n-title">{{ n.title }}</span>
                <span class="n-time">{{ n.time }}</span>
              </div>
              <p class="n-message">{{ n.message }}</p>
              <div class="n-actions">
                <button class="sm-btn">تجاهل</button>
                <button class="sm-btn primary">عرض التفاصيل</button>
              </div>
            </div>
            <div *ngIf="!n.read" class="n-unread-dot"></div>
          </div>
          
          <div *ngIf="!(notifications$ | async)?.length" class="empty-state">
            <div class="es-icon">📦</div>
            <h3>لا توجد إشعارات جديدة</h3>
            <p>أنت مطلع على كل شيء، استرخِ قليلاً!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .luxe-notifications-center { padding-bottom: 3rem; }
    .page-header-luxe { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
    .ph-content h1 { font-size: 2.25rem; font-weight: 900; background: linear-gradient(135deg, #0f172a, #334155); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .ph-content p { color: #64748b; font-weight: 600; margin-top: .5rem; }
    .ph-actions { display: flex; gap: 1rem; }

    .notif-layout { display: grid; grid-template-columns: 280px 1fr; gap: 0; padding: 0; overflow: hidden; }
    .notif-sidebar { background: #f8fafc; border-left: 1px solid var(--color-border); padding: 2rem 1rem; display: flex; flex-direction: column; gap: .5rem; }
    .notif-tab { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; border: none; background: transparent; cursor: pointer; border-radius: 14px; font-weight: 700; color: #475569; transition: all .3s; font-family: 'Cairo'; }
    .notif-tab:hover { background: #eff6ff; color: var(--color-primary); }
    .notif-tab.active { background: white; color: var(--color-primary); box-shadow: 0 4px 12px rgba(0,0,0,.05); border: 1px solid var(--color-border); }
    .icon-wrap { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
    .icon-wrap.info { background: #eff6ff; }
    .icon-wrap.warning { background: #fffbeb; }
    .icon-wrap.success { background: #f0fdf4; }
    .icon-wrap.danger { background: #fef2f2; }

    .notif-content-area { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; max-height: 700px; overflow-y: auto; }
    .full-notif-item { display: flex; gap: 1.5rem; padding: 1.75rem; border-radius: 20px; transition: all .3s; position: relative; border: 1px solid transparent; cursor: pointer; }
    .full-notif-item:hover { background: #f8fafc; transform: translateX(-5px); border-color: var(--color-border); }
    .full-notif-item.unread { background: #fff; border-color: #e2e8f0; border-right: 5px solid var(--color-primary); box-shadow: 0 4px 20px rgba(0,0,0,.03); }
    
    .n-type-indicator { width: 12px; height: 12px; border-radius: 50%; margin-top: .5rem; flex-shrink: 0; }
    .n-type-indicator.info { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
    .n-type-indicator.warning { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
    .n-type-indicator.success { background: #10b981; box-shadow: 0 0 10px #10b981; }
    .n-type-indicator.danger { background: #ef4444; box-shadow: 0 0 10px #ef4444; }

    .n-body { flex: 1; }
    .n-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
    .n-title { font-weight: 800; font-size: 1.1rem; color: #0f172a; }
    .n-time { font-size: .8rem; color: #94a3b8; font-weight: 700; }
    .n-message { font-size: .95rem; color: #475569; line-height: 1.6; margin-bottom: 1.5rem; }
    .n-actions { display: flex; gap: .75rem; }
    .sm-btn { padding: .5rem 1rem; border-radius: 8px; border: 1px solid #e2e8f0; background: white; font-size: .75rem; font-weight: 800; color: #64748b; cursor: pointer; transition: all .2s; font-family: 'Cairo'; }
    .sm-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
    .sm-btn.primary { background: var(--color-primary); color: white; border: none; }
    .n-unread-dot { width: 10px; height: 10px; background: #ef4444; border-radius: 50%; position: absolute; top: 1.75rem; left: 1.75rem; }

    .empty-state { text-align: center; padding: 5rem 0; }
    .es-icon { font-size: 5rem; margin-bottom: 2rem; opacity: .5; }
    .empty-state h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: .5rem; }
    .empty-state p { color: #94a3b8; font-weight: 700; }
  `]
})
export class NotificationsPageComponent implements OnInit {
  notifications$: Observable<ErpNotification[]>;

  constructor(private data: DataMockService) {
    this.notifications$ = this.data.getNotifications();
  }

  ngOnInit() {}

  markRead(id: string) {
    this.data.markNotificationAsRead(id);
  }

  markAllRead() {
    // Logic in mock service would be needed
  }

  clearAll() {
    // Logic in mock service would be needed
  }
}
