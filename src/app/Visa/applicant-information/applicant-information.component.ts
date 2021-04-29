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

  title="Registration of New Applicant";
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
  countryList:any;
  ShowName:boolean;
  rdoSelect:number;
  groupID:number;
  divError : boolean =false;

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
    this.dataService.getAllCountries().subscribe(res => {this.countryList = res});
    
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      var applicantId = params['applicantId'];
      var groupID = params['groupId'];
      this.applicationId=applicationId; 
      this.applicantId = applicantId;
      this.groupID=groupID;
    });  
    this.applicantForm.get('Application').setValue(this.applicationId);
      

    if(this.applicantId !== undefined){
      this.dataService.getApplicantsById(this.applicantId).subscribe(res=>
      {
        this.applicantsList = res;
        this.isEdited = true;
        this.applicationId = this.applicantsList[0].ApplicationID;
        this.applicantForm.get('FullName').setValue(this.applicantsList[0].FullName);
        if(this.applicantsList[0].FamlilyName !=''){
          this.applicantForm.get('FamlilyName').setValue(this.applicantsList[0].FamlilyName);
        }
        else{
          this.applicantForm.get('FamlilyName').setValue(this.dataService.FatherName);
        }
        //this.applicantForm.get('FamlilyName').setValue(this.applicantsList[0].FamlilyName);
        this.applicantForm.get('FirstName').setValue(this.applicantsList[0].FirstName);
        this.applicantForm.get('NickName').setValue(this.applicantsList[0].NickName);
        this.applicantForm.get('Gender').setValue(this.applicantsList[0].Gender);
        var year = Number(this.datePipe.transform(this.applicantsList[0].DOB, 'yyyy'));
        var month = Number(this.datePipe.transform(this.applicantsList[0].DOB, 'MM'));
        var day = Number(this.datePipe.transform(this.applicantsList[0].DOB, 'dd'));
        this.applicantForm.get('DOB').setValue({year: year, month: month, day: day});
        this.applicantForm.get('IDNumber').setValue(this.applicantsList[0].IDNumber);
        this.applicantForm.get('ContactNo').setValue(this.applicantsList[0].ContactNo);
        this.applicantForm.get('Email').setValue(this.applicantsList[0].Email);
        this.applicantForm.get('countryId').setValue(this.applicantsList[0].CountryID);
        this.applicantForm.get('Address1').setValue(this.applicantsList[0].Address1);
        this.applicantForm.get('Address2').setValue(this.applicantsList[0].Address2);
        //this.applicantForm.get('Address3').setValue(this.applicantsList[0].Address3);
        this.applicantForm.get('City').setValue(this.applicantsList[0].City);
        this.applicantForm.get('State').setValue(this.applicantsList[0].State);
        this.applicantForm.get('PostCode').setValue(this.applicantsList[0].PostCode);
        this.applicantForm.get('Relationship').setValue(this.applicantsList[0].Relationship);
      });
    }
    else{
      this.dataService.getContact().subscribe((data:any)=>{
      this.applicantForm.get('FullName').setValue(data.Name); 
      this.applicantForm.get('IDNumber').setValue(data.IDNumber);
      this.applicantForm.get('ContactNo').setValue(data.ContactNo);
      this.applicantForm.get('Email').setValue(data.Email);
      this.applicantForm.get('countryId').setValue(data.CountryID);     
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
    Gender:['',Validators.required],
    DOB:['',Validators.required],
    countryId:['',Validators.required],
    IDNumber:['',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]],
    ContactNo:['',Validators.required],
    Email:['',Validators.required],
    //AltEmail:['',Validators.required],
    Address1:[''],
    Address2:[''],
    //Address3:[''],
    City:[''],
    State:[''],
    PostCode:[''],
    Application:[''],
    Others:[''],
    Relationship:['']
  });

  ShowOtherName(X){
    if(X==1){
      this.ShowName=true;
    }
    else{
      this.ShowName=false;
    }

  }

  SaveApplicant(){
    //console.log(this.applicantForm.getRawValue());return;
    // console.log('date:'+this.dobDate);
    //console.log(this.dobDate.day+"/"+this.dobDate.month+"/"+this.dobDate.year);
    this.isSubmitted = true;   
    if(this.applicantForm.invalid){      
     return;
    }

    this.dataService.Name = this.applicantForm.get('FullName').value;
    this.dataService.FatherName = this.applicantForm.get('FamlilyName').value;
    this.dataService.IdNumber = this.applicantForm.get('IDNumber').value;
    
    if(this.isEdited == true){
      this.dataService.updateAplicant(this.applicantForm.getRawValue(),this.applicantId,this.applicationId).subscribe((data:any)=>{
        if(this.groupID !==undefined){
          this.router.navigate(['/group-visa-form',{applicationId:this.applicationId,applicantId:this.applicantId}]);
                        
        }
        else{
          this.router.navigate(['/submit-application',{applicationId:this.applicationId}]); 
        }
        // var dialogRef= this.dialog.open(ModalComponent,{ data: {
        //   message : "Applicant information updated Successfully",
        //   title : "Success",
        //   buttonText : "Ok"
        // }});  
        // dialogRef.afterClosed().subscribe(result => {
        //   this.returnUrl = result;
        //   //this.router.navigate(['/applicant-information',{applicantId:data.ApplicantID}]);
        //   if(this.groupID !==undefined){
        //     this.router.navigate(['/group-visa-form',{applicationId:this.applicationId,applicantId:this.applicantId}]);
                          
        //   }
        //   else{
        //     this.router.navigate(['/submit-application',{applicationId:this.applicationId}]); 
        //   }
        //   //this.router.navigate(['/submit-application',{applicationId:this.applicationId}]);
        // }); 
      },
      error=>{
        this.error=error.error.Message;
        this.divError=true;
        // var dialogRef =this.dialog.open(ModalComponent,{ data: {
        //   message : this.error,
        //   title : "Alert!",
        //   buttonText : "Cancel"
        // }});
        // dialogRef.afterClosed().subscribe(result => {
        //   //console.log('The dialog was closed',result);
        //   this.returnUrl = result;
        //   result ? this.router.navigate(['/home']): this.router.navigate(['/applicant-information',{applicantId:this.applicantId}]);
        // });
      });
    }
    else{
      this.dataService.saveAplicant(this.applicantForm.getRawValue()).subscribe((data:any)=>{
        //console.log(data);
        this.router.navigate(['/travel-document',{applicantId:data.ApplicantID,applicationId:this.applicationId}]);
        // var dialogRef= this.dialog.open(ModalComponent,{ data: {
        //   message : "Applicant registered Successfully, Please click Ok to fill travel document",
        //   title : "Success",
        //   buttonText : "Ok"
        // }});  
        // dialogRef.afterClosed().subscribe(result => {
        //   //console.log('The dialog was closed',result);
        //   this.returnUrl = result;
        //   // this.router.navigate(['/travel-document',{applicantId:data.ApplicantID}]);
        //   this.router.navigate(['/travel-document',{applicantId:data.ApplicantID,applicationId:this.applicationId}]);
        // }); 
      },
      error=>{
        this.error=error.error.Message;
        //console.log(error.error.Message);
        this.divError =true;
        // var dialogRef =this.dialog.open(ModalComponent,{ data: {
        //   message : this.error,
        //   title : "Alert!",
        //   buttonText : "Cancel"
        // }});
        // dialogRef.afterClosed().subscribe(result => {
        //   //console.log('The dialog was closed',result);
        //   this.returnUrl = result;
        //   result ? this.router.navigate(['/home']): this.router.navigate(['/applicant-information',{applicantId:this.applicationId}]);
        // });
      });
    }
  }
}
