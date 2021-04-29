import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-submit-application',
  templateUrl: './submit-application.component.html',
  styleUrls: ['./submit-application.component.css'],
  providers: [DatePipe]
})
export class SubmitApplicationComponent implements OnInit {

  title="Visa Application Form (IM 47 – PIN 1/97)";
  applicationTitle = "A. Detail Information Of Application";
  applicationPayTitle = "Charges & Cost Details";
  applicantTitle = "B. Detail Information Of Applicant";
  travelapplicantTitle = "C. Particular Of Passport / Travel Document";
  applicationId:number;
  applicationList:any;
  myDate = new Date();
  dFormat:string;
  dob=new Date();
  issueDate:string;
  expiryDate:string;
  applicationDesc:string;

  totalApplicant : number;
  processPeriod:number;
  processType:any;
  applicationFees : number;
  processFees : number;
  totalFees : number;
  paymentList : any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      this.applicationId=applicationId;

      this.dataService.getApplicationsPreviewById(this.applicationId).subscribe(res => 
      {
        this.applicationList = res;
        this.dob=this.applicationList[0].DOB;
        this.dFormat = this.datePipe.transform(this.dob, 'dd/MM/yyyy');
        this.issueDate=this.datePipe.transform(this.applicationList[0].IssuingDate, 'dd/MM/yyyy')
        this.expiryDate=this.datePipe.transform(this.applicationList[0].ExpiryDate, 'dd/MM/yyyy')
        var submissionType:number;
        submissionType=this.applicationList[0].SubmissionType;
        if(submissionType == 1){
          this.applicationDesc="Group of My E-Visa";
        }
        else{
          this.applicationDesc="Individual’s MyE-Visa";
        }

      });

      this.dataService.getPayInfoByApplicationId(this.applicationId).subscribe(res => 
      {
        this.paymentList = res;
        this.totalApplicant = this.paymentList[0].TotalApplicant;
        this.processType = this.paymentList[0].ApplicationType;
        this.applicationFees = this.paymentList[0].SubmissionFee;
        this.processFees = this.paymentList[0].ProccesingFee;
        this.totalFees = this.processFees*this.totalApplicant+this.applicationFees*this.totalApplicant;//this.applicationList[0].TotalFee;  
        this.processPeriod= this.paymentList[0].DurationOfVisit;       

      });

    });
  }

  onClick(event: Event) {
    this.router.navigate(['/member-list']);
  }

  onBioClick(event: Event) {
    this.router.navigate(['/bio-metric-info',{appId:this.applicationList.Applicants[0].ApplicantID}]);
  }

  coderIdIsReserved(): boolean {
    return this.applicationList.Groups.filter(i => i.ApplicationTypeID === 1).length > 0 ;
  }

  onPaymentClick(event: Event){
    this.router.navigate(['/payment-info',{applicationId:this.applicationList[0].ApplicationID}]);
  }

}
