import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-visa-application-check',
  templateUrl: './visa-application-check.component.html',
  styleUrls: ['./visa-application-check.component.css'],
  providers: [DatePipe]
})
export class VisaApplicationCheckComponent implements OnInit {
  title = "Applicant Reference Number";
  applicantStatusList : any;
  isSubmitted=false;
  returnUrl: string;
  error : string;
  divError : boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  get f() { return this.visaApplicationCheckForm.controls; }

  visaApplicationCheckForm = this.fb.group({
    visaRefNo:['',Validators.required]
  });

  ngOnInit(): void {
  }

  SearchApplicant(){
    this.isSubmitted = true;
    if(this.visaApplicationCheckForm.invalid){
      return;
    }
   // console.log(this.visaApplicationCheckForm.getRawValue());
    this.visaApplicationCheckForm.controls['visaRefNo'].value;
    var refNo =  this.visaApplicationCheckForm.controls['visaRefNo'].value;
    //console.log(refNo);
    this.dataService.getApplicantStatusByVisaRefNo(refNo).subscribe(res=>{
      this.applicantStatusList=res;
      console.log(this.applicantStatusList);
      if(res == null){
        this.applicantStatusList = null;
        this.divError = true;
        this.error = "Reference number does not exists";
        // var dialogRef =this.dialog.open(ModalComponent,{ data: {
        //   message : "Reference number does not exists",
        //   title : "Alert!",
        //   buttonText : "Cancel"
        // }});
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed',result);
        //   this.returnUrl = result;
        //   result ? this.router.navigate(['/agency-details']): this.router.navigate(['/visa-application-check']);
        // });
      }
      else{
        this.applicantStatusList=res;
        if(!this.applicantStatusList?.length){
          this.divError = true;
          this.error = "Reference number does not exists";
          // var dialogRef =this.dialog.open(ModalComponent,{ data: {
          //   message : "Reference number does not exists",
          //   title : "Alert!",
          //   buttonText : "Cancel"
          // }});
          // dialogRef.afterClosed().subscribe(result => {
          //   console.log('The dialog was closed',result);
          //   this.returnUrl = result;
          //   result ? this.router.navigate(['/agency-details']): this.router.navigate(['/visa-application-check']);
          // });
        }
        else{
          this.applicantStatusList=res;
        }
        //console.log(this.applicantStatusList);
      }
    },
    error =>{
      this.divError = true;
      this.error = "Record Not Found";
      // var dialogRef =this.dialog.open(ModalComponent,{ data: {
      //   message : "Not found",
      //   title : "Alert!",
      //   buttonText : "Cancel"
      // }});
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed',result);
      //   this.returnUrl = result;
      //   result ? this.router.navigate(['/agency-details']): this.router.navigate(['/visa-application-check']);
      // });
    });

  }

  goToSubmitApplication(applicationId){
    this.router.navigate(['/submit-application',{applicationId:applicationId}]);

  }

  popupApplicationStatus(applicationStatus){
    var message="";
    if(applicationStatus == "Y"||applicationStatus =="P"){
      message = "This application is pending for payment";
    }
    else if(applicationStatus == "B"){
      message = "This application is pending for Biometric Enrollment";

    }
    else if(applicationStatus == "S"){
      message = "This application is pending for Approval";

    }
    else if(applicationStatus == "A"){
      message = "This application is Approved";

    }
    else if(applicationStatus == "R"){
      message = "This application is Rejected";

    }
    else if(applicationStatus == "C"){
      message = "Your application successfully submitted";

    }
    var dialogRef =this.dialog.open(ModalComponent,{ data: {
      message : message,
      title : "Success",
      buttonText : "Ok"
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.returnUrl = result;
      result ? this.router.navigate(['/agency-details']): this.router.navigate(['/visa-application-check']);
    });
  }

  popupDateofSubmission(submissionDate){
    var message="";
    var sDate="";
    sDate = this.datePipe.transform(submissionDate, 'yyyy-MM-dd');
    message = "Date of submission : " + sDate;
    var dialogRef =this.dialog.open(ModalComponent,{ data: {
      message : message,
      title : "Success",
      buttonText : "Ok"
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.returnUrl = result;
      result ? this.router.navigate(['/agency-details']): this.router.navigate(['/visa-application-check']);
    });

  }

  popupVisaStatus(visaStatus,applicationStatus){
    var message = "";
    if(visaStatus == "P"){
      if(applicationStatus == "Y"||applicationStatus =="P"){
        message = "Your visa is pending for payment";
      }
      else if(applicationStatus == "B"){
        message = "Your visa is pending for Mandatory Biometric Appointment";
      }
      else if(applicationStatus == "S"){
        message = "Your visa is pending for Approval";
      }
    }
    else if(visaStatus == "A"){
      message = "Your visa is Approved";
    }
    else if(visaStatus == "R"){
      message = "Your visa is Rejected";
    }
    var dialogRef =this.dialog.open(ModalComponent,{ data: {
      message : message,
      title : "Success",
      buttonText : "Ok"
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.returnUrl = result;
      result ? this.router.navigate(['/agency-details']): this.router.navigate(['/visa-application-check']);
    });

  }

}
