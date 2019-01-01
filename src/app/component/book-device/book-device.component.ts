import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2';

@Component({
  selector: 'app-book-device',
  templateUrl: './book-device.component.html',
  styleUrls: ['./book-device.component.scss']
})
export class BookDeviceComponent implements OnInit {

  private values;
  device: any;
  title = 'Panel rezerwacji urządzenia';

  constructor(@Optional() @Inject(MD_DIALOG_DATA)
              private dialogData: any,
              public db: AngularFireDatabase,
              public dialogRef: MdDialogRef<BookDeviceComponent>) {
  }


  ngOnInit() {
    this.device = this.dialogData.device;
  }

  bookFor(days){
      let date = new Date();
    date.setDate(date.getDate() + days);
    console.log(this.device);
    this.db.list('/devices').update(
      this.device.$key,
      {status: 'Zarezerwowane', returnDate: date, user: this.dialogData.user}
      );
    this.dialogRef.close();
  }
}
