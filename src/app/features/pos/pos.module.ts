import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PosCheckoutComponent } from './pages/pos-checkout/pos-checkout';
import { PosSessionsComponent } from './pages/pos-sessions/pos-sessions';
import { PosOrdersComponent } from './pages/pos-orders/pos-orders';
import { PosAnalyticsComponent } from './pages/pos-analytics/pos-analytics';
import { PosCustomersComponent } from './pages/pos-customers/pos-customers';
import { PosSettingsComponent } from './pages/pos-settings/pos-settings';

const routes: Routes = [
  { path: 'checkout', component: PosCheckoutComponent },
  { path: 'sessions', component: PosSessionsComponent },
  { path: 'orders', component: PosOrdersComponent },
  { path: 'analytics', component: PosAnalyticsComponent },
  { path: 'customers', component: PosCustomersComponent },
  { path: 'settings', component: PosSettingsComponent },
  { path: '', redirectTo: 'checkout', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PosModule { }
