import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SupplierDirectoryPageComponent } from './pages/supplier-directory/supplier-directory.component';
import { SupplierCardComponent } from './components/supplier-card/supplier-card.component';

@NgModule({
  imports: [SharedModule, SuppliersRoutingModule, SupplierDirectoryPageComponent, SupplierCardComponent]
})
export class SuppliersModule {}
