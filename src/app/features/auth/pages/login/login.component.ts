import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { AuthStateService } from '../../../../core/services/auth-state.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authState = inject(AuthStateService);
  private readonly router = inject(Router);

  form: FormGroup;
  loading = false;
  errorMessage?: string;

  constructor() {
    this.form = this.fb.group({
      username: [''], // جعلنا الحقول اختيارية للدخول السريع كما طلبت
      password: ['']
    });
  }

  login() {
    this.loading = true;
    this.errorMessage = undefined;

    // تم تعديل المنطق لعمل "Instant Login" حتى لو الداتا فارغة
    // نقوم بتعيين Token وهمي كأن النظام تم تسجيل الدخول فيه
    setTimeout(() => {
      this.authState.setToken('mock-pro-token-' + Date.now());
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 800); // تأخير بسيط جداً لإعطاء إحساس بالاحترافية
  }
}
