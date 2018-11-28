import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/observable';
import {UserService} from '../../services/user.service';
import {AddDeviceComponent} from '../add-device/add-device.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  title= 'Panel dodawania urządzeń';
  val1 = '';
  devType: Observable<any[]>;
  devStatus: Observable<any[]>;
  devices: Observable<any[]>;

  activeUser: string;
  userId: any;

  constructor(public db: AngularFireDatabase,
              private  userService: UserService) {
    userService.userChange.subscribe((email) => {
      this.activeUser = email;
      console.log(email);
    });
    userService.userIdChange.subscribe((id) => {
      this.userId = id;
      console.log(this.userId);
    });
    this.devices = db.list('/devices')
    console.log('urzadzenia', this.devices)

      // .subscribe((devices) => {
      // this.devices = devices; }); /*.valueChanges();*/
  }
  onSubmit() {
    this.db.list('/devices').push({ name: this.val1, type: this.devType , status: this.devStatus , addedBy: this.userId });
    this.val1 = '';
  }
}
