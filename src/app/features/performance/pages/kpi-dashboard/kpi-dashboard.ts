import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmployeeKPI {
  name: string;
  role: string;
  initials: string;
  dept: string;
  tasks: number;
  quality: number;
  commitment: number;
  score: number;
  scoreColor: string;
}

interface MainKPI {
  label: string;
  value: number;
  trend: number;
  color: string;
}

interface DeptEfficiency {
  name: string;
  val: number;
  color: string;
}

@Component({
  selector: 'app-kpi-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-dashboard.html',
  styleUrls: ['./kpi-dashboard.scss'],
})
export class KpiDashboard implements OnInit {
  
  mainKpis: MainKPI[] = [
    { label: 'الإنتاجية الكلية', value: 87.5, trend: 4.2, color: '#0062ff' },
    { label: 'جودة المخرجات', value: 94.2, trend: 1.5, color: '#10b981' },
    { label: 'كفاءة سير العمل', value: 72.8, trend: -0.8, color: '#a855f7' },
    { label: 'مؤشر رضا العملاء', value: 3.8, trend: 0.5, color: '#f59e0b' }
  ];

  employees: EmployeeKPI[] = [
    { name: 'أحمد الرشيد', role: 'محلل بيانات أول', initials: 'أ', dept: 'تقنية المعلومات', tasks: 92, quality: 4.8, commitment: 98, score: 9.6, scoreColor: '#10b981' },
    { name: 'سارة السلمان', role: 'مدير تسويق', initials: 'س', dept: 'التسويق', tasks: 85, quality: 4.5, commitment: 92, score: 9.0, scoreColor: '#10b981' },
    { name: 'محمد القحطاني', role: 'مهندس برمجيات', initials: 'م', dept: 'التقنية', tasks: 78, quality: 4.2, commitment: 88, score: 8.4, scoreColor: '#0062ff' },
    { name: 'نورة العتيبي', role: 'محاسب مالي', initials: 'ن', dept: 'المالية', tasks: 95, quality: 4.9, commitment: 100, score: 9.8, scoreColor: '#10b981' },
    { name: 'فهد المطيري', role: 'مشرف إنتاج', initials: 'ف', dept: 'التصنيع', tasks: 65, quality: 3.8, commitment: 82, score: 7.2, scoreColor: '#f59e0b' }
  ];

  departmentEfficiency: DeptEfficiency[] = [
     { name: 'المبيعات والتسويق', val: 92, color: '#0062ff' },
     { name: 'الموارد البشرية', val: 78, color: '#10b981' },
     { name: 'تقنية المعلومات', val: 85, color: '#a855f7' },
     { name: 'العمليات والتصنيع', val: 64, color: '#f43f5e' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
