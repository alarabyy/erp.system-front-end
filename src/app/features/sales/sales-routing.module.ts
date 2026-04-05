import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesListComponent } from './pages/sales-list/sales-list.component';
import { SalesFormComponent } from './pages/sales-form/sales-form.component';

const routes: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'create', component: SalesFormComponent },
  { path: 'edit/:id', component: SalesFormComponent }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SalesRoutingModule {}
