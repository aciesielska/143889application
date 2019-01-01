import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  reply: Error;
  replyMessage: string;
  passwordMatch: boolean = false;


  constructor(private userService: UserService,
              private router: Router) {
    userService.reply.subscribe((reply) => {
      this.reply = reply;
      this.replyMessage = this.translateReply(reply.message);
      console.log(this.reply);
    });
    userService.userChange.subscribe((email) => {
      this.router.navigateByUrl('welcome');
    });
  }

  ngOnInit() {
  }

  register(user) {
    this.userService.register(user);
  }

  translateReply(reply): string {
    if(reply=="The email address is badly formatted.") {
      return "Email jest źle sformatowany."
    }
    if(reply=="Password should be at least 6 characters") {
      return "Hasło musi się składać z minimum 6 znaków."
    }
    if(reply=="The email address is already in use by another account.") {
      return "W systemie istnieje już użytkownik z tym adresem email."
    }
      return reply;
  }
}
