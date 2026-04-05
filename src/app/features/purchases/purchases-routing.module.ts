import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesListComponent } from './pages/purchases-list/purchases-list.component';
import { PurchasesFormComponent } from './pages/purchases-form/purchases-form.component';
const routes: Routes = [
  { path: '', component: PurchasesListComponent },
  { path: 'create', component: PurchasesFormComponent },
  { path: 'edit/:id', component: PurchasesFormComponent }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PurchasesRoutingModule {}
