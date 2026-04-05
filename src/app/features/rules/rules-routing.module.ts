import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesListComponent } from './pages/rules-list/rules-list.component';
const routes: Routes = [{ path: '', component: RulesListComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class RulesRoutingModule {}
