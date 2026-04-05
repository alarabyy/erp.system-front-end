import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryOverviewPageComponent } from './pages/inventory-overview/inventory-overview.component';

const routes: Routes = [{ path: '', component: InventoryOverviewPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
