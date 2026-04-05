import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthStateService } from '../services/auth-state.service';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(private readonly authState: AuthStateService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authState.token || environment.defaultToken;
    const headers = req.headers.set(environment.tokenHeader, token);
    const secureReq = req.clone({ headers });
    return next.handle(secureReq);
  }
}
