import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ROUTER_PATHS } from '../../../../../../core/constants/router-path.constant';
import { LoginFormService } from '../../../services/login-form-service/login-form-service';

import { login } from '../../store/login.action';
import { selectError, selectLoading } from '../../store/login.selector';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  loginForm?: FormGroup;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;

  constructor(
    private loginFormService: LoginFormService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.buildLoginForm();
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  buildLoginForm() {
    this.loginForm = this.loginFormService.buildLoginForm();
  }

  getControl(controlName: string): FormControl {
    return this.loginForm?.get(controlName) as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm?.invalid) {
      this.loginFormService.applyTouchAndDirtyToForm();
    } else {
      const credentials = this.loginForm?.value;
      this.store.dispatch(login({ credentials }));
    }
  }

  navigateTo() {
    this.router.navigate([ROUTER_PATHS.SIGNUP]);
  }
}
