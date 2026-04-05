import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingListComponent } from './pages/accounting-list/accounting-list.component';
const routes: Routes = [{ path: '', component: AccountingListComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AccountingRoutingModule {}
