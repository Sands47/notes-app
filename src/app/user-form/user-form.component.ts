import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  usersUrl = 'http://localhost:8080/api/users';
  user: User = new User();

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post(this.usersUrl, this.user).subscribe(response => {
      this.loginService.login({
        username: this.user.name,
        password: this.user.password
      })
        .subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/');
          }
        });
    });
  }
}
