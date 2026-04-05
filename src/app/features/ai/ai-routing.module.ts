import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiPageComponent } from './pages/ai-page/ai-page.component';
const routes: Routes = [{ path: '', component: AiPageComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AiRoutingModule {}
