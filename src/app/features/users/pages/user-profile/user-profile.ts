import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataMockService } from '../../../../core/services/data-mock.service';
import { User, Activity } from '../../../../core/models/data-models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-user-profile',
  template: `
    <div class="erp-page animate-fade-in profile-page">
      <div class="page-header-luxe">
        <div class="ph-content">
          <h1>👤 الملف الشخصي</h1>
          <p>إدارة بياناتك الشخصية، الأمان، والاطلاع على نشاطاتك في النظام</p>
        </div>
      </div>

      <div class="profile-grid">
        <!-- عمود اليسار: البيانات الشخصية والأمان -->
        <div class="profile-main">
          <!-- كارت البيانات -->
          <div class="luxe-card section-card">
            <div class="card-title">
              <h3>البيانات الأساسية</h3>
              <button class="btn-luxe btn-primary btn-sm">حفظ التغييرات</button>
            </div>
            <form [formGroup]="profileForm" class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label>الاسم الكامل</label>
                  <input type="text" formControlName="name">
                </div>
                <div class="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" formControlName="email" readonly>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>القسم</label>
                  <input type="text" formControlName="department" readonly>
                </div>
                <div class="form-group">
                  <label>الدور الوظيفي</label>
                  <input type="text" formControlName="role" readonly>
                </div>
              </div>
            </form>
          </div>

          <!-- كارت الأمان -->
          <div class="luxe-card section-card">
            <div class="card-title">
              <h3>تغيير كلمة المرور</h3>
              <button class="btn-luxe btn-secondary btn-sm">تحديث كلمة المرور</button>
            </div>
            <form class="profile-form">
              <div class="form-group">
                <label>كلمة المرور الحالية</label>
                <input type="password" placeholder="••••••••••••">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••••••">
                </div>
                <div class="form-group">
                  <label>تأكيد كلمة المرور</label>
                  <input type="password" placeholder="••••••••••••">
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- عمود اليمين: الأواتار والنشاط -->
        <div class="profile-sidebar">
          <div class="luxe-card avatar-card">
            <div class="avatar-display">أح</div>
            <h2>أحمد الرشيد</h2>
            <span class="user-id">ID: #USR-8821</span>
            <div class="avatar-actions">
              <button class="btn-luxe btn-ghost btn-sm">تغيير الصورة</button>
            </div>
          </div>

          <div class="luxe-card activity-card">
            <div class="card-title">
              <h3>آخر النشاطات</h3>
            </div>
            <div class="activity-feed">
              <div *ngFor="let act of (activities$ | async)" class="feed-item">
                <div class="feed-icon" [ngSwitch]="act.type">
                  <span *ngSwitchCase="'order'">🛒</span>
                  <span *ngSwitchCase="'stock'">📦</span>
                  <span *ngSwitchCase="'user'">👤</span>
                  <span *ngSwitchDefault>⚡</span>
                </div>
                <div class="feed-details">
                  <p>{{ act.message }}</p>
                  <span class="feed-time">{{ act.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { padding-bottom: 3rem; }
    .page-header-luxe { margin-bottom: 2.5rem; }
    .profile-grid { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }
    
    .section-card { margin-bottom: 2rem; padding: 2.5rem; }
    .card-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .card-title h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
    
    .profile-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: .5rem; }
    .form-group label { font-size: .85rem; font-weight: 700; color: #475569; }
    .form-group input { background: #f8fafc; border: 1.5px solid #f1f5f9; padding: .8rem 1rem; border-radius: 12px; outline: none; font-weight: 600; color: #1e293b; font-family: 'Cairo'; }
    .form-group input:focus { border-color: var(--color-primary); background: white; }
    .form-group input[readonly] { background: #f1f5f9; cursor: not-allowed; color: #94a3b8; }

    .avatar-card { text-align: center; padding: 3rem 2rem; margin-bottom: 2rem; }
    .avatar-display { width: 100px; height: 100px; background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); border-radius: 30px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; font-weight: 900; margin: 0 auto 1.5rem; box-shadow: 0 15px 30px -10px rgba(0,98,255,.4); }
    .avatar-card h2 { font-size: 1.5rem; font-weight: 900; color: #0f172a; }
    .user-id { display: block; font-size: .75rem; color: #94a3b8; font-weight: 700; margin-top: .5rem; }
    .avatar-actions { margin-top: 1.5rem; }

    .activity-card { padding: 2rem; }
    .activity-feed { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
    .feed-item { display: flex; gap: 1rem; align-items: flex-start; }
    .feed-icon { width: 36px; height: 36px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
    .feed-details p { font-size: .88rem; font-weight: 600; color: #334155; line-height: 1.4; }
    .feed-time { font-size: .7rem; color: #94a3b8; font-weight: 700; margin-top: .2rem; display: block; }
    
    .btn-sm { padding: .5rem 1rem; font-size: .8rem; }
  `]
})
export class UserProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataMockService);

  profileForm: FormGroup;
  activities$: Observable<Activity[]>;

  constructor() {
    this.profileForm = this.fb.group({
      name: ['أحمد محمد الرشيد', Validators.required],
      email: ['ahmed@quantumerp.com'],
      department: ['تقنية المعلومات'],
      role: ['مدير النظام']
    });
    this.activities$ = this.data.getActivities();
  }

  ngOnInit() {}
}
