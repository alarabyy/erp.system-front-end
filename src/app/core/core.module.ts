import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiTokenInterceptor } from './interceptors/api-token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';
import { AuthStateService } from './services/auth-state.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ApiService,
    AuthStateService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded.');
    }
  }
}
