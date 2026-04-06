import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { AuthStateService } from './core/services/auth-state.service';
import { LayoutModule } from './layout/layout.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly authState = inject(AuthStateService);
  private readonly router = inject(Router);
  
  private readonly isAuthRoute$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).url.includes('/login') || (event as NavigationEnd).url === '/auth/login' || (event as NavigationEnd).url === '/'),
    startWith(true)
  );

  showLayout$ = combineLatest([this.authState.token$, this.isAuthRoute$]).pipe(
    map(([token, isAuth]) => !!token && !isAuth)
  );
}
