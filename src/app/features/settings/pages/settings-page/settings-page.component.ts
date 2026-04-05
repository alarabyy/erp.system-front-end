import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-settings-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>إعدادات النظام</h1><p class="sub">تكوين النظام وإدارة الشركة والمستخدمين وصلاحيات الوصول</p></div>
        <button class="btn-luxe btn-primary" (click)="saveAll()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          حفظ جميع الإعدادات
        </button>
      </header>

      <!-- Settings Nav Tabs -->
      <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1rem">
        <button *ngFor="let tab of tabs" class="btn-luxe" [class.btn-primary]="activeTab === tab.id" [class.btn-ghost]="activeTab !== tab.id" (click)="activeTab = tab.id">
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <!-- Company Settings -->
      <div *ngIf="activeTab === 'company'" class="form-page">
        <div class="form-card" style="grid-column:span 2">
          <div class="form-card-title">🏢 بيانات الشركة</div>
          <div class="form-grid">
            <div class="form-group"><label>اسم الشركة *</label><input class="erp-input" [(ngModel)]="company.name" placeholder="الاسم الرسمي للشركة"></div>
            <div class="form-group"><label>الرقم الضريبي</label><input class="erp-input" [(ngModel)]="company.taxNum" placeholder="300XXXXXXXXX1234"></div>
            <div class="form-group"><label>البريد الرسمي</label><input class="erp-input" type="email" [(ngModel)]="company.email"></div>
            <div class="form-group"><label>رقم الهاتف</label><input class="erp-input" [(ngModel)]="company.phone"></div>
            <div class="form-group"><label>الدولة</label>
              <select class="erp-input erp-select" [(ngModel)]="company.country">
                <option value="السعودية">السعودية</option>
                <option value="الإمارات">الإمارات</option>
                <option value="مصر">مصر</option>
              </select>
            </div>
            <div class="form-group"><label>العملة الافتراضية</label>
              <select class="erp-input erp-select" [(ngModel)]="company.currency">
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="AED">درهم إماراتي (AED)</option>
              </select>
            </div>
            <div class="form-group" style="grid-column:span 2"><label>العنوان</label><input class="erp-input" [(ngModel)]="company.address"></div>
          </div>
        </div>
      </div>

      <!-- System Config -->
      <div *ngIf="activeTab === 'system'" class="form-page">
        <div class="form-card" style="grid-column:span 2">
          <div class="form-card-title">⚙️ تكوين النظام</div>
          <div class="form-grid">
            <div class="form-group"><label>لغة النظام</label>
              <select class="erp-input erp-select" [(ngModel)]="system.language">
                <option value="ar">العربية</option>
                <option value="en">الإنجليزية</option>
              </select>
            </div>
            <div class="form-group"><label>المنطقة الزمنية</label>
              <select class="erp-input erp-select" [(ngModel)]="system.timezone">
                <option value="Asia/Riyadh">توقيت الرياض (GMT+3)</option>
                <option value="Asia/Dubai">توقيت دبي (GMT+4)</option>
                <option value="Africa/Cairo">توقيت القاهرة (GMT+2)</option>
              </select>
            </div>
            <div class="form-group"><label>نسبة الضريبة القياسية (%)</label><input class="erp-input" type="number" [(ngModel)]="system.taxRate" min="0" max="100"></div>
            <div class="form-group"><label>الحد الأدنى للمخزون</label><input class="erp-input" type="number" [(ngModel)]="system.minStock" min="0"></div>
          </div>
          <div class="form-grid single" style="margin-top:1.5rem">
            <div style="display:flex;flex-direction:column;gap:1rem">
              <label style="display:flex;align-items:center;gap:.75rem;cursor:pointer">
                <input type="checkbox" [(ngModel)]="system.enableNotifications" style="width:18px;height:18px">
                <span style="font-weight:600">تفعيل الإشعارات الآنية</span>
              </label>
              <label style="display:flex;align-items:center;gap:.75rem;cursor:pointer">
                <input type="checkbox" [(ngModel)]="system.enableAuditLog" style="width:18px;height:18px">
                <span style="font-weight:600">تفعيل سجل المراجعة (Audit Log)</span>
              </label>
              <label style="display:flex;align-items:center;gap:.75rem;cursor:pointer">
                <input type="checkbox" [(ngModel)]="system.enableDarkMode" style="width:18px;height:18px">
                <span style="font-weight:600">الوضع الليلي (Dark Mode) - قريباً</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Roles -->
      <div *ngIf="activeTab === 'roles'">
        <div class="data-table-wrap">
          <div class="table-header"><h3>الأدوار والصلاحيات</h3><button class="btn-luxe btn-primary" style="font-size:.8rem;padding:.6rem 1.2rem">+ إضافة دور جديد</button></div>
          <table class="erp-table">
            <thead><tr><th>اسم الدور</th><th>الوصول للمبيعات</th><th>إدارة المستخدمين</th><th>تقارير المالية</th><th>الإعدادات</th></tr></thead>
            <tbody>
              <tr *ngFor="let role of roles">
                <td><strong>{{ role.name }}</strong></td>
                <td><span [class.badge-success]="role.sales" [class.badge-danger]="!role.sales" class="badge">{{ role.sales ? '✅ مسموح' : '🚫 محظور' }}</span></td>
                <td><span [class.badge-success]="role.users" [class.badge-danger]="!role.users" class="badge">{{ role.users ? '✅ مسموح' : '🚫 محظور' }}</span></td>
                <td><span [class.badge-success]="role.reports" [class.badge-danger]="!role.reports" class="badge">{{ role.reports ? '✅ مسموح' : '🚫 محظور' }}</span></td>
                <td><span [class.badge-success]="role.settings" [class.badge-danger]="!role.settings" class="badge">{{ role.settings ? '✅ مسموح' : '🚫 محظور' }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class SettingsPageComponent {
  activeTab = 'company';
  tabs = [
    { id: 'company', label: 'بيانات الشركة', icon: '🏢' },
    { id: 'system', label: 'تكوين النظام', icon: '⚙️' },
    { id: 'roles', label: 'الأدوار والصلاحيات', icon: '🔐' },
  ];

  company = { name: 'كوانتم للتقنية', taxNum: '300000000000000', email: 'info@quantumerp.com', phone: '+966 11 123 4567', country: 'السعودية', currency: 'USD', address: 'طريق الملك فهد، الرياض 12345' };
  system = { language: 'ar', timezone: 'Asia/Riyadh', taxRate: 15, minStock: 10, enableNotifications: true, enableAuditLog: true, enableDarkMode: false };
  roles = [
    { name: 'مدير النظام', sales: true, users: true, reports: true, settings: true },
    { name: 'مشرف', sales: true, users: false, reports: true, settings: false },
    { name: 'موظف', sales: true, users: false, reports: false, settings: false },
    { name: 'متابع', sales: false, users: false, reports: true, settings: false },
  ];

  saveAll() { alert('✅ تم حفظ الإعدادات بنجاح'); }
}
