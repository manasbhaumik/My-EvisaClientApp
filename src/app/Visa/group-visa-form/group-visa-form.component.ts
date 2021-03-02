import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-group-visa-form',
  templateUrl: './group-visa-form.component.html',
  styleUrls: ['./group-visa-form.component.css'],
  providers: [DatePipe]
})
export class GroupVisaFormComponent implements OnInit {
  title="VISA APPLICATION FORM (IM 47 – PIN 1/79)";
  applicationId:number;
  applicantId:number;
  applicationList:any;
  myDate = new Date();
  dFormat:string;
  dob=new Date();
  issueDate:string;
  expiryDate:string;
  applicationDesc:string;

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
      var applicantID = params['applicantId'];
      this.applicationId=applicationId;
      this.applicantId=applicantID;

      this.dataService.getGroupApplicantById(this.applicationId,this.applicantId).subscribe(res => 
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
    });
  }

  onPaymentClick(event: Event){
    this.router.navigate(['/group-registration',{applicationId:this.applicationList[0].ApplicationID,applicantId:this.applicationList[0].ApplicantID}]);
  }

}
