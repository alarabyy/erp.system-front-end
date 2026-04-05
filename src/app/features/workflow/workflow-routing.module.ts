import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowListComponent } from './pages/workflow-list/workflow-list.component';
const routes: Routes = [{ path: '', component: WorkflowListComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class WorkflowRoutingModule {}
