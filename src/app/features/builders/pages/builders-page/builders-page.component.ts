import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-builders-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🎨 منشئ الواجهات (Builders)</h1><p class="sub">صمم لوحات القيادة والتقارير والنماذج بسحب وإفلات بسيط</p></div>
      </header>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem">
        <div class="luxe-card builder-card" (click)="openBuilder('Dashboard')">
          <div class="builder-icon">📊</div>
          <h3>Dashboard Builder</h3>
          <p>صمم لوحات قيادة مخصصة مع Widgets تفاعلية</p>
          <button class="btn-luxe btn-primary">ابدأ التصميم</button>
        </div>
        <div class="luxe-card builder-card" (click)="openBuilder('Report')">
          <div class="builder-icon">📋</div>
          <h3>Report Builder</h3>
          <p>أنشئ تقارير تحليلية متقدمة مع فلاتر ذكية</p>
          <button class="btn-luxe btn-primary">ابدأ التصميم</button>
        </div>
        <div class="luxe-card builder-card" (click)="openBuilder('Form')">
          <div class="builder-icon">📝</div>
          <h3>Form Builder</h3>
          <p>صمم نماذج إدخال بيانات ديناميكية بسهولة</p>
          <button class="btn-luxe btn-primary">ابدأ التصميم</button>
        </div>
      </div>

      <div class="luxe-card" style="margin-top:2rem;padding:2rem;text-align:center">
        <div style="font-size:3rem;margin-bottom:1rem">🏗️</div>
        <h2 style="font-weight:800">مساحة عمل فارغة</h2>
        <p style="color:var(--color-text-muted);margin:1rem 0 2rem">اختر أحد الأدوات أعلاه للبدء في بناء واجهتك المخصصة</p>
        <div style="border:2px dashed var(--color-border);border-radius:20px;height:300px;display:flex;align-items:center;justify-content:center">
          <p style="color:var(--color-text-muted);font-weight:600">منطقة السحب والإفلات (Drag & Drop Area)</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .builder-card {
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .builder-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .builder-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .builder-card h3 {
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    .builder-card p {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin-bottom: 1.5rem;
    }
  `]
})
export class BuildersPageComponent {
  openBuilder(type: string) {
    alert(`قريباً: سيتم فتح ${type} Builder لتصميم الواجهة..`);
  }
}
