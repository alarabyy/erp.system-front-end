import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityPageComponent } from './pages/security-page/security-page.component';
import { AuditLogsComponent } from './pages/audit-logs/audit-logs.component';

const routes: Routes = [
  { path: '', component: SecurityPageComponent },
  { path: 'audit-logs', component: AuditLogsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
