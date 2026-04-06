import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KpiDashboard } from './pages/kpi-dashboard/kpi-dashboard';

const routes: Routes = [
  { path: '', component: KpiDashboard }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
