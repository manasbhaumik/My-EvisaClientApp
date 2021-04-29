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

  PendingMessage : any;
  SuccessMessage : any;
  AlertMessage : any;


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
          this.AlertMessage = "The application has not been submitted, <a routerLink='/visa-application'>Please submit the application</a>"
        }
        else{
          // this.visaRegNo = this.contactList.Applications[0].Applicants[0].VisaApplications[0].MyEVisaRefNo;
          this.visaRegNo = this.contactList[0].MYEVISAREFNO;
          if(this.contactList[0].Status == "B")
          {
            this.divPending = true;
            this.PendingMessage = "Application submission success and you are required  to do for mandatory Biometric Enrollment";
            this.divSucess = false;
            this.divAlert = false;
          }
          if(this.contactList[0].Status == "S")
          {
            this.divPending = true;
            this.PendingMessage = "Biometric Enrollment submitted, Pending for Approval";
            this.divSucess = false;
            this.divAlert = false;
          }
          if(this.contactList[0].Status == "A")
          {
            this.divPending = false;
            this.divSucess = true;
            this.SuccessMessage = "Application Approved";            
            this.divAlert = false;
          }
          if(this.contactList[0].Status == "R")
          {
            this.divPending = false;
            this.divSucess = false;
            this.divAlert = true;
            this.AlertMessage = "Application Rejected";        
            
          }
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
