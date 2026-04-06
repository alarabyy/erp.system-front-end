import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-files-page',
  template: `
    <div class="erp-page animate-fade-in files-page">
      <div class="page-header-luxe">
        <div class="ph-content">
          <h1>📂 مدير الملفات (File Manager)</h1>
          <p>إدارة وتخزين الوثائق، العقود، والتقارير المرتبطة بكافة أقسام النظام</p>
        </div>
        <div class="ph-actions">
          <button class="btn-luxe btn-primary">رفع ملف جديد 📤</button>
          <button class="btn-luxe btn-secondary">مجلد جديد 📁</button>
        </div>
      </div>

      <div class="files-layout">
        <!-- الأقسام الجانبية للملفات -->
        <div class="files-sidebar luxe-card">
          <div class="sidebar-section">
            <h3>التصنيفات</h3>
            <button class="sidebar-item active">📂 كافة الملفات</button>
            <button class="sidebar-item">📄 العقود (Legal)</button>
            <button class="sidebar-item">📜 فواتير (Invoices)</button>
            <button class="sidebar-item">📊 تقارير (Reports)</button>
            <button class="sidebar-item">🏢 صور الهوية (HR)</button>
          </div>
          <div class="sidebar-section">
            <h3>التخزين</h3>
            <div class="storage-usage">
              <div class="usage-text">
                <span>12.4 GB مستخدم</span>
                <span>50 GB الكلي</span>
              </div>
              <div class="usage-bar">
                <div class="bar-fill" style="width: 25%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- عرض الملفات -->
        <div class="files-grid-container">
          <div class="files-path">
            <span>الرئيسية</span> <span class="sep">/</span> <span>الوثائق العامة</span>
          </div>

          <div class="files-grid">
            <div *ngFor="let f of mockFiles" class="file-card luxe-card">
              <div class="file-icon" [class]="f.type">
                <span *ngSwitchCase="'folder'">📁</span>
                <span *ngSwitchCase="'pdf'">📄</span>
                <span *ngSwitchCase="'image'">🖼️</span>
                <span *ngSwitchCase="'excel'">📊</span>
                <span>{{ f.icon }}</span>
              </div>
              <div class="file-info">
                <h4 class="file-name">{{ f.name }}</h4>
                <div class="file-meta">
                  <span>{{ f.size }}</span>
                  <span class="dot"></span>
                  <span>{{ f.date }}</span>
                </div>
              </div>
              <div class="file-actions">
                <button class="icon-btn">👁️</button>
                <button class="icon-btn">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .files-page { padding-bottom: 3rem; }
    .files-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; height: calc(100vh - 180px); overflow: hidden; }
    
    .files-sidebar { padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 2rem; }
    .sidebar-section h3 { font-size: .75rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 1.25rem; }
    .sidebar-item { border: none; background: transparent; padding: .875rem 1.25rem; border-radius: 12px; font-weight: 700; color: #475569; cursor: pointer; text-align: right; width: 100%; transition: all .3s; font-family: 'Cairo'; }
    .sidebar-item:hover { background: #f1f5f9; color: var(--color-primary); }
    .sidebar-item.active { background: #eff6ff; color: var(--color-primary); }

    .storage-usage { padding: 1.25rem; background: #fafbfc; border-radius: 16px; border: 1px solid #f1f5f9; }
    .usage-text { display: flex; justify-content: space-between; font-size: .7rem; font-weight: 800; color: #64748b; margin-bottom: .75rem; }
    .usage-bar { height: 6px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }
    .bar-fill { height: 100%; background: var(--color-primary); box-shadow: 0 0 10px rgba(0,98,255,.3); }

    .files-grid-container { overflow-y: auto; padding-left: 1rem; }
    .files-path { margin-bottom: 1.5rem; font-size: .85rem; font-weight: 700; color: #94a3b8; }
    .files-path .sep { color: #cbd5e1; margin: 0 .5rem; }

    .files-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
    .file-card { padding: 1.5rem; text-align: center; border: 1.5px solid transparent; transition: all .3s; cursor: pointer; }
    .file-card:hover { transform: translateY(-5px); border-color: var(--color-primary); box-shadow: 0 15px 30px -10px rgba(0,0,0,.05); }
    
    .file-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .file-name { font-size: .95rem; font-weight: 800; color: #0f172a; margin-bottom: .25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .file-meta { font-size: .75rem; color: #94a3b8; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: .5rem; }
    .file-meta .dot { width: 3px; height: 3px; background: #cbd5e1; border-radius: 50%; }
    
    .file-actions { display: flex; gap: .5rem; justify-content: center; margin-top: 1.25rem; opacity: 0; transition: all .2s; }
    .file-card:hover .file-actions { opacity: 1; }
    .icon-btn { border: 1px solid #f1f5f9; background: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
    .icon-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
  `]
})
export class FilesPageComponent implements OnInit {
  mockFiles = [
    { name: 'مجلد مشروع العقبة', date: '2026-04-01', size: '254 MB', icon: '📁', type: 'folder' },
    { name: 'عقد الموظف #102.pdf', date: '2026-04-03', size: '2.4 MB', icon: '📄', type: 'pdf' },
    { name: 'تقرير المبيعات Q1.xlsx', date: '2026-04-05', size: '1.1 MB', icon: '📊', type: 'excel' },
    { name: 'صورة الهوية ريم.jpg', date: '2026-04-06', size: '452 KB', icon: '🖼️', type: 'image' },
    { name: 'سياسة الخصوصية.pdf', date: '2026-03-22', size: '0.8 MB', icon: '📄', type: 'pdf' },
    { name: 'تصميم واجهة ERP.png', date: '2026-04-06', size: '3.2 MB', icon: '🖼️', type: 'image' },
  ];

  ngOnInit() {}
}
