import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityPageComponent } from './pages/security-page/security-page.component';
const routes: Routes = [{ path: '', component: SecurityPageComponent }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SecurityRoutingModule {}
