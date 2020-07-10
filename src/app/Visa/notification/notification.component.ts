import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [DatePipe]
})
export class NotificationComponent implements OnInit {
  title = "Notifications";
  contactList : any;
  contactID : number;
  visaRegNo = "";

  constructor( private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var contactId = params['contactId'];
      this.contactID =  contactId;
    });

    if(this.contactID !== undefined){
      this.dataService.getContactById(this.contactID).subscribe(res=>{
        this.contactList = res;
        console.log(this.contactList);
        this.visaRegNo = this.contactList.Applications[0].Applicants[0].VisaApplications[0].MyEVisaRefNo;
      });
    }
  }

}
