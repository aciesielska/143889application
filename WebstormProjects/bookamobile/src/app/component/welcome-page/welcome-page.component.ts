import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/observable';
import {UserService} from '../../services/user.service';
import {AddDeviceComponent} from '../add-device/add-device.component';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  devices: Observable<any[]>;

  activeUser: string;
  userId: any;
  dialogRefDevice: MdDialogRef<AddDeviceComponent>;

  constructor(public db: AngularFireDatabase,
              private  userService: UserService,
              private dialog: MdDialog) {
    userService.userChange.subscribe((email) => {
      this.activeUser = email;
      console.log(email);
    });
    userService.userIdChange.subscribe((id) => {
      this.userId = id;
      console.log(this.userId);
    });
    this.devices = db.list('/devices');
  }

  ngOnInit() {
    console.log(this.userService.user);

    if (this.userService.user) {
      this.activeUser = this.userService.user;
    }
  }

  addDevice() {
    this.dialogRefDevice = this.dialog.open(AddDeviceComponent);
  }
}
