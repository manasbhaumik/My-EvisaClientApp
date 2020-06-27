import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from 'src/app/modal/modal.component';
import { NgbDateCustomParserFormatter } from 'src/app/_helpers/dateformat';

@Component({
  selector: 'app-applicant-information',
  templateUrl: './applicant-information.component.html',
  styleUrls: ['./applicant-information.component.css'],
  providers: [DatePipe]
   // ,{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})

export class ApplicantInformationComponent implements OnInit {

  title="Applicant Registration";
  myDate = new Date();
  dFormat:string;
  returnUrl: string;
  error = '';
  isSubmitted=false;  
  applicationId:number;
  dobDate: NgbDate | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private activeRouter:ActivatedRoute
  ) {
    this.dobDate = calendar.getToday();
   }

  

  get f(){ return this.applicantForm.controls; }

  ngOnInit(): void {
    //this.applicantForm.controls['DOB'].setValue(this.datePipe.transform(this.dobDate, 'dd-MM-yyyy'));
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      this.applicationId=applicationId; 
      });  
      this.applicantForm.get('Application').setValue(this.applicationId);
  }

  applicantForm=this.fb.group({
    FullName:['',Validators.required],
    FamlilyName:['',Validators.required],
    FirstName:['',Validators.required],
    NickName:[''],
    Gender:[''],
    DOB:[''],
    IDNumber:['',Validators.required],
    ContactNo:['',Validators.required],
    Email:['',Validators.required],
    AltEmail:['',Validators.required],
    Address1:[''],
    Address2:[''],
    Address3:[''],
    City:[''],
    State:[''],
    PostCode:[''],
    Application:[''],
    Others:['']

  });

  SaveApplicant(){
    console.log(this.applicantForm.getRawValue());
   // console.log('date:'+this.dobDate);
    //console.log(this.dobDate.day+"/"+this.dobDate.month+"/"+this.dobDate.year);
    this.isSubmitted = true;
    if(this.applicantForm.invalid){      
     return;
    }
    this.dataService.saveAplicant(this.applicantForm.getRawValue())
    .subscribe((data:any)=>{
      console.log(data);
      var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Applicant registered Successfully, Please click Ok to fill travel document",
        title : "Success",
        buttonText : "Ok"
      }});  
      dialogRef.afterClosed().subscribe(
        result => {
         console.log('The dialog was closed',result);
         this.returnUrl = result;
         this.router.navigate(['/travel-document',{applicantId:data.ApplicantID}]);
         //this.ngOnInit();
         // this.router.navigate(['/']);
        }
      ); 
    },
    error=>{
      this.error=error.error.Message;
      console.log(error.error.Message);
      var dialogRef =this.dialog.open(ModalComponent,{ data: {
        message : this.error,
        title : "Alert!",
        buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/home']): this.router.navigate(['/applicant-information',{applicantId:this.applicationId}]);
        });

    }

    );

  }

}
