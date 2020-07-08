import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
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
  durationOfVisitList =[{ID:'7',Name:'One Week'},{ID:'14',Name:'Two Weeks'},{ID:'21',Name:'Three Weeks'},{ID:'28',Name:'Four Weeks'}];
  JourneyList:any=["Business","Conference","Employment","Holiday","Medical / Medical Tourism","Official Trip","Study","Tourist/Social Visit","Transit","Visiting Friend / Relative"];
  visaProcessTypeList:any;
  applicationSelectedText:string;
  contactList:any;
  centerList:any;
  countryId:number;
  AgentList:any;
  contactID:number;
  centerID:number;
  contactName:string;
  myDate = new Date();
  dFormat:string;
  returnUrl: string;
  error = '';
  applicationID:number;
  applicationList:any;
  isEdited=false;


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
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  get f(){ return this.visaTypeForm.controls; }

  ngOnInit():void {  
    this.activeRouter.params.subscribe(params => {
      var applicationID = params['applicationId'];
      this.applicationID=applicationID; 

      if(this.applicationID!==undefined){
        this.dataService.getApplicationById(this.applicationID).subscribe(res => 
          {
            this.applicationList = res;
            this.isEdited=true;
            this.applicationID=this.applicationList.ApplicationID;
           // this.RegionList = Array.of(this.RegionList);
            
            this.visaTypeForm.get('submissionType').setValue(this.applicationList.SubmissionType);
            this.visaTypeForm.get('centerId').setValue(this.applicationList.CenterID);
            this.visaTypeForm.get('TotalApplicant').setValue(this.applicationList.TotalApplicant);
            this.visaTypeForm.get('DurationOfVisit').setValue(this.applicationList.DurationOfVisit);
            this.visaTypeForm.get('ApplicationTypeID').setValue(this.applicationList.ApplicationTypeID);
            this.visaTypeForm.get('PurposeOfVisit').setValue(this.applicationList.PurposeOfVisit);
            if(this.applicationList.SubmissionDate==null)
            {
              this.dFormat = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
              this.visaTypeForm.get('ContactID').setValue(this.contactID);
              this.visaTypeForm.get('SubmitedBy').setValue(this.contactName);
              this.visaTypeForm.get('SubmisisionDate').setValue(this.dFormat);
            }
            else{
              this.dFormat = this.datePipe.transform(this.applicationList.SubmissionDate, 'yyyy-mm-dd');
              this.visaTypeForm.get('ContactID').setValue(this.applicationList.ContactID);
              this.visaTypeForm.get('SubmitedBy').setValue(this.applicationList.SubmitedBy);
              this.visaTypeForm.get('SubmisisionDate').setValue(this.dFormat);
            }
            if(this.applicationList.SubmissionType==1){
              this.visaTypeForm.get('TotalApplicant').enable();
            }
            else{
              this.visaTypeForm.get('TotalApplicant').disable();
            }alert(this.dFormat);
          });

      }
    });
    this.dataService.getApplicationType().subscribe(res=>{
      this.visaProcessTypeList = res;
    },
    error=>{
      this.error = error;
    });
    this.dataService.getContact()
    .subscribe((data:any)=>{
      this.countryId=data.CountryID;
      this.contactID=data.ContactID;
      this.contactName=data.Name; 
      this.centerID=data.CenterID;  
      this.dataService.getCenterByCountryId(this.countryId).subscribe(res => {this.centerList = res;});
      this.dFormat = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      this.visaTypeForm.get('centerId').setValue(this.centerID);
      this.visaTypeForm.get('ContactID').setValue(this.contactID);
      this.visaTypeForm.get('SubmitedBy').setValue(this.contactName);
      this.visaTypeForm.get('SubmisisionDate').setValue(this.dFormat);
    });    
    
  }

  public getVisaProcess(){
    this.dataService.getApplicationType().subscribe((data:any)=>{this.visaProcessTypeList=data});
    //console.log("type :"+this.visaProcessTypeList);
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
    //console.log(this.visaTypeForm.value);
    
    if(this.visaTypeForm.invalid){
      this.isSubmitted = true;
     return;
    }

    if(this.isEdited == true){
      this.dataService.updateAplication(this.visaTypeForm.getRawValue(),this.applicationID)
      .subscribe((data:any)=>{
        console.log(data);     
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Application information updated Successfully",
        title : "Success",
        buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          this.router.navigate(['/visa-application',{applicationId:this.applicationID}]);
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
          result ? this.router.navigate(['/home']): this.router.navigate(['/visa-application',{applicationId:this.applicationID}]);
        });    
      });

    }
    else{
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
          result ? this.router.navigate(['/home']): this.router.navigate(['/applicant-information']);
        });    
      });

    }

    
  }

}
