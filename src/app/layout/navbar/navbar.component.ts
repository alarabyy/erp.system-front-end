import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DataMockService } from '../../core/services/data-mock.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly data = inject(DataMockService);

  unreadCount$: Observable<number>;
  searchQuery = '';

  constructor() {
    this.unreadCount$ = this.data.getUnreadNotificationsCount();
  }

  onGlobalSearch() {
    if (!this.searchQuery.trim()) return;
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    this.searchQuery = ''; // Clear search after enter
  }
}
