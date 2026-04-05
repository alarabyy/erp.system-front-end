import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsDashboardPageComponent } from './pages/reports-dashboard/reports-dashboard.component';

const routes: Routes = [{ path: '', component: ReportsDashboardPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
