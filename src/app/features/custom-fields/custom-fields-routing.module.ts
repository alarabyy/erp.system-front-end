import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomFieldsListComponent } from './pages/custom-fields-list/custom-fields-list.component';
const routes: Routes = [{ path: '', component: CustomFieldsListComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CustomFieldsRoutingModule {}
