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

  title="Submission Application - Preview"
  applicationId:number;
  applicationList:any;
  myDate = new Date();
  dFormat:string;
  dob=new Date();
  issueDate:string;
  expiryDate:string;

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

      this.dataService.getApplicationsById(this.applicationId).subscribe(res => 
        {
          this.applicationList = res;
          this.dob=this.applicationList.Applicants[0].DOB;
          this.dFormat = this.datePipe.transform(this.dob, 'dd/MM/yyyy');
          this.issueDate=this.datePipe.transform(this.applicationList.Applicants[0].TravelDocuments[0].IssuingDate, 'dd/MM/yyyy')
          this.expiryDate=this.datePipe.transform(this.applicationList.Applicants[0].TravelDocuments[0].ExpiryDate, 'dd/MM/yyyy')
          // console.log(this.applicationList); 
        });
    });
  }

  onClick(event: Event) {
    this.router.navigate(['/member-list']);
  }

  onBioClick(event: Event) {
    this.router.navigate(['/bio-metric-info']);
  }

}
