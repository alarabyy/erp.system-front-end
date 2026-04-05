import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmListComponent } from './pages/crm-list/crm-list.component';
import { CrmFormComponent } from './pages/crm-form/crm-form.component';
const routes: Routes = [
  { path: '', component: CrmListComponent },
  { path: 'create', component: CrmFormComponent },
  { path: 'edit/:id', component: CrmFormComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CrmRoutingModule {}
