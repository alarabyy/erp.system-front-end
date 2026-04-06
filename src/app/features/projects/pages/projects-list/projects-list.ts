import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  priority: 'high' | 'medium' | 'low';
  priorityLabel: string;
  category: string;
  color: string;
  team: string[];
  teamCount: number;
}

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss'],
})
export class ProjectsList implements OnInit {
  // Re-build trigger
  
  projects: Project[] = [
    {
      id: 'P-1', name: 'بناء المنصة السحابية Q-Cloud', client: 'مجموعة النماء الاستثمارية',
      progress: 68, startDate: '2025-10-01', endDate: '2026-06-30', budget: 452000,
      priority: 'high', priorityLabel: 'أولوية قصوى', category: 'تطوير برمجيات', color: '#0062ff',
      team: ['أ', 'م', 'خ'], teamCount: 12
    },
    {
      id: 'P-2', name: 'تجهيز البنية التحتية - مطار العقبة', client: 'سلطة المنطقة الخاصة',
      progress: 82, startDate: '2024-11-15', endDate: '2026-02-10', budget: 1285000,
      priority: 'medium', priorityLabel: 'متوسطة', category: 'إنشاءات وبنى تحتية', color: '#10b981',
      team: ['س', 'ر', 'ن'], teamCount: 45
    },
    {
      id: 'P-3', name: 'أتمتة خطوط الإنتاج - مصنع الوطنية', client: 'الوطنية للصناعات الغذائية',
      progress: 25, startDate: '2026-01-05', endDate: '2026-12-25', budget: 320000,
      priority: 'high', priorityLabel: 'أولوية قصوى', category: 'حلول تقنية وصناعية', color: '#a855f7',
      team: ['م', 'ي', 'ع'], teamCount: 8
    },
    {
      id: 'P-4', name: 'تطوير تطبيق خدمة المواقع - لوجيستكس', client: 'أرامكس العالمية',
      progress: 45, startDate: '2025-12-20', endDate: '2026-08-15', budget: 115000,
      priority: 'low', priorityLabel: 'عادية', category: 'تطوير برمجيات', color: '#6366f1',
      team: ['ب', 'ل', 'ج'], teamCount: 5
    },
    {
      id: 'P-5', name: 'نظام إدارة علاقات العملاء CRM v5.0', client: 'مشروع داخلي - كوانتم',
      progress: 5, startDate: '2026-03-01', endDate: '2026-12-31', budget: 250000,
      priority: 'medium', priorityLabel: 'متوسطة', category: 'تطوير برمجيات', color: '#f59e0b',
      team: ['ح', 'ط', 'ك'], teamCount: 10
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
