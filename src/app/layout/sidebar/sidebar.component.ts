import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface NavItem {
  label: string;
  icon: string;
  path?: string;
  expanded?: boolean;
  badge?: string;
  iconColor?: string;
  children?: NavItem[];
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  searchQuery = '';
  filteredItems: NavItem[] = [];

  navItems: NavItem[] = [
    {
      label: 'التجارة والمبيعات',
      icon: '🛒',
      expanded: true,
      children: [
        { label: 'المبيعات والأوردرات', path: '/sales', icon: '🛒', iconColor: '#10b981' },
        { label: 'المشتريات والموردين', path: '/purchases', icon: '📦', iconColor: '#f59e0b' },
        { label: 'المخازن والأصناف', path: '/products', icon: '🏬', iconColor: '#6366f1' },
        { label: 'إدارة العملاء CRM', path: '/crm', icon: '👥', iconColor: '#ec4899' },
        { label: 'مدير الملفات', path: '/files', icon: '📁', iconColor: '#22c55e' }
      ]
    },
    {
      label: 'نقطة البيع (POS)',
      icon: '⚡',
      expanded: true,
      children: [
        { label: 'واجهة البيع السريع', path: '/pos/checkout', icon: '⚡', iconColor: '#2563eb' },
        { label: 'سجل فواتير الـ POS', path: '/pos/orders', icon: '🧾', iconColor: '#10b981' },
        { label: 'إحصائيات المبيعات', path: '/pos/analytics', icon: '📊', iconColor: '#f59e0b' },
        { label: 'جلسات الكاشير', path: '/pos/sessions', icon: '🏪', iconColor: '#7c3aed' },
        { label: 'عملاء الكاشير', path: '/pos/customers', icon: '👥', iconColor: '#ec4899' },
        { label: 'إعدادات نقطة البيع', path: '/pos/settings', icon: '⚙️', iconColor: '#64748b' }
      ]
    },
    {
      label: 'المالية والأصول',
      icon: '💰',
      expanded: false,
      children: [
        { label: 'الحسابات العامة GL', path: '/finance/ledger', icon: '📔', iconColor: '#3b82f6' },
        { label: 'القيود المحاسبية', path: '/finance/journals', icon: '📑', iconColor: '#64748b' },
        { label: 'إدارة الأصول الثابتة', path: '/finance/assets', icon: '🏛️', iconColor: '#f43f5e' }
      ]
    },
    {
      label: 'الإنتاج والمشاريع',
      icon: '🏭',
      expanded: false,
      children: [
        { label: 'إدارة التصنيع MRP', path: '/production/bom', icon: '⚙️', iconColor: '#334155' },
        { label: 'أوامر الإنتاج', path: '/production/orders', icon: '🛠️', iconColor: '#475569' },
        { label: 'إدارة المشاريع', path: '/projects/list', icon: '🏗️', iconColor: '#0ea5e9' }
      ]
    },
    {
      label: 'الموارد والأداء',
      icon: '👤',
      expanded: false,
      children: [
        { label: 'شؤون الموظفين HR', path: '/hr', icon: '👔', iconColor: '#10b981' },
        { label: 'المستخدمين والصلاحيات', path: '/users', icon: '🔐', iconColor: '#f43f5e' },
        { label: 'الأداء والتقييم KPI', path: '/performance', icon: '📈', iconColor: '#f59e0b' }
      ]
    },
    {
      label: 'الذكاء والأتمتة',
      icon: '🧠',
      expanded: false,
      children: [
        { label: 'ذكاء الأعمال AI', path: '/ai', icon: '✨', iconColor: '#8b5cf6' },
        { label: 'أتمتة العمليات', path: '/automation', icon: '⚡', iconColor: '#f59e0b' },
        { label: 'المساعد الذكي Q', path: '/chat', icon: '💬', iconColor: '#3b82f6' }
      ]
    },
    {
      label: 'التواصل والسيستم',
      icon: '🌐',
      expanded: false,
      children: [
        { label: 'الإشعارات والتنبيهات', path: '/notifications', icon: '🔔', iconColor: '#f43f5e' },
        { label: 'الأمان والرقابة', path: '/security', icon: '🛡️', iconColor: '#0f172a' },
        { label: 'سجلات النشاط', path: '/security/audit-logs', icon: '📑', iconColor: '#94a3b8' },
        { label: 'إدارة النسخ الاحتياطي', path: '/backup', icon: '💾', iconColor: '#64748b' }
      ]
    }
  ];

  constructor(private router: Router) {}

  toggleItem(item: NavItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  onSearch() {
    if (!this.searchQuery) {
      this.filteredItems = [];
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.filteredItems = [];
    this.navItems.forEach(group => {
      const children = (group.children || []).filter(c => c.label.toLowerCase().includes(q));
      if (children.length > 0) {
        this.filteredItems.push({ ...group, children, expanded: true });
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
