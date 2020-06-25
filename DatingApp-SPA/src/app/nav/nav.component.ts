import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AletifyService } from '../_services/aletify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};

  constructor(public authService: AuthService, private alertify: AletifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token; // empty - false
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }
}
