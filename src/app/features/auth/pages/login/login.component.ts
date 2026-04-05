import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { SharedModule } from '../../../../shared/shared.module';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../models/auth-credentials.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent {
  form: FormGroup;
  loading = false;
  errorMessage?: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = undefined;
    const credentials = this.form.value as AuthCredentials;

    this.authService
      .login(credentials)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => (this.errorMessage = err?.message || 'Unable to authenticate')
      });
  }
}
