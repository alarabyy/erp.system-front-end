import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LedgerListComponent } from './pages/ledger-list/ledger-list.component';
import { AccountingListComponent } from '../accounting/pages/accounting-list/accounting-list.component';
import { AssetsList } from './pages/assets-list/assets-list';

const routes: Routes = [
  { path: 'ledger', component: LedgerListComponent },
  { path: 'journals', component: AccountingListComponent },
  { path: 'assets', component: AssetsList },
  { path: '', redirectTo: 'ledger', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
