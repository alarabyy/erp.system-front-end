import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataMockService, Notification } from '../../core/services/data-mock.service';
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
  unreadCount$: Observable<number>;
  searchQuery = '';

  constructor(private data: DataMockService) {
    this.unreadCount$ = this.data.getUnreadNotificationsCount();
  }

  onGlobalSearch() {
    console.log('Global Search:', this.searchQuery);
  }
}
