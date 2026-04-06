import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-calendar-page',
  template: `
    <div class="erp-page animate-fade-in calendar-page">
      <div class="page-header-luxe">
        <div class="ph-content">
          <h1>📅 التقويم والمهام المجدولة</h1>
          <p>إدارة مواعيد الاجتماعات، ديدلاين المشاريع، والمهام اليومية للفريق</p>
        </div>
        <div class="ph-actions">
          <button class="btn-luxe btn-primary">إضافة موعد جديد +</button>
          <div class="view-toggle glass-effect">
            <button class="active">شهر</button>
            <button>أسبوع</button>
            <button>يوم</button>
          </div>
        </div>
      </div>

      <div class="calendar-grid-layout">
        <!-- مصغر الشهر و الفلاتر -->
        <div class="calendar-sidebar luxe-card">
          <div class="mini-calendar">
            <div class="month-header">أبريل 2026</div>
            <div class="days-grid">
               <!-- عرض مبسط للأيام -->
               <div *ngFor="let d of weekDays" class="day-head">{{ d }}</div>
               <div *ngFor="let day of [].constructor(30); let i = index" class="day-num" [class.today]="i === 5">
                 {{ i + 1 }}
               </div>
            </div>
          </div>

          <div class="filters-section">
            <label class="check-item"><input type="checkbox" checked><span class="c blue"></span> اجتماعات</label>
            <label class="check-item"><input type="checkbox" checked><span class="c green"></span> مهام</label>
            <label class="check-item"><input type="checkbox" checked><span class="c orange"></span> شخصي</label>
          </div>
        </div>

        <!-- التقويم الرئيسي -->
        <div class="main-calendar luxe-card">
          <table class="calendar-table">
            <thead>
              <tr>
                <th *ngFor="let d of fullWeekDays">{{ d }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of [1,2,3,4,5]">
                <td *ngFor="let col of [1,2,3,4,5,6,7]" class="cal-cell">
                   <span class="cell-num">{{ (row-1)*7 + col }}</span>
                   <!-- مود كجرب لفعالية -->
                   <div *ngIf="(row === 2 && col === 3)" class="cal-event blue">
                      اجتماع مجلس الإدارة
                   </div>
                   <div *ngIf="(row === 3 && col === 5)" class="cal-event green">
                      تسليم مشروع العقبة
                   </div>
                   <div *ngIf="(row === 4 && col === 2)" class="cal-event orange">
                      مقابلة موظفين جدد
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-page { padding-bottom: 3rem; }
    .page-header-luxe { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
    .view-toggle { padding: .25rem; display: flex; gap: .25rem; border-radius: 12px; }
    .view-toggle button { border: none; background: transparent; padding: .5rem 1.25rem; border-radius: 10px; font-weight: 800; cursor: pointer; color: #64748b; }
    .view-toggle button.active { background: white; color: var(--color-primary); box-shadow: 0 4px 10px rgba(0,0,0,.05); }

    .calendar-grid-layout { display: grid; grid-template-columns: 320px 1fr; gap: 2rem; }
    
    .calendar-sidebar { padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; }
    .mini-calendar { text-align: center; }
    .month-header { font-weight: 900; font-size: 1.1rem; margin-bottom: 1.5rem; color: #0f172a; }
    .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: .5rem; }
    .day-head { font-size: .65rem; font-weight: 800; color: #94a3b8; }
    .day-num { font-size: .8rem; font-weight: 700; padding: .5rem; cursor: pointer; border-radius: 8px; color: #475569; }
    .day-num:hover { background: #f8fafc; color: var(--color-primary); }
    .day-num.today { background: var(--color-primary); color: white; box-shadow: 0 5px 12px rgba(0,98,255,.3); }

    .filters-section { display: flex; flex-direction: column; gap: 1rem; }
    .check-item { display: flex; align-items: center; gap: .75rem; font-size: .85rem; font-weight: 700; color: #475569; cursor: pointer; }
    .check-item .c { width: 10px; height: 10px; border-radius: 50%; }
    .c.blue { background: #3b82f6; }
    .c.green { background: #10b981; }
    .c.orange { background: #f59e0b; }

    .main-calendar { padding: 0; overflow: hidden; border: 1.5px solid #f1f5f9; }
    .calendar-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    .calendar-table th { padding: 1.25rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; font-size: .75rem; border-bottom: 1.5px solid #f1f5f9; background: #fafbfc; }
    .cal-cell { height: 120px; vertical-align: top; padding: .75rem; border: 1px solid #f1f5f9; position: relative; transition: all .2s; }
    .cal-cell:hover { background: #fcfdfe; }
    .cell-num { font-size: .85rem; font-weight: 800; color: #cbd5e1; }
    
    .cal-event { margin-top: .75rem; padding: .5rem .75rem; border-radius: 10px; font-size: .7rem; font-weight: 800; color: white; line-height: 1.4; border: 2px solid transparent; box-shadow: 0 4px 10px rgba(0,0,0,.05); cursor: pointer; }
    .cal-event.blue { background: #3b82f6; border-color: rgba(255,255,255,.2); }
    .cal-event.green { background: #10b981; border-color: rgba(255,255,255,.2); }
    .cal-event.orange { background: #f59e0b; border-color: rgba(255,255,255,.2); }
    .cal-event:hover { opacity: .9; transform: scale(1.02); }
  `]
})
export class CalendarPageComponent implements OnInit {
  weekDays = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
  fullWeekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  ngOnInit() {}
}
