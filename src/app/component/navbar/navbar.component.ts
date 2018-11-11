import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activeUser: string;

  constructor(public userService: UserService,
              private router: Router) {
    userService.userChange.subscribe((email) => {
      this.activeUser = email;
    });
    userService.userIdChange.subscribe((userId) => {
      localStorage.setItem('user', userId);
    });
  }

  ngOnInit() {
    console.log(this.userService.user);

    if (this.userService.user) {
      this.activeUser = this.userService.user;
    }
  }

  userLogout() {
    this.userService.logout();
    this.router.navigateByUrl('');
  }

  navigateToWords(type) {
    this.router.navigateByUrl('words/' + type);
  }

}
