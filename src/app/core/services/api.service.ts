import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(this.buildUrl(path));
  }

  post<T>(path: string, body: unknown) {
    return this.http.post<T>(this.buildUrl(path), body);
  }

  put<T>(path: string, body: unknown) {
    return this.http.put<T>(this.buildUrl(path), body);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(this.buildUrl(path));
  }

  private buildUrl(path: string) {
    const normalizedPath = path.replace(/^\/+/, '');
    return `${environment.apiBaseUrl}/${normalizedPath}`;
  }
}
