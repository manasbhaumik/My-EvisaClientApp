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
  applicantsList : any;
  applicantId : number;
  isEdited = false;

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
      var applicantId = params['applicantId'];
      this.applicationId=applicationId; 
      this.applicantId = applicantId;
      });  
      this.applicantForm.get('Application').setValue(this.applicationId);

      if(this.applicantId !== undefined){

        this.dataService.getApplicantsById(this.applicantId).subscribe(res=>
          {
            this.applicantsList = res;
            this.isEdited = true;
            this.applicationId = this.applicantsList.ApplicationID;
            this.applicantForm.get('FullName').setValue(this.applicantsList.FullName);
            this.applicantForm.get('FamlilyName').setValue(this.applicantsList.FamlilyName);
            this.applicantForm.get('FirstName').setValue(this.applicantsList.FirstName);
            this.applicantForm.get('NickName').setValue(this.applicantsList.NickName);
            this.applicantForm.get('Gender').setValue(this.applicantsList.Gender);
            var year = Number(this.datePipe.transform(this.applicantsList.DOB, 'yyyy'));
            var month = Number(this.datePipe.transform(this.applicantsList.DOB, 'MM'));
            var day = Number(this.datePipe.transform(this.applicantsList.DOB, 'dd'));
            this.applicantForm.get('DOB').setValue({year: year, month: month, day: day});
            this.applicantForm.get('IDNumber').setValue(this.applicantsList.IDNumber);
            this.applicantForm.get('ContactNo').setValue(this.applicantsList.ContactNo);
            this.applicantForm.get('Email').setValue(this.applicantsList.Email);
            this.applicantForm.get('AltEmail').setValue(this.applicantsList.Email);
            this.applicantForm.get('Address1').setValue(this.applicantsList.Address1);
            this.applicantForm.get('Address2').setValue(this.applicantsList.Address2);
            this.applicantForm.get('Address3').setValue(this.applicantsList.Address3);
            this.applicantForm.get('City').setValue(this.applicantsList.City);
            this.applicantForm.get('State').setValue(this.applicantsList.State);
            this.applicantForm.get('PostCode').setValue(this.applicantsList.PostCode);

          });
      }
  }

  applicantForm=this.fb.group({
    LastAppliedVisa:[],
    LastArrivedDate:[],
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
    //console.log(this.applicantForm.getRawValue());
    // console.log('date:'+this.dobDate);
    //console.log(this.dobDate.day+"/"+this.dobDate.month+"/"+this.dobDate.year);
    this.isSubmitted = true;
    if(this.applicantForm.invalid){      
     return;
    }
    //console.log(this.isEdited);
    if(this.isEdited == true){
      this.dataService.updateAplicant(this.applicantForm.getRawValue(),this.applicantId,this.applicationId).subscribe((data:any)=>{
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Applicant information updated Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(result => {
          this.returnUrl = result;
          this.router.navigate(['/applicant-information',{applicantId:data.ApplicantID}]);
        }); 
      },
      error=>{
        this.error=error.error.Message;
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : this.error,
          title : "Alert!",
          buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/home']): this.router.navigate(['/applicant-information',{applicantId:this.applicantId}]);
        });
      });
    }
    else{
      this.dataService.saveAplicant(this.applicantForm.getRawValue()).subscribe((data:any)=>{
        //console.log(data);
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Applicant registered Successfully, Please click Ok to fill travel document",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed',result);
          this.returnUrl = result;
          this.router.navigate(['/travel-document',{applicantId:data.ApplicantID}]);
        }); 
      },
      error=>{
        this.error=error.error.Message;
        //console.log(error.error.Message);
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
      });
    }
  }
}
