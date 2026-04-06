import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutomationList } from './pages/automation-list/automation-list';

const routes: Routes = [
  { path: '', component: AutomationList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomationRoutingModule { }
