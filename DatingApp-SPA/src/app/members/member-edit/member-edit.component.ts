import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/_services/User.service';
import { AletifyService } from 'src/app/_services/aletify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
@ViewChild('editForm', {static: true}) editForm: NgForm;
user: User;
photoUrl: string;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private alertify: AletifyService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success('Profile updated successfully');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}