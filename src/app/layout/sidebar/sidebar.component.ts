import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  path?: string;
  icon?: string;
  badge?: string;
  badgeType?: 'primary' | 'success' | 'warning' | 'danger';
  expanded?: boolean;
  children?: NavItem[];
  type?: 'item' | 'header';
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  searchQuery = '';
  filteredItems: NavItem[] = [];

  navItems: NavItem[] = [
    { label: 'الرئيسية والتحليلات', type: 'header' },
    { label: 'لوحة القيادة', path: '/dashboard', icon: '🏠' },
    { label: 'الدردشة والتعاون', path: '/chat', icon: '💬', badge: 'جديد', badgeType: 'success' },
    {
      label: 'التحليلات الذكية', icon: '📊', expanded: true,
      children: [
        { label: 'نظرة عامة', path: '/analytics/overview', icon: '🧭' },
        { label: 'تحليل المبيعات', path: '/analytics/sales', icon: '📈' },
        { label: 'تحليل المخزون', path: '/analytics/inventory', icon: '📦' },
        { label: 'التحليل المالي', path: '/analytics/financial', icon: '💰' },
        { label: 'تحليل HR', path: '/analytics/hr', icon: '👥' },
        { label: 'تحليل CRM', path: '/analytics/crm', icon: '❤️' },
        { label: 'تقارير مخصصة', path: '/analytics/custom-reports', icon: '🎨', badge: 'جديد', badgeType: 'primary' },
      ]
    },

    { label: 'إدارة العمليات', type: 'header' },
    { label: 'المبيعات', path: '/sales', icon: '🛒' },
    { label: 'المشتريات', path: '/purchases', icon: '🧾' },
    { label: 'المخزون', path: '/inventory', icon: '📦' },

    { label: 'إدارة الموارد والعملاء', type: 'header' },
    { label: 'المستخدمون والخصوصية', path: '/users', icon: '👥' },
    { label: 'الموارد البشرية', path: '/hr', icon: '👨‍💼' },
    { label: 'إدارة العملاء (CRM)', path: '/crm', icon: '❤️' },

    { label: 'المالية والتقارير', type: 'header' },
    { label: 'المحاسبة والقيود', path: '/accounting', icon: '💰' },
    { label: 'مركز التقارير', path: '/reports', icon: '📊' },

    { label: 'الأتمتة والذكاء الاصطناعي', type: 'header' },
    { label: 'الذكاء الاصطناعي', path: '/ai', icon: '🧠', badge: 'بيتا', badgeType: 'warning' },
    { label: 'مهام سير العمل (Workflow)', path: '/workflow', icon: '🔄' },
    { label: 'محرك القواعد والشرط', path: '/rules', icon: '⚖️' },
    { label: 'الحقول المخصصة', path: '/custom-fields', icon: '🧱' },

    { label: 'تحكم النظام والنواتج', type: 'header' },
    { label: 'الأمان والحماية', path: '/security', icon: '🔐' },
    { label: 'سجل الأحداث📡', path: '/events', icon: '📡' },
    { label: 'المهام الخلفية⚡', path: '/jobs', icon: '⚡' },
    { label: 'النسخ الاحتياطي', path: '/backup', icon: '💽' },
    { label: 'بيئة المطورين', path: '/developers', icon: '🧑‍💻' },
    { label: 'منشئ الواجهات', path: '/builders', icon: '🎨' },
    { label: 'الإعدادات الأساسية', path: '/settings', icon: '⚙️' }
  ];

  constructor() {
    this.filteredItems = [...this.navItems];
  }

  onSearch() {
    if (!this.searchQuery) {
      this.filteredItems = [...this.navItems];
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.filteredItems = this.navItems.filter(item => {
      if (item.type === 'header') return false; // Don't filter out headers if they match? Actually, let's show items that match.
      const match = item.label.toLowerCase().includes(q);
      const childMatch = item.children?.some(c => c.label.toLowerCase().includes(q));
      return match || childMatch;
    });
    // Add headers back for context if needed, but for simplicity let's just show items.
  }

  toggleItem(item: NavItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
