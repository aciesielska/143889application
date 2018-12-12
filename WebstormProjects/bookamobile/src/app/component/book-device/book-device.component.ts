import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2';


@Component({
  selector: 'app-book-device',
  templateUrl: './book-device.component.html',
  styleUrls: ['./book-device.component.scss']
})
export class BookDeviceComponent {

  constructor(public db: AngularFireDatabase,
              public dialogRef: MdDialogRef<BookDeviceComponent>) {

  }

  title = 'Panel rezerwacji urządzenia';

  onSubmit() {

  }
}
