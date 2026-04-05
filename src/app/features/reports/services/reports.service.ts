import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private readonly api: ApiService) {}

  list(): Observable<Report[]> {
    return this.api.get<Report[]>('reports');
  }
}
