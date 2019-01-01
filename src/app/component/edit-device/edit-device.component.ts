import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {AngularFireDatabase} from "angularfire2";

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
  device: any;
  status: string;

  constructor(@Optional() @Inject(MD_DIALOG_DATA)
              private dialogData: any,
              public db: AngularFireDatabase,
              public dialogRef: MdDialogRef<EditDeviceComponent>) {
  }


  ngOnInit() {
    this.device = this.dialogData.device;
    this.status = this.dialogData.device.status;
  }

  changeStatus() {
    this.db.list('/devices').update(
      this.device.$key,
      {status: this.status}
    );
    this.dialogRef.close();
  }
}
