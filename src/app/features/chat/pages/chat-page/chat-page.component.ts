import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataMockService, User, ChatMessage } from '../../../../core/services/data-mock.service';
import { Observable, combineLatest, map, startWith } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-chat-page',
  template: `
    <div class="erp-page animate-fade-in chat-layout">
      <div class="chat-sidebar luxe-card">
        <div class="chat-sidebar-header">
          <h2>💬 المحادثات</h2>
          <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" [(ngModel)]="searchQuery" (input)="filterContacts()" placeholder="ابحث عن زميل...">
          </div>
        </div>
        <div class="contacts-list">
          <div *ngFor="let user of filteredUsers" class="contact-item" [class.active]="selectedUserId === user.id" (click)="selectUser(user)">
            <div class="contact-avatar">{{ user.avatar }}</div>
            <div class="contact-info">
              <span class="contact-name">{{ user.name }}</span>
              <span class="contact-role">{{ user.role === 'admin' ? 'مدير' : user.role === 'manager' ? 'مسؤول' : 'موظف' }} - {{ user.department }}</span>
            </div>
            <div class="status-dot" [class.online]="user.status === 'active'"></div>
          </div>
        </div>
      </div>

      <div class="chat-main luxe-card" *ngIf="selectedUser; else noChat">
        <div class="chat-header">
          <div class="chat-user-info">
            <div class="contact-avatar big">{{ selectedUser.avatar }}</div>
            <div>
              <h3>{{ selectedUser.name }}</h3>
              <p>{{ selectedUser.department }} | {{ selectedUser.status === 'active' ? 'متصل الآن' : 'غير متصل' }}</p>
            </div>
          </div>
          <div class="chat-actions">
            <button class="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
            <button class="icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
          </div>
        </div>

        <div class="chat-messages" #scrollMe [scrollTop]="scrollMe.scrollHeight">
          <div *ngFor="let msg of messages" class="message-bubble" [class.sent]="msg.senderId === '1'" [class.received]="msg.senderId !== '1'">
            <div class="bubble-content">
              {{ msg.content }}
              <span class="message-time">{{ msg.time }}</span>
            </div>
          </div>
        </div>

        <div class="chat-footer">
          <button class="icon-btn attachment"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
          <input type="text" [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" placeholder="اكتب رسالتك هنا...">
          <button class="btn-luxe btn-primary" (click)="sendMessage()">
            إرسال ↩
          </button>
        </div>
      </div>

      <ng-template #noChat>
        <div class="chat-main empty luxe-card">
          <div class="empty-state">
            <div class="es-icon">🗨️</div>
            <h3>ابدأ دردشة جديدة</h3>
            <p>اختر زميلاً من القائمة الجانبية لبدء المحادثة</p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .chat-layout { display: grid; grid-template-columns: 350px 1fr; gap: 1.5rem; height: calc(100vh - 150px); overflow: hidden; }
    .chat-sidebar { display: flex; flex-direction: column; padding: 0; overflow: hidden; }
    .chat-sidebar-header { padding: 1.5rem; border-bottom: 1px solid var(--color-border); }
    .chat-sidebar-header h2 { font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
    .search-wrap { display: flex; align-items: center; gap: .75rem; background: #f1f5f9; padding: .6rem 1rem; border-radius: 12px; }
    .search-wrap svg { width: 18px; color: #94a3b8; }
    .search-wrap input { border: none; background: transparent; outline: none; width: 100%; font-family: 'Cairo'; font-size: .85rem; }
    
    .contacts-list { flex: 1; overflow-y: auto; }
    .contact-item { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; cursor: pointer; transition: all .2s; border-bottom: 1px solid #f8fafc; }
    .contact-item:hover { background: #f1f7ff; }
    .contact-item.active { background: #eff6ff; border-right: 4px solid var(--color-primary); }
    .contact-avatar { width: 44px; height: 44px; background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: .9rem; flex-shrink: 0; }
    .contact-avatar.big { width: 48px; height: 48px; }
    .contact-info { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .contact-name { font-weight: 800; font-size: .88rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .contact-role { font-size: .72rem; color: #94a3b8; font-weight: 600; margin-top: .1rem; }
    .status-dot { width: 10px; height: 10px; border-radius: 50%; background: #e2e8f0; }
    .status-dot.online { background: #16a34a; box-shadow: 0 0 0 3px #f0fdf4; }

    .chat-main { display: flex; flex-direction: column; padding: 0; overflow: hidden; }
    .chat-main.empty { justify-content: center; align-items: center; text-align: center; }
    .chat-header { padding: 1.25rem 2rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: #fafbfc; }
    .chat-user-info { display: flex; align-items: center; gap: 1rem; }
    .chat-user-info h3 { font-size: 1rem; font-weight: 800; }
    .chat-user-info p { font-size: .75rem; color: #94a3b8; font-weight: 600; margin-top: .1rem; }
    .chat-actions { display: flex; gap: .75rem; }
    .icon-btn { background: white; border: 1px solid #e2e8f0; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: all .2s; }
    .icon-btn:hover { border-color: var(--color-primary); color: var(--color-primary); transform: translateY(-2px); }
    .icon-btn svg { width: 18px; }

    .chat-messages { flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; background: #fff; background-image: radial-gradient(#f1f5f9 1px, transparent 1px); background-size: 20px 20px; }
    .message-bubble { display: flex; max-width: 70%; }
    .message-bubble.sent { align-self: flex-start; }
    .message-bubble.received { align-self: flex-end; }
    .bubble-content { padding: .875rem 1.25rem; border-radius: 16px; font-size: .9rem; position: relative; font-weight: 500; line-height: 1.6; }
    .sent .bubble-content { background: var(--color-primary); color: white; border-bottom-left-radius: 4px; box-shadow: 0 8px 16px -4px rgba(0,98,255,.2); }
    .received .bubble-content { background: #f1f5f9; color: #0f172a; border-bottom-right-radius: 4px; }
    .message-time { display: block; font-size: .65rem; margin-top: .4rem; opacity: .7; text-align: right; font-weight: 700; }

    .chat-footer { padding: 1.25rem 2rem; border-top: 1px solid var(--color-border); display: flex; align-items: center; gap: 1rem; background: #fafbfc; }
    .chat-footer input { flex: 1; border: 1px solid #e2e8f0; background: white; padding: .875rem 1.25rem; border-radius: 14px; outline: none; font-family: 'Cairo'; font-size: .9rem; transition: all .3s; }
    .chat-footer input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 4px rgba(0,98,255,.05); }
    .empty-state { text-align: center; }
    .es-icon { font-size: 4rem; margin-bottom: 1.5rem; }
    .empty-state h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: .5rem; }
    .empty-state p { color: #94a3b8; font-weight: 600; }
  `]
})
export class ChatPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser?: User;
  selectedUserId?: string;
  messages: ChatMessage[] = [];
  searchQuery = '';
  newMessage = '';

  constructor(private data: DataMockService) {}

  ngOnInit() {
    this.data.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users.filter(u => u.id !== '1'); // Don't show self
    });
  }

  filterContacts() {
    const q = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(u => 
      u.id !== '1' && (u.name.toLowerCase().includes(q) || u.department.toLowerCase().includes(q))
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.selectedUserId = user.id;
    this.loadMessages();
  }

  loadMessages() {
    if (!this.selectedUserId) return;
    this.data.getChatMessages(this.selectedUserId).subscribe((msgs: ChatMessage[]) => {
      this.messages = msgs;
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUserId) return;
    this.data.sendMessage(this.selectedUserId, this.newMessage);
    this.newMessage = '';
    this.loadMessages();
  }
}
