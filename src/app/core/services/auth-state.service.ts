import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'ims_token';

@Injectable()
export class AuthStateService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly token$ = this.tokenSubject.asObservable();

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.tokenSubject.next(token);
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
