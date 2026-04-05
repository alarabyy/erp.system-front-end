import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrListComponent } from './pages/hr-list/hr-list.component';
import { HrFormComponent } from './pages/hr-form/hr-form.component';
const routes: Routes = [
  { path: '', component: HrListComponent },
  { path: 'create', component: HrFormComponent },
  { path: 'edit/:id', component: HrFormComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class HrRoutingModule {}
