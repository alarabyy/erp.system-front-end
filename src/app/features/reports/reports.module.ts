import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsDashboardPageComponent } from './pages/reports-dashboard/reports-dashboard.component';
import { ReportFilterComponent } from './components/report-filter/report-filter.component';

@NgModule({
  imports: [SharedModule, ReportsRoutingModule, ReportsDashboardPageComponent, ReportFilterComponent]
})
export class ReportsModule {}
