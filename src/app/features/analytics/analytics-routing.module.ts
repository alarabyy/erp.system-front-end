import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsOverviewComponent } from './pages/overview/analytics-overview.component';
import { SalesAnalyticsComponent } from './pages/sales/sales-analytics.component';
import { InventoryAnalyticsComponent } from './pages/inventory/inventory-analytics.component';
import { FinancialAnalyticsComponent } from './pages/financial/financial-analytics.component';
import { HrAnalyticsComponent } from './pages/hr/hr-analytics.component';
import { CrmAnalyticsComponent } from './pages/crm/crm-analytics.component';
import { SystemAnalyticsComponent } from './pages/system/system-analytics.component';
import { CustomReportsComponent } from './pages/custom-reports/custom-reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: AnalyticsOverviewComponent },
  { path: 'sales', component: SalesAnalyticsComponent },
  { path: 'inventory', component: InventoryAnalyticsComponent },
  { path: 'financial', component: FinancialAnalyticsComponent },
  { path: 'hr', component: HrAnalyticsComponent },
  { path: 'crm', component: CrmAnalyticsComponent },
  { path: 'system', component: SystemAnalyticsComponent },
  { path: 'custom-reports', component: CustomReportsComponent },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AnalyticsRoutingModule {}
