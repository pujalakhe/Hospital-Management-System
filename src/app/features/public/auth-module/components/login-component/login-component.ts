import { Component, OnInit } from '@angular/core';
import { LoginFormBuilderService } from '../../services/login-form-service/login-form-builder-service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  constructor(
    private loginFormBuilderService: LoginFormBuilderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildLoginForm();
    this.loginForm = this.loginFormBuilderService.form;
  }

  buildLoginForm() {
    this.loginFormBuilderService.buildLoginForm();
  }

  getControl(controlName: string): FormControl {
    return this.loginForm?.get(controlName) as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm?.invalid) {
      this.loginFormBuilderService.applyTouchAndDirtyToForm();
    } else {
      console.log(this.loginForm?.value);
    }
  }

  navigateTo() {
    this.router.navigate([ROUTER_PATHS.SIGNUP]);
  }
}
