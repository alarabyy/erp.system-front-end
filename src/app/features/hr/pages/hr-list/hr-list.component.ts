import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, Employee } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-hr-list',
  templateUrl: './hr-list.html',
  styleUrls: ['./hr-list.scss'],
})
export class HrListComponent {
  employees$: Observable<Employee[]>;
  searchTerm = '';
  filterDept = '';

  constructor(private data: DataMockService) {
    this.employees$ = this.data.getEmployees();
  }

  getFiltered(employees: Employee[]): Employee[] {
    return employees.filter(e =>
      (!this.searchTerm || e.name.includes(this.searchTerm)) &&
      (!this.filterDept || e.department === this.filterDept)
    );
  }
}
