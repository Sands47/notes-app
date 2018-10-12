import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService, LoginUser} from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userForm: LoginUser = new LoginUser();
  failedLogin: boolean;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  get loggedIn() {
    return this.loginService.loggedIn;
  }

  login() {
    this.loginService.login(this.userForm)
      .subscribe(res => res ? this.onSuccessLogin() : this.onFailLogin());
  }

  logout() {
    this.loginService.logout().subscribe(res => this.onLogout());
  }

  onSuccessLogin() {
    this.router.navigateByUrl('/');
  }

  onFailLogin() {
    this.failedLogin = true;
    setTimeout(() => this.failedLogin = false, 1000);
  }

  onLogout() {
    this.router.navigateByUrl('/');
  }

}
