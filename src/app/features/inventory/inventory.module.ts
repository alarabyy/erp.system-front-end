import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryOverviewPageComponent } from './pages/inventory-overview/inventory-overview.component';
import { InventorySummaryComponent } from './components/inventory-summary/inventory-summary.component';

@NgModule({
  imports: [SharedModule, InventoryRoutingModule, InventoryOverviewPageComponent, InventorySummaryComponent]
})
export class InventoryModule {}
