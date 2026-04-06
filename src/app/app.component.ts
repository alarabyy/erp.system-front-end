import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  
  // نستخدم الـ Observable للتأكد من حالة الدخول وإخفاء القوائم في صفحة الـ Auth
  isAuthenticated$ = this.authState.token$;
}
