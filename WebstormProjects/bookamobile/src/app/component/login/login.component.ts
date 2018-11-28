import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: '',
    password: ''
  };
  reply: Error;
  replyMessage: string;
  constructor(private userService: UserService,
              private router: Router) {
    userService.reply.subscribe((reply) => {
      this.reply = reply;
      this.replyMessage = this.translateReply(reply.message);
      console.log(this.reply);
    })
    userService.userChange.subscribe((email) => {
      this.router.navigateByUrl('welcome');
    })
  }

  ngOnInit() {
  }

  register(user) {
    let reply = this.userService.login(user);
    console.log(reply);
  }

  translateReply(reply): string {
    if(reply=="The password is invalid or the user does not have a password.") {
      return "Podano złe hasło."
    }
    if(reply=="There is no user record corresponding to this identifier. The user may have been deleted.") {
      return "Podano zły email."
    }
    return reply;
  }
}
