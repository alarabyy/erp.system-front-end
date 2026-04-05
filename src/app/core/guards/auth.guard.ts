import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';

import { AuthStateService } from '../services/auth-state.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly authState: AuthStateService, private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuthentication(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    const path = segments
      .map((segment) => segment.path)
      .filter(Boolean)
      .join('/');
    const redirectUrl = path ? `/${path}` : route.path ? `/${route.path}` : '/';
    return this.checkAuthentication(redirectUrl);
  }

  private checkAuthentication(redirectUrl: string) {
    if (this.authState.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/auth'], { queryParams: { redirect: redirectUrl } });
    return false;
  }
}
