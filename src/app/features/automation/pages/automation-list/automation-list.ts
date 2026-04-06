import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Workflow {
  id: string;
  name: string;
  desc: string;
  triggerIcon: string;
  actionIcon: string;
  runsToday: number;
  lastRun: string;
  active: boolean;
  category: string;
  successRate: number;
}

interface AutomationLog {
  status: 'success' | 'warn' | 'error';
  time: string;
  workflow: string;
  msg: string;
}

@Component({
  selector: 'app-automation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automation-list.html',
  styleUrls: ['./automation-list.scss'],
})
export class AutomationList implements OnInit {
  
  workflows: Workflow[] = [
    {
      id: '1', name: 'أتمتة الفواتير الضريبية', desc: 'عند استلام أمر بيع مكتمل، قم بإنشاء فاتورة PDF وإرسالها للعميل تلقائياً.',
      triggerIcon: '📄', actionIcon: '✉️', runsToday: 42, lastRun: 'قبل دقيقتين', active: true, category: 'المالية', successRate: 100
    },
    {
      id: '2', name: 'إعادة تعبئة المخزون (MRP)', desc: 'عند وصول صنف إلى حد الطلب الأدنى، أنشئ طلب شراء للمورد الأساسي.',
      triggerIcon: '📦', actionIcon: '📝', runsToday: 5, lastRun: 'قبل ساعة', active: true, category: 'المخازن', successRate: 98
    },
    {
      id: '3', name: 'مزامنة الموظفين مع Slack', desc: 'عند إضافة موظف جديد لـ HR، قم بإنشاء حساب له على Slack وإضافته لعام.',
      triggerIcon: '👔', actionIcon: '💬', runsToday: 0, lastRun: 'أمس', active: false, category: 'الموارد البشرية', successRate: 100
    },
    {
      id: '4', name: 'تنبيهات الجودة للمصنع', desc: 'عند حدوث عطل في خط الإنتاج، أرسل رسالة فورية لمدير الصيانة.',
      triggerIcon: '⚙️', actionIcon: '🚨', runsToday: 3, lastRun: 'قبل 45 دقيقة', active: true, category: 'التصنيع', successRate: 100
    }
  ];

  logs: AutomationLog[] = [
    { status: 'success', time: '10:45 AM', workflow: 'أتمتة الفواتير', msg: 'تم إصدار الفاتورة #INV-501 وإرسالها' },
    { status: 'success', time: '10:30 AM', workflow: 'تنبيهات الجودة', msg: 'تم إخطار الصيانة بوجود عطل في الخط B' },
    { status: 'warn', time: '09:15 AM', workflow: 'إعادة تعبئة المخزون', msg: 'تأخر استلام تأكيد المورد (محاولة ثانية)' },
    { status: 'error', time: '08:00 AM', workflow: 'مزامنة الموظفين', msg: 'فشل المزامنة مع Slack (خطأ API 403)' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
