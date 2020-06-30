import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/User.service';
import { AletifyService } from 'src/app/_services/aletify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AletifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

}
