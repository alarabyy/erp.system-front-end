import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  User, Employee, Product, SalesOrder, Supplier, SecurityLog,
  ChatMessage, Lead, Opportunity, BackupRecord, CustomField,
  ErpNotification, Activity, AIInsight, Rule, WorkflowItem,
  SystemJob, Statistics, LedgerAccount, JournalEntry, FixedAsset,
  BOM, ProductionOrder, Project, ProjectTask, Goal, KPI, AutomationRule
} from '../models/data-models';

// ✅ Re-export all models so feature components can import from one file
export { User, Employee, Product, SalesOrder, Supplier, SecurityLog } from '../models/data-models';
export { ChatMessage, Lead, Opportunity, BackupRecord, CustomField } from '../models/data-models';
export { Activity, AIInsight, Rule, WorkflowItem } from '../models/data-models';
export { SystemJob, Statistics, LedgerAccount, JournalEntry, FixedAsset } from '../models/data-models';
export { BOM, ProductionOrder, Project, ProjectTask, Goal, KPI, AutomationRule } from '../models/data-models';
export { ErpNotification as Notification, ErpNotification } from '../models/data-models';

@Injectable({ providedIn: 'root' })
export class DataMockService {

  // ===== USERS =====
  private users: User[] = [
    { id: '1', name: 'أحمد محمد', email: 'ahmed@quantum.app', role: 'admin', department: 'تقنية المعلومات', status: 'active', avatar: 'أ', joinDate: '2023-01-15' },
    { id: '2', name: 'سارة علي', email: 'sara@quantum.app', role: 'manager', department: 'المبيعات', status: 'active', avatar: 'س', joinDate: '2023-03-20' },
    { id: '3', name: 'محمد حسن', email: 'hassan@quantum.app', role: 'employee', department: 'الموارد البشرية', status: 'active', avatar: 'م', joinDate: '2023-06-01' },
    { id: '4', name: 'فاطمة خالد', email: 'fatima@quantum.app', role: 'accountant', department: 'المالية', status: 'inactive', avatar: 'ف', joinDate: '2022-11-10' },
    { id: '5', name: 'عمر إبراهيم', email: 'omar@quantum.app', role: 'employee', department: 'المستودعات', status: 'active', avatar: 'ع', joinDate: '2024-02-01' },
  ];

  // ===== EMPLOYEES =====
  private employees: Employee[] = [
    { id: '1', name: 'خالد السيد', email: 'khaled@quantum.app', role: 'employee', department: 'المبيعات', status: 'active', avatar: 'خ', phone: '0501234567', position: 'مدير مبيعات', salary: 12000, startDate: '2022-06-01', performance: 92, attendanceRate: 97 },
    { id: '2', name: 'نورا أحمد', email: 'nora@quantum.app', role: 'employee', department: 'تقنية المعلومات', status: 'active', avatar: 'ن', phone: '0509876543', position: 'مطورة قواعد بيانات', salary: 15000, startDate: '2021-09-15', performance: 88, attendanceRate: 95 },
    { id: '3', name: 'تامر محمود', email: 'tamer@quantum.app', role: 'employee', department: 'الموارد البشرية', status: 'on_leave', avatar: 'ت', phone: '0507654321', position: 'مسؤول توظيف', salary: 9500, startDate: '2023-03-01', performance: 75, attendanceRate: 85 },
    { id: '4', name: 'ريم عبدالله', email: 'reem@quantum.app', role: 'employee', department: 'المالية', status: 'active', avatar: 'ر', phone: '0502345678', position: 'محاسبة رئيسية', salary: 11000, startDate: '2020-01-10', performance: 95, attendanceRate: 99 },
    { id: '5', name: 'بلال يوسف', email: 'bilal@quantum.app', role: 'employee', department: 'التسويق', status: 'active', avatar: 'ب', phone: '0503456789', position: 'مدير تسويق رقمي', salary: 13000, startDate: '2022-11-20', performance: 80, attendanceRate: 91 },
  ];

  // ===== PRODUCTS =====
  private products: Product[] = [
    { id: '1', name: 'آيفون 15 برو ماكس', sku: 'APPL-001', category: 'إلكترونيات', price: 5999, stock: 150, status: 'active', performance: 95 },
    { id: '2', name: 'سامسونج S24 ألترا', sku: 'SAM-002', category: 'إلكترونيات', price: 4499, stock: 89, status: 'active', performance: 87 },
    { id: '3', name: 'ماك بوك برو M3', sku: 'APPL-003', category: 'حواسيب', price: 9999, stock: 45, status: 'active', performance: 91 },
    { id: '4', name: 'سماعات سوني WH-1000XM5', sku: 'SONY-004', category: 'صوتيات', price: 1299, stock: 0, status: 'out_of_stock', performance: 78 },
    { id: '5', name: 'آيباد برو OLED', sku: 'APPL-005', category: 'إلكترونيات', price: 4199, stock: 210, status: 'active', performance: 83 },
    { id: '6', name: 'شاشة LG OLED 4K', sku: 'LG-006', category: 'شاشات', price: 3200, stock: 30, status: 'active', performance: 72 },
  ];

  // ===== SALES ORDERS =====
  private salesOrders: SalesOrder[] = [
    { id: '1', orderNo: 'ORD-2024-001', customer: 'شركة تك نيكسوس', date: '2024-12-01', total: 45600, items: 12, status: 'delivered', paymentStatus: 'paid', region: 'الرياض' },
    { id: '2', orderNo: 'ORD-2024-002', customer: 'المستقبل الرقمي', date: '2024-12-03', total: 22800, items: 7, status: 'processing', paymentStatus: 'pending', region: 'جدة' },
    { id: '3', orderNo: 'ORD-2024-003', customer: 'مؤسسة الرقم الذكي', date: '2024-12-05', total: 12400, items: 3, status: 'shipped', paymentStatus: 'partial', region: 'الدمام' },
    { id: '4', orderNo: 'ORD-2024-004', customer: 'نورا التجارية', date: '2024-12-08', total: 8900, items: 5, status: 'pending', paymentStatus: 'pending', region: 'الرياض' },
    { id: '5', orderNo: 'ORD-2024-005', customer: 'البيان للتقنية', date: '2024-12-10', total: 33700, items: 9, status: 'cancelled', paymentStatus: 'refunded', region: 'جدة' },
  ];

  // ===== SUPPLIERS =====
  private suppliers: Supplier[] = [
    { id: '1', name: 'أبل العربية', contactPerson: 'عمر الحسن', email: 'omar@apple-ar.com', phone: '0501112222', category: 'إلكترونيات', country: 'السعودية', totalOrders: 145, status: 'active' },
    { id: '2', name: 'سامسونج الخليج', contactPerson: 'ليلى أحمد', email: 'leila@samsung-gulf.com', phone: '0502223333', category: 'إلكترونيات', country: 'الإمارات', totalOrders: 89, status: 'active' },
    { id: '3', name: 'سوني العالمية', contactPerson: 'كريم يوسف', email: 'karim@sony-int.com', phone: '0503334444', category: 'صوتيات', country: 'الكويت', totalOrders: 52, status: 'active' },
    { id: '4', name: 'إل جي الشرق الأوسط', contactPerson: 'فريدة عبدالله', email: 'farida@lg-me.com', phone: '0504445555', category: 'شاشات', country: 'البحرين', totalOrders: 37, status: 'inactive' },
  ];

  // ===== LEADS =====
  private leads: Lead[] = [
    { id: '1', name: 'محمد الشهراني', company: 'شركة الفجر للتقنية', email: 'm.shahrani@alfajr.com', phone: '0512345678', value: 85000, source: 'موقع إلكتروني', status: 'hot' },
    { id: '2', name: 'أميرة الحربي', company: 'الحربي للاستشارات', email: 'a.harbi@consult.com', phone: '0523456789', value: 42000, source: 'مؤتمر', status: 'warm' },
    { id: '3', name: 'فهد العتيبي', company: 'العتيبي للتوزيع', email: 'f.otaibi@dist.com', phone: '0534567890', value: 120000, source: 'إحالة', status: 'hot' },
    { id: '4', name: 'نادية السالم', company: 'مجموعة السالم', email: 'n.salem@salimgroup.com', phone: '0545678901', value: 29000, source: 'حملة إعلانية', status: 'cold' },
  ];

  // ===== OPPORTUNITIES =====
  private opportunities: Opportunity[] = [
    { id: '1', title: 'عقد توريد أجهزة تقنية 2025', customer: 'شركة تك نيكسوس', stage: 'proposal', closeDate: '2025-02-28', value: 250000, probability: 75, status: 'open' },
    { id: '2', title: 'تحديث منظومة الحواسيب', customer: 'البيان للتقنية', stage: 'negotiation', closeDate: '2025-01-31', value: 180000, probability: 60, status: 'open' },
    { id: '3', title: 'توريد شاشات لمشروع المطار', customer: 'مؤسسة الرقم الذكي', stage: 'closed_won', closeDate: '2024-12-15', value: 320000, probability: 100, status: 'won' },
    { id: '4', title: 'تجهيز قاعة اجتماعات', customer: 'الحربي للاستشارات', stage: 'discovery', closeDate: '2025-03-15', value: 55000, probability: 30, status: 'open' },
  ];

  // ===== NOTIFICATIONS =====
  private notifications: ErpNotification[] = [
    { id: '1', title: 'طلب شراء جديد', message: 'تم استلام طلب شراء جديد بقيمة 45,600 ريال من شركة تك نيكسوس', time: 'منذ 5 دقائق', read: false, type: 'info' },
    { id: '2', title: 'تحذير: مخزون منخفض', message: 'سماعات سوني WH-1000XM5 نفدت من المخزون! يرجى رفع طلب توريد فوري', time: 'منذ 22 دقيقة', read: false, type: 'warning' },
    { id: '3', title: 'تمت عملية بيع بنجاح', message: 'تم شحن الطلب ORD-2024-003 وتسليمه للعميل بنجاح', time: 'منذ ساعة', read: true, type: 'success' },
    { id: '4', title: 'صلاحية انتهت', message: 'انتهت صلاحية مستخدم فاطمة خالد. يلزم تجديد الحساب', time: 'منذ 3 ساعات', read: true, type: 'danger' },
    { id: '5', title: 'تقرير شهري جاهز', message: 'تم إنشاء التقرير المالي لشهر ديسمبر 2024. اضغط للمراجعة', time: 'اليوم الساعة 9:00 ص', read: true, type: 'info' },
  ];

  // ===== ACTIVITIES =====
  private activities: Activity[] = [
    { id: '1', type: 'order', message: 'طلب جديد من شركة تك نيكسوس بقيمة 45,600 ريال', time: 'منذ 5 دقائق', user: 'أحمد محمد', amount: 45600 },
    { id: '2', type: 'stock', message: 'تحديث مخزون آيفون 15 برو ماكس — تمت إضافة 50 قطعة', time: 'منذ 18 دقيقة', user: 'عمر إبراهيم' },
    { id: '3', type: 'user', message: 'تسجيل دخول مشبوه من عنوان IP جديد — تم تأمين الحساب', time: 'منذ 35 دقيقة', user: 'النظام' },
    { id: '4', type: 'order', message: 'شحن طلب ORD-2024-003 لمؤسسة الرقم الذكي', time: 'منذ ساعة', user: 'سارة علي', amount: 12400 },
    { id: '5', type: 'system', message: 'اكتملت نسخة احتياطية تلقائية للنظام بنجاح', time: 'منذ 2 ساعة', user: 'النظام' },
    { id: '6', type: 'order', message: 'إلغاء طلب ORD-2024-005 وإعادة المبلغ للعميل', time: 'منذ 3 ساعات', user: 'محمد حسن', amount: 33700 },
  ];

  // ===== AI INSIGHTS =====
  private aiInsights: AIInsight[] = [
    { id: '1', title: 'فرصة بيع مرتفعة الأولوية', description: 'الطلب على آيفون 15 ارتفع 40% هذا الأسبوع — ينصح برفع المخزون وإطلاق حملة ترويجية فورية', impact: 'high', type: 'opportunity', severity: 'high', time: 'اليوم 10:00 ص' },
    { id: '2', title: 'انحراف في المصروفات', description: 'مصروفات قسم التسويق تجاوزت الميزانية الشهرية بنسبة 18% — يُنصح بمراجعة بنود الإنفاق', impact: 'medium', type: 'warning', severity: 'medium', time: 'الأمس 3:00 م' },
    { id: '3', title: 'نمو المبيعات — اتجاه ممتاز', description: 'الإيرادات في اتجاه تصاعدي بمعدل 12.4% مقارنة بالشهر الماضي — أفضل أداء في 2024', impact: 'positive', type: 'trend', severity: 'low', time: 'قبل يومين' },
    { id: '4', title: 'خطر في سلسلة التوريد', description: 'أحد الموردين الرئيسيين تأخر في 3 توريدات متتالية — يُوصى بتفعيل مورد بديل', impact: 'high', type: 'warning', severity: 'high', time: 'قبل 3 أيام' },
  ];

  // ===== BACKUPS =====
  private backups: BackupRecord[] = [
    { id: '1', name: 'قاعدة البيانات الرئيسية', date: '2024-12-10 02:00', size: '4.2 GB', status: 'success', type: 'auto' },
    { id: '2', name: 'ملفات النظام والإعدادات', date: '2024-12-09 02:00', size: '1.1 GB', status: 'success', type: 'auto' },
    { id: '3', name: 'نسخة يدوية - قبل التحديث', date: '2024-12-08 14:30', size: '3.8 GB', status: 'success', type: 'manual' },
    { id: '4', name: 'نسخة احتياطية أسبوعية', date: '2024-12-07 02:00', size: '4.0 GB', status: 'failed', type: 'auto' },
  ];

  // ===== CUSTOM FIELDS =====
  private customFields: CustomField[] = [
    { id: '1', name: 'customer_vip', type: 'boolean', module: 'crm', label: 'عميل VIP', required: false },
    { id: '2', name: 'product_origin', type: 'text', module: 'inventory', label: 'بلد المنشأ', required: true },
    { id: '3', name: 'order_priority', type: 'select', module: 'sales', label: 'أولوية الطلب', required: false },
    { id: '4', name: 'employee_badge', type: 'number', module: 'hr', label: 'رقم الشارة', required: true },
  ];

  // ===== SYSTEM JOBS =====
  private jobs: SystemJob[] = [
    { id: '1', title: 'نسخ احتياطي', status: 'active', progress: 100, name: 'backup_daily', schedule: 'يومياً 2:00 ص', lastRun: '2024-12-10 02:00', nextRun: '2024-12-11 02:00' },
    { id: '2', title: 'إرسال تقارير', status: 'active', progress: 100, name: 'report_weekly', schedule: 'أسبوعياً الأحد', lastRun: '2024-12-08 08:00', nextRun: '2024-12-15 08:00' },
    { id: '3', title: 'تنظيف الكاش', status: 'running', progress: 65, name: 'cache_clear', schedule: 'يومياً 3:00 ص', lastRun: '2024-12-10 03:00', nextRun: '2024-12-11 03:00' },
    { id: '4', title: 'مزامنة المخزون', status: 'idle', progress: 0, name: 'inventory_sync', schedule: 'كل 6 ساعات', lastRun: '2024-12-10 12:00', nextRun: '2024-12-10 18:00' },
  ];

  // ===== SECURITY LOGS =====
  private securityLogs: SecurityLog[] = [
    { id: '1', user: 'أحمد محمد', action: 'تسجيل دخول ناجح', ip: '192.168.1.10', time: '2024-12-10 09:15', status: 'success' },
    { id: '2', user: 'مجهول', action: 'محاولة دخول فاشلة', ip: '203.40.25.111', time: '2024-12-10 08:42', status: 'failed' },
    { id: '3', user: 'سارة علي', action: 'تعديل صلاحيات مستخدم', ip: '192.168.1.15', time: '2024-12-09 14:30', status: 'warning' },
    { id: '4', user: 'فاطمة خالد', action: 'تصدير بيانات مالية', ip: '192.168.1.22', time: '2024-12-09 11:00', status: 'success' },
  ];

  // ===== LEDGER ACCOUNTS =====
  private accounts: LedgerAccount[] = [
    { id: '1', code: '1010', name: 'الصندوق النقدي', type: 'asset', balance: 125000, status: 'active' },
    { id: '2', code: '1020', name: 'حساب البنك الرئيسي', type: 'asset', balance: 850000, status: 'active' },
    { id: '3', code: '2010', name: 'حسابات الموردين', type: 'liability', balance: 340000, status: 'active' },
    { id: '4', code: '3010', name: 'رأس المال', type: 'equity', balance: 1200000, status: 'active' },
    { id: '5', code: '4010', name: 'إيرادات المبيعات', type: 'income', balance: 650000, status: 'active' },
    { id: '6', code: '5010', name: 'مصروفات التشغيل', type: 'expense', balance: 275000, status: 'active' },
  ];

  // ===== BOMs =====
  private boms: BOM[] = [
    { id: '1', product: 'كرسي مكتبي برو', code: 'BOM-CH-01', version: '1.2', components: [{ item: 'قماش جلدي', quantity: 2, unit: 'متر' }, { item: 'إسفنج عالي الكثافة', quantity: 1, unit: 'كجم' }], status: 'active' },
    { id: '2', product: 'طاولة اجتماعات كبيرة', code: 'BOM-TB-02', version: '2.0', components: [{ item: 'خشب MDF', quantity: 4, unit: 'لوح' }, { item: 'قواعد معدنية', quantity: 4, unit: 'قطعة' }], status: 'active' },
  ];

  // ===== PROJECTS =====
  private projects: Project[] = [
    { id: '1', name: 'تطوير تطبيق الجوال', client: 'شركة تك نيكسوس', manager: 'سارة علي', budget: 150000, startDate: '2024-05-01', endDate: '2025-03-31', progress: 68, status: 'ongoing' },
    { id: '2', name: 'إعادة هيكلة شبكة الاتصالات', client: 'البيان للتقنية', manager: 'نورا أحمد', budget: 85000, startDate: '2024-09-01', endDate: '2025-01-31', progress: 90, status: 'ongoing' },
    { id: '3', name: 'إطلاق البوابة الإلكترونية', client: 'الحربي للاستشارات', manager: 'أحمد محمد', budget: 42000, startDate: '2024-03-01', endDate: '2024-11-30', progress: 100, status: 'completed' },
  ];

  // ===== RULES =====
  private rules: Rule[] = [
    { id: '1', name: 'تنبيه مخزون منخفض', description: 'إرسال إشعار عند انخفاض المخزون دون 10 وحدات', isActive: true, priority: 'high', condition: 'stock < 10', action: 'send_notification', status: 'active' },
    { id: '2', name: 'خصم العملاء المميزين', description: 'تطبيق خصم 15% على طلبات العملاء VIP', isActive: true, priority: 'medium', condition: 'customer.vip === true', action: 'apply_discount', status: 'active' },
    { id: '3', name: 'تجميد حسابات غير نشطة', description: 'إيقاف الحسابات غير النشطة لأكثر من 90 يوم', isActive: false, priority: 'low', condition: 'last_login > 90days', action: 'suspend_account', status: 'inactive' },
  ];

  // ===== WORKFLOWS =====
  private workflows: WorkflowItem[] = [
    { id: '1', name: 'الموافقة على طلبات الشراء', stage: 'المراجعة المالية', priority: 'high', trigger: 'طلب شراء > 10,000 ريال', status: 'active', lastRun: '2024-12-10', runs: 24 },
    { id: '2', name: 'إعداد ترحيب موظف جديد', stage: 'مكتمل', priority: 'medium', trigger: 'تعيين موظف جديد', status: 'active', lastRun: '2024-12-09', runs: 12 },
    { id: '3', name: 'متابعة العملاء المتأخرين', stage: 'الإرسال التلقائي', priority: 'high', trigger: 'فاتورة متأخرة > 30 يوم', status: 'active', lastRun: '2024-12-10', runs: 87 },
  ];

  // ===== ASSETS =====
  private assets: FixedAsset[] = [
    { id: '1', name: 'لابتوب ماك بوك برو M3', category: 'أجهزة حاسوب', purchaseDate: '2024-01-15', cost: 9999, currentValue: 8500, location: 'مكتب التقنية', custodian: 'نورا أحمد' },
    { id: '2', name: 'خادم HP ProLiant Gen11', category: 'خوادم', purchaseDate: '2023-06-01', cost: 45000, currentValue: 38000, location: 'غرفة الخوادم', custodian: 'أحمد محمد' },
    { id: '3', name: 'سيارة تويوتا لاند كروزر', category: 'مركبات', purchaseDate: '2022-09-20', cost: 280000, currentValue: 220000, location: 'الموقف الرئيسي', custodian: 'محمد حسن' },
  ];

  // ===== PRODUCTION ORDERS =====
  private productionOrders: ProductionOrder[] = [
    { id: '1', orderNo: 'PRD-2024-001', product: 'كرسي مكتبي برو', quantity: 50, startDate: '2024-12-05', endDate: '2024-12-20', progress: 75, status: 'in_progress' },
    { id: '2', orderNo: 'PRD-2024-002', product: 'طاولة اجتماعات', quantity: 10, startDate: '2024-12-08', endDate: '2024-12-25', progress: 30, status: 'in_progress' },
  ];

  // ===== GOALS / OKRs =====
  private goals: Goal[] = [
    { id: '1', title: 'تحقيق مبيعات 2 مليون ريال Q1 2025', owner: 'سارة علي', deadline: '2025-03-31', progress: 45, type: 'company', status: 'ongoing' },
    { id: '2', title: 'تقليص وقت تسليم الطلبات إلى 24 ساعة', owner: 'عمر إبراهيم', deadline: '2025-01-31', progress: 72, type: 'department', status: 'ongoing' },
    { id: '3', title: 'رفع معدل رضا العملاء إلى 95%', owner: 'محمد حسن', deadline: '2025-06-30', progress: 88, type: 'company', status: 'ongoing' },
  ];

  // ===== KPIs =====
  private kpis: KPI[] = [
    { id: '1', name: 'معدل رضا العملاء', target: 95, current: 88, unit: '%', trend: 'up' },
    { id: '2', name: 'وقت تسليم الطلبات', target: 24, current: 31, unit: 'ساعة', trend: 'down' },
    { id: '3', name: 'معدل الاحتفاظ بالموظفين', target: 90, current: 92, unit: '%', trend: 'up' },
    { id: '4', name: 'نسبة تحصيل المديونيات', target: 95, current: 87, unit: '%', trend: 'steady' },
  ];

  // ===== AUTOMATION RULES =====
  private automationRules: AutomationRule[] = [
    { id: '1', name: 'إرسال إيميل ترحيب للعميل الجديد', trigger: 'إنشاء عميل جديد', action: 'إرسال بريد إلكتروني ترحيبي', isActive: true, lastRun: '2024-12-10 09:00' },
    { id: '2', name: 'إشعار انخفاض المخزون', trigger: 'مخزون المنتج < 10', action: 'إرسال إشعار لمدير المستودع', isActive: true, lastRun: '2024-12-09 17:30' },
    { id: '3', name: 'تذكير الموردين المتأخرين', trigger: 'فاتورة متأخرة > 15 يوم', action: 'إرسال تذكير تلقائي للمورد', isActive: false },
  ];

  // ================================================================
  // SERVICE METHODS
  // ================================================================

  getUsers(): Observable<User[]> { return of(this.users); }
  getEmployees(): Observable<Employee[]> { return of(this.employees); }
  getProducts(): Observable<Product[]> { return of(this.products); }
  getSalesOrders(): Observable<SalesOrder[]> { return of(this.salesOrders); }
  getSuppliers(): Observable<Supplier[]> { return of(this.suppliers); }
  getLeads(): Observable<Lead[]> { return of(this.leads); }
  getOpportunities(): Observable<Opportunity[]> { return of(this.opportunities); }
  getNotifications(): Observable<ErpNotification[]> { return of(this.notifications); }
  getActivities(): Observable<Activity[]> { return of(this.activities); }
  getAIInsights(): Observable<AIInsight[]> { return of(this.aiInsights); }
  getBackups(): Observable<BackupRecord[]> { return of(this.backups); }
  getCustomFields(): Observable<CustomField[]> { return of(this.customFields); }
  getJobs(): Observable<SystemJob[]> { return of(this.jobs); }
  getSecurityLogs(): Observable<SecurityLog[]> { return of(this.securityLogs); }
  getAccounts(): Observable<LedgerAccount[]> { return of(this.accounts); }
  getBOMs(): Observable<BOM[]> { return of(this.boms); }
  getProjects(): Observable<Project[]> { return of(this.projects); }
  getRules(): Observable<Rule[]> { return of(this.rules); }
  getWorkflows(): Observable<WorkflowItem[]> { return of(this.workflows); }
  getAssets(): Observable<FixedAsset[]> { return of(this.assets); }
  getProductionOrders(): Observable<ProductionOrder[]> { return of(this.productionOrders); }
  getGoals(): Observable<Goal[]> { return of(this.goals); }
  getKPIs(): Observable<KPI[]> { return of(this.kpis); }
  getAutomationRules(): Observable<AutomationRule[]> { return of(this.automationRules); }

  getStats(): Observable<Statistics> {
    return of({
      totalRevenue: 1240000, revenueGrowth: 14.2, monthlyOrders: 1842, ordersGrowth: 8.7,
      totalUsers: 354, lowStockAlerts: 4, sales: '$1.24M', revenue: '+14.2%', customers: '950+', orders: '1,842'
    });
  }
  getDashboardStats(): Observable<Statistics> { return this.getStats(); }

  getRecommendations(): Observable<any[]> { return of([]); }
  getSimulation(p: number, q: number, c: number): Observable<any> { return of({}); }
  getJournalEntries(): Observable<JournalEntry[]> { return of([]); }
  getProjectTasks(projectId: string): Observable<ProjectTask[]> { return of([]); }

  // By-ID helpers
  getUserById(id: string): Observable<User | undefined> { return of(this.users.find(u => u.id === id)); }
  getEmployeeById(id: string): Observable<Employee | undefined> { return of(this.employees.find(e => e.id === id)); }
  getSupplierById(id: string): Observable<Supplier | undefined> { return of(this.suppliers.find(s => s.id === id)); }
  getSalesOrderById(id: string): Observable<SalesOrder | undefined> { return of(this.salesOrders.find(o => o.id === id)); }
  getLeadById(id: string): Observable<Lead | undefined> { return of(this.leads.find(l => l.id === id)); }

  // Mutations (mock)
  sendMessage(userId: string, content: string): void { console.log('[Mock] Message sent', { userId, content }); }
  markNotificationAsRead(id: string): void { const n = this.notifications.find(x => x.id === id); if (n) n.read = true; }
  getUnreadNotificationsCount(): Observable<number> { return of(this.notifications.filter(n => !n.read).length); }
  getChatMessages(userId: string): Observable<ChatMessage[]> { return of([]); }
  runJob(jobName: string): void { console.log('[Mock] Running job:', jobName); }
}
