import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { AuthCredentials } from '../models/auth-credentials.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly api: ApiService, private readonly authState: AuthStateService) {}

  login(credentials: AuthCredentials) {
    return this.api.post<AuthResponse>('auth/login', credentials).pipe(
      tap((response) => this.authState.setToken(response.token))
    );
  }

  logout() {
    this.authState.setToken(null);
  }
}
