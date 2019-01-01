import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/observable';
import {UserService} from '../../services/user.service';
import {AddDeviceComponent} from '../add-device/add-device.component';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {BookDeviceComponent} from "../book-device/book-device.component";
import {EditDeviceComponent} from "../edit-device/edit-device.component";

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
  dialogRefBook: MdDialogRef<BookDeviceComponent>;
  dialogRefEdit: MdDialogRef<EditDeviceComponent>;
  role: any;

  constructor(public db: AngularFireDatabase,
              private  userService: UserService,
              private dialog: MdDialog) {
    this.devices = db.list('/devices');
  }

  ngOnInit() {
    this.userService.userIdChange.subscribe(id => this.userId = id);
    this.userService.role.subscribe(r => this.role = r);
    this.userService.userChange.subscribe(email => this.activeUser = email);

    if (this.userService.user) {
      this.activeUser = this.userService.user;
      this.userId = this.userService.userId;
    }
  }

  addDevice() {
    this.dialogRefDevice = this.dialog.open(AddDeviceComponent);
  }

  bookDevice(device) {
    const config = new MdDialogConfig();
    config.data = {
      device,
      user: this.activeUser,
    };

    this.dialogRefBook = this.dialog.open(BookDeviceComponent, config);
  }

  editDevice(device) {
    const config = new MdDialogConfig();
    config.data = {
      device,
    };

    this.dialogRefEdit = this.dialog.open(EditDeviceComponent, config);
  }

  returnDevice(device) {
    this.db.list('/devices').update(
      device.$key,
      {status: 'Dostępne', returnDate: null, user: null}
    );

  }
}
