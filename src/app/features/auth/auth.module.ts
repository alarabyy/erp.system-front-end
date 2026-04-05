import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login/login.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule, LoginPageComponent, AuthCardComponent]
})
export class AuthModule {}
