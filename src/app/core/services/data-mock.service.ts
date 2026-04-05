import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import { Product } from '../../features/products/models/product.model';
export type { Product };

// ── Interfaces ──────────────────────────────────────────────────────────────
export interface Statistics {
  totalRevenue: number; monthlyOrders: number; totalUsers: number;
  lowStockAlerts: number; revenueGrowth: number; ordersGrowth: number;
  netProfit: number; growthRate: number;
}
export type ActivityType = 'order'|'stock'|'supplier'|'alert'|'user'|'payment'|'system'|'backup';
export interface Activity { id:string; type:ActivityType; message:string; time:string; user:string; amount?:number; }
export interface User { id:string; name:string; email:string; role:'admin'|'manager'|'employee'|'viewer'; department:string; status:'active'|'inactive'; joinDate:string; avatar:string; lastLogin?:string; }
export interface SalesOrder { id:string; orderNo:string; customer:string; date:string; total:number; status:'pending'|'confirmed'|'shipped'|'delivered'|'cancelled'; items:number; paymentStatus:'paid'|'partial'|'unpaid'; region?:string; }
export interface Supplier { id:string; name:string; contactPerson:string; email:string; phone:string; country:string; status:'active'|'inactive'; totalOrders:number; }
export interface PurchaseOrder { id:string; poNo:string; supplier:string; date:string; total:number; status:'draft'|'sent'|'received'|'cancelled'; items:number; }
export interface Employee { id:string; name:string; department:string; position:string; salary:number; status:'active'|'on_leave'|'terminated'; startDate:string; email:string; attendanceRate?:number; performance?:number; }
export interface Lead { id:string; name:string; company:string; email:string; phone:string; status:'new'|'contacted'|'qualified'|'proposal'|'won'|'lost'; value:number; source:string; }
export interface WorkflowItem { id:string; name:string; trigger:string; status:'active'|'inactive'|'draft'; lastRun:string; runs:number; }
export interface SecurityLog { id:string; user:string; action:string; ip:string; time:string; status:'success'|'failed'|'warning'; }
export interface BackupRecord { id:string; name:string; size:string; date:string; type:'auto'|'manual'; status:'success'|'failed'|'running'; }
export interface AIInsight { id:string; title:string; description:string; type:'warning'|'opportunity'|'trend'|'anomaly'; severity:'high'|'medium'|'low'; time:string; }
export interface SystemJob { id:string; name:string; schedule:string; lastRun:string; status:'active'|'paused'|'failed'; nextRun:string; }
export interface CustomField { id:string; name:string; label:string; type:'text'|'number'|'date'|'select'|'checkbox'; module:string; required:boolean; }
export interface Rule { id:string; name:string; condition:string; action:string; status:'active'|'inactive'; priority:number; }
export interface Opportunity { id:string; title:string; customer:string; value:number; stage:'discovery'|'proposal'|'negotiation'|'closed_won'|'closed_lost'; probability:number; closeDate:string; }
export interface Invoice { id:string; invoiceNo:string; customer:string; amount:number; date:string; dueDate:string; status:'paid'|'unpaid'|'overdue'|'draft'; }
export interface ChatMessage { id:string; senderId:string; receiverId:string; content:string; time:string; status:'sent'|'delivered'|'read'; }
export interface Notification { id:string; title:string; message:string; time:string; type:'info'|'warning'|'success'|'danger'; read:boolean; }

@Injectable({ providedIn: 'root' })
export class DataMockService {

  // ── Products ─────────────────────────────────────────────────────────────
  private _products$ = new BehaviorSubject<Product[]>([
    { id:'1', name:'لابتوب ماك بوك برو M3', category:'أجهزة كمبيوتر', price:3499, stock:45, status:'In Stock', sku:'MAC-14-M3M' },
    { id:'2', name:'آيفون 15 برو تيتانيوم', category:'هواتف محمولة', price:1099, stock:120, status:'In Stock', sku:'IPH-15P-L' },
    { id:'3', name:'شاشة استوديو نانو', category:'شاشات', price:1899, stock:8, status:'Low Stock', sku:'DISP-SD-27' },
    { id:'4', name:'سماعات إيربودز ماكس', category:'صوتيات', price:549, stock:0, status:'Out of Stock', sku:'AUD-APM-S' },
    { id:'5', name:'آيباد برو OLED الجديد', category:'أجهزة لوحية', price:1299, stock:65, status:'In Stock', sku:'IPAD-13-M4' },
    { id:'6', name:'لوحة مفاتيح ماجيك', category:'إكسسوارات', price:299, stock:210, status:'In Stock', sku:'ACC-MKB-F' },
    { id:'7', name:'ساعة آبل الترا 2', category:'ساعات ذكية', price:799, stock:12, status:'Low Stock', sku:'WATCH-U2-B' },
    { id:'8', name:'ماوس ماجيك 3', category:'إكسسوارات', price:129, stock:0, status:'Out of Stock', sku:'ACC-MM3-W' },
  ]);

  // ── Users ─────────────────────────────────────────────────────────────────
  private _users$ = new BehaviorSubject<User[]>([
    { id:'1', name:'أحمد محمد الرشيد', email:'ahmed@quantumerp.com', role:'admin', department:'تقنية المعلومات', status:'active', joinDate:'2023-01-15', avatar:'أح', lastLogin:'منذ 5 دقائق' },
    { id:'2', name:'سارة الخليل', email:'sara@quantumerp.com', role:'manager', department:'المبيعات', status:'active', joinDate:'2023-03-20', avatar:'سا', lastLogin:'منذ ساعة' },
    { id:'3', name:'محمد التركي', email:'turki@quantumerp.com', role:'employee', department:'المستودعات', status:'active', joinDate:'2023-06-01', avatar:'مح', lastLogin:'منذ 3 ساعات' },
    { id:'4', name:'نورة السالم', email:'noura@quantumerp.com', role:'viewer', department:'المحاسبة', status:'inactive', joinDate:'2022-11-10', avatar:'نو', lastLogin:'منذ أسبوع' },
    { id:'5', name:'عمر الفهد', email:'omar@quantumerp.com', role:'employee', department:'المشتريات', status:'active', joinDate:'2024-01-05', avatar:'عم', lastLogin:'منذ يوم' },
    { id:'6', name:'ريم العبدالله', email:'reem@quantumerp.com', role:'manager', department:'الموارد البشرية', status:'active', joinDate:'2024-02-10', avatar:'ري', lastLogin:'منذ ساعتين' },
  ]);

  // ── Sales Orders ──────────────────────────────────────────────────────────
  private _orders$ = new BehaviorSubject<SalesOrder[]>([
    { id:'1', orderNo:'ORD-2026-0081', customer:'شركة تك نيكسوس', date:'2026-04-01', total:45600, status:'delivered', items:5, paymentStatus:'paid', region:'الرياض' },
    { id:'2', orderNo:'ORD-2026-0082', customer:'مؤسسة الرقم الذكي', date:'2026-04-03', total:12400, status:'shipped', items:2, paymentStatus:'paid', region:'جدة' },
    { id:'3', orderNo:'ORD-2026-0083', customer:'مجموعة الأفق للتجارة', date:'2026-04-04', total:8900, status:'confirmed', items:3, paymentStatus:'partial', region:'الدمام' },
    { id:'4', orderNo:'ORD-2026-0084', customer:'شركة النخبة للإلكترونيات', date:'2026-04-05', total:31500, status:'pending', items:7, paymentStatus:'unpaid', region:'أبوظبي' },
    { id:'5', orderNo:'ORD-2026-0085', customer:'مؤسسة الحلول التقنية', date:'2026-04-05', total:6700, status:'cancelled', items:1, paymentStatus:'unpaid', region:'دبي' },
    { id:'6', orderNo:'ORD-2026-0086', customer:'شركة المستقبل الرقمي', date:'2026-04-06', total:22800, status:'confirmed', items:4, paymentStatus:'paid', region:'الرياض' },
    { id:'7', orderNo:'ORD-2026-0087', customer:'مجموعة البيان التجارية', date:'2026-04-06', total:15300, status:'pending', items:3, paymentStatus:'unpaid', region:'الكويت' },
  ]);

  // ── Suppliers ──────────────────────────────────────────────────────────────
  private _suppliers$ = new BehaviorSubject<Supplier[]>([
    { id:'1', name:'الشركة العالمية للتقنية', contactPerson:'يوسف العلي', email:'yousuf@globaltech.com', phone:'+966 50 123 4567', country:'السعودية', status:'active', totalOrders:48 },
    { id:'2', name:'مورد الخليج للإلكترونيات', contactPerson:'فاطمة حسن', email:'fatima@gulfsupply.com', phone:'+971 55 987 6543', country:'الإمارات', status:'active', totalOrders:32 },
    { id:'3', name:'شركة الإمداد الذكي', contactPerson:'خالد النباتي', email:'khalid@smartsupply.com', phone:'+965 99 456 7890', country:'الكويت', status:'inactive', totalOrders:15 },
    { id:'4', name:'مؤسسة التقنيات المتطورة', contactPerson:'منى العتيبي', email:'mona@advtech.com', phone:'+966 55 654 3210', country:'السعودية', status:'active', totalOrders:27 },
  ]);

  // ── Employees ─────────────────────────────────────────────────────────────
  private _employees$ = new BehaviorSubject<Employee[]>([
    { id:'1', name:'أحمد الرشيد', department:'تقنية المعلومات', position:'مطور برمجيات', salary:12500, status:'active', startDate:'2023-01-15', email:'ahmed@quantumerp.com', attendanceRate:96, performance:92 },
    { id:'2', name:'سارة الخليل', department:'المبيعات', position:'مديرة مبيعات', salary:9800, status:'active', startDate:'2023-03-20', email:'sara@quantumerp.com', attendanceRate:98, performance:95 },
    { id:'3', name:'محمد التركي', department:'المستودعات', position:'مشرف مستودع', salary:6500, status:'on_leave', startDate:'2023-06-01', email:'turki@quantumerp.com', attendanceRate:82, performance:78 },
    { id:'4', name:'ليلى المطيري', department:'الموارد البشرية', position:'مسؤولة HR', salary:7800, status:'active', startDate:'2022-09-12', email:'layla@quantumerp.com', attendanceRate:99, performance:91 },
    { id:'5', name:'خالد العمري', department:'المحاسبة', position:'محاسب أول', salary:8400, status:'active', startDate:'2023-08-01', email:'khalid@quantumerp.com', attendanceRate:94, performance:88 },
    { id:'6', name:'ريم العبدالله', department:'المبيعات', position:'مندوب مبيعات', salary:5800, status:'active', startDate:'2024-02-10', email:'reem@quantumerp.com', attendanceRate:91, performance:85 },
  ]);

  // ── Leads & Opportunities ─────────────────────────────────────────────────
  private _leads$ = new BehaviorSubject<Lead[]>([
    { id:'1', name:'طارق السويدي', company:'مجموعة الأفق', email:'tariq@ufq.com', phone:'+966501234', status:'qualified', value:85000, source:'موقع إلكتروني' },
    { id:'2', name:'منى العتيبي', company:'شركة النخبة', email:'mona@elite.com', phone:'+971551234', status:'proposal', value:140000, source:'معرض تجاري' },
    { id:'3', name:'عبدالله القحطاني', company:'تك فيجن', email:'abdo@techvision.com', phone:'+965991234', status:'new', value:45000, source:'إحالة عميل' },
    { id:'4', name:'هند الشمري', company:'ديجيتال برو', email:'hind@digitalpro.com', phone:'+966551234', status:'won', value:220000, source:'حملة تسويقية' },
    { id:'5', name:'يونس الأحمدي', company:'سمارت سولوشنز', email:'younis@smart.com', phone:'+966501111', status:'contacted', value:68000, source:'معرض تجاري' },
    { id:'6', name:'دانا الحربي', company:'تك أكاديمي', email:'dana@techacademy.com', phone:'+966551122', status:'lost', value:32000, source:'موقع إلكتروني' },
  ]);

  private _opportunities$ = new BehaviorSubject<Opportunity[]>([
    { id:'1', title:'عقد تطوير نظام ERP', customer:'شركة تك نيكسوس', value:320000, stage:'negotiation', probability:75, closeDate:'2026-05-15' },
    { id:'2', title:'توريد أجهزة شبكات', customer:'مجموعة الأفق', value:185000, stage:'proposal', probability:50, closeDate:'2026-06-01' },
    { id:'3', title:'صيانة سنوية شاملة', customer:'النخبة للإلكترونيات', value:72000, stage:'closed_won', probability:100, closeDate:'2026-04-01' },
    { id:'4', title:'ترخيص برامج Microsoft', customer:'ديجيتال برو', value:48000, stage:'discovery', probability:30, closeDate:'2026-07-01' },
  ]);

  private _invoices$ = new BehaviorSubject<Invoice[]>([
    { id:'1', invoiceNo:'INV-2026-0041', customer:'شركة تك نيكسوس', amount:45600, date:'2026-04-01', dueDate:'2026-05-01', status:'paid' },
    { id:'2', invoiceNo:'INV-2026-0042', customer:'مؤسسة الرقم الذكي', amount:12400, date:'2026-04-03', dueDate:'2026-05-03', status:'paid' },
    { id:'3', invoiceNo:'INV-2026-0043', customer:'مجموعة الأفق', amount:8900, date:'2026-04-04', dueDate:'2026-05-04', status:'unpaid' },
    { id:'4', invoiceNo:'INV-2026-0044', customer:'النخبة للإلكترونيات', amount:31500, date:'2026-04-05', dueDate:'2026-04-20', status:'overdue' },
    { id:'5', invoiceNo:'INV-2026-0045', customer:'مؤسسة الحلول التقنية', amount:6700, date:'2026-04-05', dueDate:'2026-05-05', status:'draft' },
  ]);

  private _workflows$ = new BehaviorSubject<WorkflowItem[]>([
    { id:'1', name:'إشعار عند انخفاض المخزون', trigger:'مخزون < 10', status:'active', lastRun:'منذ ساعة', runs:142 },
    { id:'2', name:'إرسال فاتورة تلقائية', trigger:'عند تسليم الطلب', status:'active', lastRun:'منذ 3 ساعات', runs:89 },
    { id:'3', name:'تذكير بمتابعة العملاء', trigger:'بعد 3 أيام من التواصل', status:'inactive', lastRun:'منذ أسبوع', runs:34 },
    { id:'4', name:'تقرير يومي للمبيعات', trigger:'يومياً الساعة 6م', status:'active', lastRun:'منذ يوم', runs:218 },
    { id:'5', name:'اعتماد الطلبات الكبيرة', trigger:'قيمة الطلب > $10,000', status:'draft', lastRun:'لم يُفعّل بعد', runs:0 },
  ]);

  private _hrEmployees$ = new BehaviorSubject<any[]>([
    { id:'1', name:'أحمد الرشيد', role:'مدير النظام', department:'الإدارة', email:'ahmed@luxe.com', phone:'0501234567', status:'active', joinDate:'2023-01-15' },
    { id:'2', name:'سارة محمود', role:'محاسب رئيسي', department:'المالية', email:'sara@luxe.com', phone:'0507654321', status:'active', joinDate:'2023-03-10' },
    { id:'3', name:'محمد علي', role:'مدير مبيعات', department:'المبيعات', email:'mohamed@luxe.com', phone:'0501112223', status:'active', joinDate:'2023-02-20' },
    { id:'4', name:'ليلى خالد', role:'مدير مستودع', department:'المخزون', email:'layla@luxe.com', phone:'0504445556', status:'active', joinDate:'2023-05-12' },
    { id:'5', name:'ياسين جمال', role:'موظف دعم', department:'الخدمات', email:'yassin@luxe.com', phone:'0509988776', status:'on_leave', joinDate:'2024-01-05' },
  ]);

  private _accountingEntries$ = new BehaviorSubject<any[]>([
    { id:'1', date:'2024-04-01', description:'فاتورة مبيعات #1001', debit:5400, credit:0, account:'المبيعات' },
    { id:'2', date:'2024-04-02', description:'شراء أصول ثابتة - أجهزة', debit:0, credit:12000, account:'الأصول' },
    { id:'3', date:'2024-04-03', description:'رواتب شهر مارس', debit:0, credit:45000, account:'المصاريف' },
    { id:'4', date:'2024-04-04', description:'عمولة بيع #1002', debit:800, credit:0, account:'العمولات' },
    { id:'5', date:'2024-04-05', description:'تسوية بنكية', debit:200, credit:0, account:'البنك' },
  ]);

  private _securityLogs$ = new BehaviorSubject<SecurityLog[]>([
    { id:'1', user:'أحمد الرشيد', action:'تسجيل دخول', ip:'192.168.1.101', time:'2026-04-05 08:22', status:'success' },
    { id:'2', user:'مجهول', action:'محاولة دخول فاشلة', ip:'185.220.101.42', time:'2026-04-05 07:45', status:'failed' },
    { id:'3', user:'سارة الخليل', action:'حذف سجل مبيعات', ip:'192.168.1.105', time:'2026-04-04 16:30', status:'warning' },
    { id:'4', user:'عمر الفهد', action:'تعديل إعدادات النظام', ip:'192.168.1.110', time:'2026-04-04 14:15', status:'success' },
    { id:'5', user:'مجهول', action:'محاولة اختراق API', ip:'103.21.244.0', time:'2026-04-04 02:11', status:'failed' },
  ]);

  private _backups$ = new BehaviorSubject<BackupRecord[]>([
    { id:'1', name:'نسخة احتياطية كاملة - أبريل', size:'2.4 GB', date:'2026-04-05 02:00', type:'auto', status:'success' },
    { id:'2', name:'نسخة يدوية قبل التحديث', size:'2.1 GB', date:'2026-04-04 18:00', type:'manual', status:'success' },
    { id:'3', name:'نسخة احتياطية كاملة - مارس', size:'1.9 GB', date:'2026-04-01 02:00', type:'auto', status:'success' },
    { id:'4', name:'نسخة تجريبية', size:'0.3 GB', date:'2026-03-28 10:00', type:'manual', status:'failed' },
  ]);

  private _aiInsights$ = new BehaviorSubject<AIInsight[]>([
    { id:'1', title:'نمو غير متوقع في مبيعات الهواتف', description:'زيادة 34% في مبيعات قسم الهواتف مقارنة بالشهر الماضي. يُنصح بزيادة المخزون.', type:'trend', severity:'medium', time:'منذ ساعتين' },
    { id:'2', title:'تحذير: انخفاض حاد في مخزون 3 أصناف', description:'شاشة استوديو وسماعات إيربودز وساعة آبل ستنفد خلال 7 أيام بناءً على معدل المبيعات الحالي.', type:'warning', severity:'high', time:'منذ 5 ساعات' },
    { id:'3', title:'فرصة بيع: عميل محتمل عالي القيمة', description:'شركة تك نيكسوس تتصفح منتجات الفئة A بشكل متكرر. يُنصح بالتواصل الفوري.', type:'opportunity', severity:'high', time:'منذ يوم' },
    { id:'4', title:'شذوذ في نمط المشتريات', description:'ارتفاع غير مبرر في تكاليف الشراء من مورد رقم 3 بنسبة 22%. يُنصح بالمراجعة.', type:'anomaly', severity:'medium', time:'منذ يومين' },
  ]);

  private _jobs$ = new BehaviorSubject<SystemJob[]>([
    { id:'1', name:'نسخ احتياطي تلقائي', schedule:'يومياً 02:00 ص', lastRun:'2026-04-05 02:00', status:'active', nextRun:'2026-04-06 02:00' },
    { id:'2', name:'تحديث تقارير المبيعات', schedule:'كل ساعة', lastRun:'2026-04-05 05:00', status:'active', nextRun:'2026-04-05 06:00' },
    { id:'3', name:'تنظيف سجلات النظام', schedule:'أسبوعياً الأحد', lastRun:'2026-03-30 03:00', status:'active', nextRun:'2026-04-06 03:00' },
    { id:'4', name:'مزامنة البيانات الخارجية', schedule:'يومياً 06:00 ص', lastRun:'2026-04-04 06:00', status:'failed', nextRun:'2026-04-05 06:00' },
    { id:'5', name:'إرسال تقارير الأداء', schedule:'شهرياً أول يوم', lastRun:'2026-04-01 08:00', status:'paused', nextRun:'2026-05-01 08:00' },
  ]);

  private _customFields$ = new BehaviorSubject<CustomField[]>([
    { id:'1', name:'customer_priority', label:'أولوية العميل', type:'select', module:'المبيعات', required:false },
    { id:'2', name:'product_origin', label:'بلد المنشأ', type:'text', module:'المخزون', required:true },
    { id:'3', name:'employee_badge', label:'رقم الشارة', type:'number', module:'الموارد البشرية', required:true },
    { id:'4', name:'lead_budget', label:'الميزانية التقديرية', type:'number', module:'CRM', required:false },
    { id:'5', name:'product_warranty', label:'تاريخ انتهاء الضمان', type:'date', module:'المخزون', required:false },
  ]);

  private _rules$ = new BehaviorSubject<Rule[]>([
    { id:'1', name:'تنبيه المخزون المنخفض', condition:'stock < 10', action:'إرسال إشعار للمدير', status:'active', priority:1 },
    { id:'2', name:'خصم العملاء المميزين', condition:'total_orders > 10', action:'تطبيق خصم 5%', status:'active', priority:2 },
    { id:'3', name:'حجب الطلبات الكبيرة', condition:'order_value > $50,000', action:'طلب موافقة مدير', status:'active', priority:3 },
    { id:'4', name:'تنبيه الفواتير المتأخرة', condition:'due_date < today', action:'إرسال تذكير للعميل', status:'inactive', priority:4 },
  ]);

  private _chatHistory$ = new BehaviorSubject<ChatMessage[]>([
    { id:'1', senderId:'2', receiverId:'1', content:'مرحباً أحمد، هل راجعت تقرير مبيعات الربع الأول؟', time:'09:12 ص', status:'read' },
    { id:'2', senderId:'1', receiverId:'2', content:'أهلاً سارة، نعم جاري العمل عليه الآن. سأرسله لك قريباً.', time:'09:15 ص', status:'read' },
    { id:'3', senderId:'5', receiverId:'1', content:'أحمد، هناك نقص في مخزون الماك بوك برو في مستودع جدة.', time:'أمس', status:'read' },
    { id:'4', senderId:'1', receiverId:'5', content:'شكراً للتنبيه عمر، سأقوم بعمل أمر شراء جديد للمورد فوراً.', time:'أمس', status:'read' },
    { id:'5', senderId:'6', receiverId:'1', content:'أهلاً م. أحمد، نحتاج لاعتماد كشف الرواتب لشهر أبريل.', time:'اليوم', status:'delivered' },
  ]);

  private _notifications$ = new BehaviorSubject<Notification[]>([
    { id:'1', title:'طلب شراء جديد', message:'قام عمر بإنشاء طلب شراء لـ 50 وحدة ماك بوك.', time:'منذ 5 دقائق', type:'info', read:false },
    { id:'2', title:'مخزون منخفض', message:'وصل مخزون آيفون 15 برو إلى الحد الأدنى (5 قطع).', time:'منذ ساعة', type:'warning', read:false },
    { id:'3', title:'تم التحميل بنجاح', message:'تم الانتهاء من النسخ الاحتياطي اليومي.', time:'منذ ساعتين', type:'success', read:true },
  ]);

  // ── Observable Getters ────────────────────────────────────────────────────
  getProducts(): Observable<Product[]> { return this._products$.asObservable().pipe(delay(500)); }
  getUsers(): Observable<User[]> { return this._users$.asObservable().pipe(delay(500)); }
  getSalesOrders(): Observable<SalesOrder[]> { return this._orders$.asObservable().pipe(delay(500)); }
  getSuppliers(): Observable<Supplier[]> { return this._suppliers$.asObservable().pipe(delay(500)); }
  getEmployees(): Observable<Employee[]> { return this._employees$.asObservable().pipe(delay(500)); }
  getLeads(): Observable<Lead[]> { return this._leads$.asObservable().pipe(delay(500)); }
  getOpportunities(): Observable<Opportunity[]> { return this._opportunities$.asObservable().pipe(delay(500)); }
  getInvoices(): Observable<Invoice[]> { return this._invoices$.asObservable().pipe(delay(500)); }
  getWorkflows(): Observable<WorkflowItem[]> { return this._workflows$.asObservable().pipe(delay(500)); }
  getSecurityLogs(): Observable<SecurityLog[]> { return this._securityLogs$.asObservable().pipe(delay(500)); }
  getBackups(): Observable<BackupRecord[]> { return this._backups$.asObservable().pipe(delay(500)); }
  getAIInsights(): Observable<AIInsight[]> { return this._aiInsights$.asObservable().pipe(delay(500)); }
  getJobs(): Observable<SystemJob[]> { return this._jobs$.asObservable().pipe(delay(500)); }
  getCustomFields(): Observable<CustomField[]> { return this._customFields$.asObservable().pipe(delay(500)); }
  getRules(): Observable<Rule[]> { return this._rules$.asObservable().pipe(delay(500)); }

  getProductById(id: string): Observable<Product | undefined> { return of(this._products$.value.find(p => p.id === id)).pipe(delay(300)); }
  getUserById(id: string): Observable<User | undefined> { return of(this._users$.value.find(u => u.id === id)).pipe(delay(300)); }
  getSalesOrderById(id: string): Observable<SalesOrder | undefined> { return of(this._orders$.value.find(o => o.id === id)).pipe(delay(300)); }
  getEmployeeById(id: string): Observable<Employee | undefined> { return of(this._employees$.value.find(e => e.id === id)).pipe(delay(300)); }
  getLeadById(id: string): Observable<Lead | undefined> { return of(this._leads$.value.find(l => l.id === id)).pipe(delay(300)); }
  getSupplierById(id: string): Observable<Supplier | undefined> { return of(this._suppliers$.value.find(s => s.id === id)).pipe(delay(300)); }
  getOpportunityById(id: string): Observable<Opportunity | undefined> { return of(this._opportunities$.value.find(o => o.id === id)).pipe(delay(300)); }

  getChatMessages(userId: string): Observable<ChatMessage[]> {
    return of(this._chatHistory$.value.filter(m => m.senderId === userId || m.receiverId === userId)).pipe(delay(200));
  }

  getNotifications(): Observable<Notification[]> { return this._notifications$.asObservable(); }
  getUnreadNotificationsCount(): Observable<number> { return this._notifications$.pipe(map(ns => ns.filter(n => !n.read).length)); }

  markNotificationAsRead(id: string) {
    const ns = this._notifications$.value.map(n => n.id === id ? { ...n, read: true } : n);
    this._notifications$.next(ns);
  }

  sendMessage(receiverId: string, content: string) {
    const msg: ChatMessage = { id: Date.now().toString(), senderId: '1', receiverId, content, time: 'الآن', status: 'sent' };
    this._chatHistory$.next([...this._chatHistory$.value, msg]);
    
    // Auto-reply mock
    setTimeout(() => {
      const reply: ChatMessage = { id: (Date.now()+1).toString(), senderId: receiverId, receiverId: '1', content: 'شكراً جزيلاً! جاري المتابعة.', time: 'الآن', status: 'delivered' };
      this._chatHistory$.next([...this._chatHistory$.value, reply]);
    }, 2000);
  }

  getDashboardStats(): Observable<Statistics> {
    return of({ totalRevenue:1240500, monthlyOrders:154, totalUsers:28, lowStockAlerts:18, revenueGrowth:12.4, ordersGrowth:8.1, netProfit:440500, growthRate:14.2 }).pipe(delay(400));
  }

  getActivities(): Observable<Activity[]> {
    const activities: Activity[] = [
      { id:'1', type:'order', message:'طلب جديد من شركة تك نيكسوس', time:'منذ 5 دقائق', user:'النظام', amount:45600 },
      { id:'2', type:'stock', message:'إعادة تعبئة مخزون ماك بوك برو', time:'منذ ساعة', user:'مدير المستودع' },
      { id:'3', type:'alert', message:'مخزون منخفض: شاشة استوديو (8 قطع)', time:'منذ 3 ساعات', user:'المراقب الذكي' },
      { id:'4', type:'payment', message:'تم استلام دفعة $12,400', time:'منذ 5 ساعات', user:'المحاسبة', amount:12400 },
      { id:'5', type:'user', message:'انضم مستخدم جديد: ريم العبدالله', time:'منذ يوم', user:'النظام' },
      { id:'6', type:'system', message:'تم تنفيذ النسخ الاحتياطي التلقائي بنجاح', time:'منذ يومين', user:'النظام' },
    ];
    return of<Activity[]>(activities).pipe(delay(600));
  }
}
