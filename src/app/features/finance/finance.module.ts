import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceRoutingModule } from './finance-routing.module';
import { LedgerListComponent } from './pages/ledger-list/ledger-list.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    FinanceRoutingModule,
    LedgerListComponent
  ]
})
export class FinanceModule { }
