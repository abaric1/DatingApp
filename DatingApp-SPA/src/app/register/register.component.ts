import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AletifyService } from '../_services/aletify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AletifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
     this.alertify.success('registration successful');
    }, error => {
      this.alertify.warning('error');
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }

}
