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
  paymentID : number;
  visaRegNo = "";
  divPending : boolean = false;
  divSucess : boolean = false;
  divAlert : boolean = false;


  constructor( private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var contactId = params['contactId'];
      var paymentId = params['paymentId'];
      this.contactID =  contactId;
      this.paymentID = paymentId;
    });

    if(this.contactID !== undefined){
      this.dataService.getVisaRefNoByContactId(this.contactID).subscribe(res=>{
        this.contactList = res;
        console.log(this.contactList);
        if(this.contactList[0].MYEVISAREFNO===null){
          this.divPending = false;
          this.divSucess = false;
          this.divAlert = true;
          this.visaRegNo = "N/A"
        }
        else{
          // this.visaRegNo = this.contactList.Applications[0].Applicants[0].VisaApplications[0].MyEVisaRefNo;
          this.visaRegNo = this.contactList[0].MYEVISAREFNO;
        }
        
        //alert(this.contactList.Applications[0]);
        // this.divPending = true;
        // this.divSucess = false;
      });
    }
    // else{
    //   this.divPending = false;
    //   this.divSucess = true;
    // }
    
    if (this.paymentID!==undefined){
      this.divPending = false;
      this.divSucess = true;
      this.divAlert = false;
    }
    else{
      this.divPending = true;
      this.divSucess = false;
      this.divAlert = false;
    }
  }

}
