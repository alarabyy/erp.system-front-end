import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'analytics', loadChildren: () => import('./features/analytics/analytics.module').then(m => m.AnalyticsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: 'sales', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
  { path: 'inventory', loadChildren: () => import('./features/inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'purchases', loadChildren: () => import('./features/purchases/purchases.module').then(m => m.PurchasesModule) },
  { path: 'accounting', loadChildren: () => import('./features/accounting/accounting.module').then(m => m.AccountingModule) },
  { path: 'hr', loadChildren: () => import('./features/hr/hr.module').then(m => m.HrModule) },
  { path: 'crm', loadChildren: () => import('./features/crm/crm.module').then(m => m.CrmModule) },
  { path: 'reports', loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'workflow', loadChildren: () => import('./features/workflow/workflow.module').then(m => m.WorkflowModule) },
  { path: 'rules', loadChildren: () => import('./features/rules/rules.module').then(m => m.RulesModule) },
  { path: 'custom-fields', loadChildren: () => import('./features/custom-fields/custom-fields.module').then(m => m.CustomFieldsModule) },
  { path: 'security', loadChildren: () => import('./features/security/security.module').then(m => m.SecurityModule) },
  { path: 'events', loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule) },
  { path: 'jobs', loadChildren: () => import('./features/jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'backup', loadChildren: () => import('./features/backup/backup.module').then(m => m.BackupModule) },
  { path: 'ai', loadChildren: () => import('./features/ai/ai.module').then(m => m.AiModule) },
  { path: 'developers', loadChildren: () => import('./features/developers/developers.module').then(m => m.DevelopersModule) },
  { path: 'builders', loadChildren: () => import('./features/builders/builders.module').then(m => m.BuildersModule) },
  { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'chat', loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule) },
  { path: 'notifications', loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
