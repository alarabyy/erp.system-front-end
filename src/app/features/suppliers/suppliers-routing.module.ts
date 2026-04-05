import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupplierDirectoryPageComponent } from './pages/supplier-directory/supplier-directory.component';

const routes: Routes = [{ path: '', component: SupplierDirectoryPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
