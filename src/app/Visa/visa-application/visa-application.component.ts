import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-visa-application',
  templateUrl: './visa-application.component.html',
  styleUrls: ['./visa-application.component.css'],
  providers: [DatePipe]
})
export class VisaApplicationComponent implements OnInit {

  title="New Visa Application";
  totalApplicantsTitle:string;
  submissionTypeList:any =[{ID:'1',Name:'Group of My E-Visa'},{ID:'2',Name:'Individual’s MyE-Visa'}];
  durationOfVisitList =[{ID:'1',Name:'One Week'},{ID:'2',Name:'Two Weeks'},{ID:'3',Name:'Three Weeks'},{ID:'4',Name:'Four Weeks'}];
  JourneyList:any=["Business","Conference","Employment","Holiday","Medical / Medical Tourism","Official Trip","Study","Tourist/Social Visit","Transit","Visiting Friend / Relative"];
  visaProcessTypeList:any;
  applicationSelectedText:string;
  contactList:any;
  centerList:any;
  countryId:number;
  AgentList:any;
  contactID:number;
  contactName:string;
  myDate = new Date();
  dFormat:string;
  returnUrl: string;
  error = '';


  visaTypeForm=this.fb.group({
    ApplicationTypeID:['',Validators.required],
    submissionType:['',Validators.required],
    centerId:['',Validators.required],
    ContactID:[''],
    TotalApplicant:['',Validators.required],
    PurposeOfVisit:['',Validators.required],
    DurationOfVisit:['',Validators.required],
    SubmitedBy:[''],
    SubmisisionDate:['']
  });
  isSubmitted=false;  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog
  ) { }

  get f(){ return this.visaTypeForm.controls; }

  ngOnInit():void {
    
    //this.dataService.getCenterByCountryId(this.countryId).subscribe(res => {this.centerList = res});
    this.dataService.getContact()
    .subscribe((data:any)=>{
      console.log(data);
      this.countryId=data.CountryID;
      this.contactID=data.ContactID;
      this.contactName=data.Name;
      //console.log("Coutry: "+this.countryId);    
      this.dataService.getCenterByCountryId(this.countryId).subscribe(res => {this.centerList = res});
      //alert(this.visaProcessTypeList);
      this.dFormat = this.datePipe.transform(this.myDate, 'yyyy-mm-dd hh:mm:ss');
      this.visaTypeForm.get('ContactID').setValue(this.contactID);
      this.visaTypeForm.get('SubmitedBy').setValue(this.contactName);
     // alert(this.dFormat);
      this.visaTypeForm.get('SubmisisionDate').setValue(this.myDate);
    });
    
    this.dataService.getApplicationType().subscribe((data:any)=>{this.visaProcessTypeList=data});
    //this.getVisaProcess();
    
    
  }

  public getVisaProcess(){
    this.dataService.getApplicationType().subscribe((data:any)=>{this.visaProcessTypeList=data});
    console.log("type :"+this.visaProcessTypeList);
  }

  submissionChange(e){
    var selectedOptions = e.target['options'];
    var selectedIndex = selectedOptions.selectedIndex;
    var selectElementText = selectedOptions[selectedIndex].text;
    this.applicationSelectedText=selectElementText;
    if(this.applicationSelectedText=="Individual’s MyE-Visa"){
      this.visaTypeForm.get('TotalApplicant').disable();
      this.visaTypeForm.get('TotalApplicant').setValue(1);
    }
    else{
      this.visaTypeForm.get('TotalApplicant').enable();
    }
  }

  SaveApplication(){
    console.log(this.visaTypeForm.value);
    
    if(this.visaTypeForm.invalid){
      this.isSubmitted = true;
     return;
    }

    this.dataService.saveAplication(this.visaTypeForm.getRawValue())
    .subscribe((data:any)=>{
      console.log(data);     
     var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Application registered Successfully, please click Ok to fill applicant information",
        title : "Success",
        buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          this.router.navigate(['/applicant-information',{applicationId:data.ApplicationID}]);
          //this.router.navigate(['/agency-contact-detail',{agentId:data.AgencyID,countryId:data.CountryID}]);
        });      
    },
    error=>{
      console.log("error :"+error);
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
          //this.router.navigate(['/applicant-information']);
          result ? this.router.navigate(['/home']): this.router.navigate(['/applicant-information']);
        });    
    });

    //this.dataService.getContact().subscribe(res=>{this.contactList=res});
   // console.log("1:"+this.contactList);
  }

}
