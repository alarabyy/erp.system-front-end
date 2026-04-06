// --- مديول الموديلات العالمي لنظام كوانتم ERP ---

export interface User { 
  id: string; name: string; email: string; role: any; department: string; status: any; avatar: string; joinDate?: string; 
}

export interface Employee extends User { 
  phone: string; position: string; salary: number; startDate?: any; performance?: number; attendanceRate?: number;
}

export interface Product { 
  id: string; name: string; sku: string; category: string; price: number; stock: number; status: any; performance?: number;
}

export interface SalesOrder { 
  id: string; orderNo: string; customer: string; date: string; total: number; items: number; status: any; paymentStatus: any; region?: string;
}

export interface Supplier { 
  id: string; name: string; contactPerson: string; email: string; phone: string; category: string; country?: string; totalOrders?: number; status: any; 
}

export interface SecurityLog { 
  id: string; user: string; action: string; ip: string; time: string; status: any; 
}

export interface ChatMessage { 
  id: string; senderId: string; receiverId: string; content: string; time: string; isRead: boolean; 
}

export interface Lead { 
  id: string; name: string; company: string; email: string; phone?: any; value?: any; source?: any; status: any; 
}

export interface Opportunity { 
  id: string; title: string; customer?: string; stage?: any; closeDate?: string; value: number; probability: number; status: any; 
}

export interface BackupRecord { 
  id: string; name: string; date: string; size: string; status: any; type?: string;
}

export interface CustomField { 
  id: string; name: string; type: string; module: string; label: string; required: boolean;
}

export interface ErpNotification { 
  id: string; title: string; message: string; time: string; read: boolean; type: any; 
}

export interface Activity { 
  id: string; type: any; message: string; time: string; user?: string; amount?: number; 
}

export interface AIInsight {
  id: string; title: string; description: string; impact: any; type: any; severity: string; time: string;
}

export interface Rule { 
  id: string; name: string; description: string; isActive: boolean; 
  priority: string; condition: string; action: string; status: string;
}

export interface WorkflowItem { 
  id: string; name: string; stage: string; priority: any; 
  trigger: string; status: string; lastRun: string; runs: number;
}

export interface SystemJob { 
  id: string; title: string; status: any; progress: number; 
  name: string; schedule: string; lastRun: string; nextRun: string;
}

export interface Statistics { 
  totalRevenue: number; revenueGrowth: number; monthlyOrders: number; ordersGrowth: number; 
  totalUsers: number; lowStockAlerts: number; sales: any; revenue: any; customers: any; orders: any; 
}

// --- المحاسبة المالية GL ---
export interface LedgerAccount {
  id: string; code: string; name: string; type: 'asset' | 'liability' | 'equity' | 'income' | 'expense'; balance: number; status: any;
}

export interface JournalEntry {
  id: string; date: string; reference: string; description: string; amount: number; type: 'debit' | 'credit'; status: any;
}

// --- إدارة الأصول Fixed Assets ---
export interface FixedAsset {
  id: string; name: string; category: string; purchaseDate: string; cost: number; currentValue: number; location: string; custodian: string;
}

// --- إدارة التصنيع Production ---
export interface BOM {
  id: string; product: string; code: string; version: string; components: { item: string; quantity: number; unit: string }[]; status: any;
}

export interface ProductionOrder {
  id: string; orderNo: string; product: string; quantity: number; startDate: string; endDate: string; progress: number; status: any;
}

// --- إدارة المشاريع Projects ---
export interface Project {
  id: string; name: string; client: string; manager: string; budget: number; startDate: string; endDate: string; progress: number; status: any;
}

export interface ProjectTask {
  id: string; projectId: string; title: string; assignedTo: string; dueDate: string; priority: any; status: any;
}

// --- الأداء والأهداف OKRs ---
export interface Goal {
  id: string; title: string; owner: string; deadline: string; progress: number; type: 'company' | 'department' | 'personal'; status: any;
}

export interface KPI {
  id: string; name: string; target: number; current: number; unit: string; trend: 'up' | 'down' | 'steady';
}

// --- الأتمتة والعمليات Automation ---
export interface AutomationRule {
  id: string; name: string; trigger: string; action: string; isActive: boolean; lastRun?: string;
}
// Version 1.0.1 - Fixed property names
