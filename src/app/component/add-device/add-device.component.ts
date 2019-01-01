import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent {

  title= 'Panel dodawania urządzeń';
  val1 = '';
  devType: Observable<any[]>;
  devStatus: Observable<any[]>;

  constructor(public db: AngularFireDatabase,
              public dialogRef: MdDialogRef<AddDeviceComponent>) {

  }
  onSubmit() {
    this.db.list('/devices').push({ name: this.val1, type: this.devType , status: this.devStatus });
    this.val1 = '';
  }


}
