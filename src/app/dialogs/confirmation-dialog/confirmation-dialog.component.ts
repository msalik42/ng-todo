import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  title: string;
  body: string;
  acceptButtonText: string;
  denyButtonText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }
  ngOnInit(): void{
    const data = this.data;
    this.title = data.title;
    this.body = data.body;
    this.acceptButtonText = data.acceptButtonText;
    this.denyButtonText = data.denyButtonText;
  }
}
