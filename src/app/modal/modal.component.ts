import { Component, OnInit,Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  description:string;

  constructor(
    private  dialogRef:  MatDialogRef<ModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  any
    ) { 
      console.log(data);
      this.description=data;
    }

  ngOnInit(): void {
  }

  public  closeMe() {
    this.dialogRef.close();
  }

}
