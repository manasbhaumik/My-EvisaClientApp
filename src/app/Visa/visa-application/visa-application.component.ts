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
 // durationOfVisitList =[{ID:'7',Name:'One Week'},{ID:'14',Name:'Two Weeks'},{ID:'21',Name:'Three Weeks'},{ID:'28',Name:'Four Weeks'}];
  durationOfVisitList=[{ID:'15',Name:'15'}];
  //JourneyList:any=["Business","Conference","Employment","Holiday","Medical / Medical Tourism","Official Trip","Study","Tourist/Social Visit","Transit","Visiting Friend / Relative"];
  JourneyList:any=["Education - Studies","Business Trip","Official Trip","Conference","Employment","Holiday","Social Visit","Medical Treatment","Visiting Friend / Relative","Transit"];
  VisaTypeList:any=[{ID:'1',Name:'e-Tourist Visa'},{ID:'2',Name:'e-Business Visa',disabled:true},{ID:'3',Name:'e-Conference Visa',disabled:true},{ID:'4',Name:'e-Student Visa',disabled:true},{ID:'5',Name:'e-Medical Attendant Visa',disabled:true}];
  selectedJourneyType:any=[];
  visaProcessTypeList:any;
  applicationSelectedText:string;
  applicationSelectedIndex:any;
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
  countryList:any;
  SponsorList:any=[{ID:'1',Name:'Sponsor by Government',disabled : true},{ID:'2',Name:'Sponsor by Government Agency'},{ID:'3',Name:'Sponsor by Public/Private Company'},{ID:'4',Name:'Sponsor by Association'},{ID:'5',Name:'Self-Dependent'}]
  selectedSponser:any=[];
  embassyID:any;


  visaTypeForm=this.fb.group({
    ApplicationTypeID:['',Validators.required],
    submissionType:['',Validators.required],
    centerId:['',Validators.required],
    ContactID:[''],
    TotalApplicant:['',Validators.required],
    PurposeOfVisit:['',Validators.required],
    DurationOfVisit:['',Validators.required],
    SubmitedBy:[''],
    SubmisisionDate:[''],
    countryId:[],
    SponsorID:[],
    UpdatedBy:[''],
    UpdatedDate:[''],
    VisaTypeID:['',Validators.required]
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
    //window.location.reload();
    this.dataService.getApplicationType().subscribe(res=>{
      this.visaProcessTypeList = res;
    },
    error=>{
      this.error = error;
    });

    this.dataService.getAllCountries().subscribe(res => {this.countryList = res});

    this.dataService.getContact().subscribe((data:any)=>{
      this.countryId=data.CountryID;
      this.contactID=data.ContactID;
      this.contactName=data.Name; 
      this.centerID=data.CenterID; 
      this.embassyID = localStorage.getItem("SelectedEmbassy");      
      this.visaTypeForm.get('ContactID').setValue(this.contactID);
      this.visaTypeForm.get('SubmitedBy').setValue(this.contactName);
      this.dFormat = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
      this.visaTypeForm.get('SubmisisionDate').setValue(this.dFormat);
     
    });

    this.activeRouter.params.subscribe(params => {
      var applicationID = params['applicationId'];
      this.applicationID=applicationID; 

      if(this.applicationID!==undefined){        
        this.dataService.getApplicationById(this.applicationID).subscribe(res => 
        {
          this.applicationList = res;
          this.isEdited=true;
          this.applicationID=this.applicationList[0].ApplicationID;
          this.dataService.getCenterByCountryId_V01(this.applicationList[0].CountryID).subscribe(res => {this.centerList = res;});
          // this.RegionList = Array.of(this.RegionList);
          this.visaTypeForm.get('submissionType').setValue(this.applicationList[0].SubmissionType);
          this.applicationSelectedIndex = this.applicationList[0].SubmissionType;
          this.visaTypeForm.get('countryId').setValue(this.applicationList[0].CountryID);
          this.visaTypeForm.get('centerId').setValue(this.applicationList[0].CenterID);
          this.visaTypeForm.get('TotalApplicant').setValue(this.applicationList[0].TotalApplicant);
          this.visaTypeForm.get('DurationOfVisit').setValue(this.applicationList[0].DurationOfVisit);
          this.visaTypeForm.get('SponsorID').setValue(this.applicationList[0].SponsorID);
          this.visaTypeForm.get('ApplicationTypeID').setValue(this.applicationList[0].ApplicationTypeID);
          this.visaTypeForm.get('PurposeOfVisit').setValue(this.applicationList[0].PurposeOfVisit);
          this.visaTypeForm.get('VisaTypeID').setValue(this.applicationList[0].VisaTypeID);
          if(this.applicationList[0].SubmissionDate==null)
          {
            this.dFormat = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
            this.visaTypeForm.get('ContactID').setValue(this.contactID);
            this.visaTypeForm.get('SubmitedBy').setValue(this.contactName);
            this.visaTypeForm.get('SubmisisionDate').setValue(this.dFormat);
            this.visaTypeForm.get('UpdatedBy').setValue(this.contactID);
            this.visaTypeForm.get('UpdatedDate').setValue(this.dFormat);
          }
          else{
            this.dFormat = this.datePipe.transform(this.applicationList[0].SubmissionDate, 'yyyy-MM-dd hh:mm:ss');
            this.visaTypeForm.get('ContactID').setValue(this.applicationList[0].ContactID);
            this.visaTypeForm.get('SubmitedBy').setValue(this.applicationList[0].SubmitedBy);
            this.visaTypeForm.get('SubmisisionDate').setValue(this.dFormat);
            this.visaTypeForm.get('UpdatedBy').setValue(this.contactID);
            this.visaTypeForm.get('UpdatedDate').setValue(this.dFormat);
          }
          if(this.applicationList[0].SubmissionType==1){
            this.visaTypeForm.get('TotalApplicant').enable();
          }
          else{
            this.visaTypeForm.get('TotalApplicant').disable();
          }
        });

      }
      else{
        if(this.embassyID==undefined){
          this.dataService.getCenterByCountryId_V01(localStorage.getItem("SelectedCountry")).subscribe(res => {this.centerList = res;});
          this.visaTypeForm.get('submissionType').setValue(localStorage.getItem("SubmissionType"));
          this.applicationSelectedIndex = localStorage.getItem("SubmissionType");
          this.visaTypeForm.get('countryId').setValue(localStorage.getItem("SelectedCountry"));
          this.visaTypeForm.get('centerId').setValue(localStorage.getItem("SelectedEmbassy"));
          this.visaTypeForm.get('TotalApplicant').setValue(localStorage.getItem("NoOfTraveller"));
          this.visaTypeForm.get('DurationOfVisit').setValue(localStorage.getItem("Duration"));
          this.visaTypeForm.get('SponsorID').setValue(localStorage.getItem("Sponsor"));
          this.visaTypeForm.get('ApplicationTypeID').setValue(localStorage.getItem("ApplicationType"));
          //this.visaTypeForm.get('PurposeOfVisit').setValue(localStorage.getItem("SelectedJourney"));
          this.visaTypeForm.get('VisaTypeID').setValue(localStorage.getItem("SelectedJourney"));
          if(this.visaTypeForm.get('submissionType').value==1){
            this.visaTypeForm.get('TotalApplicant').enable();
          }
          else{
            this.visaTypeForm.get('TotalApplicant').disable();
          }
          if(localStorage.getItem("Duration")==null) 
          {
            this.visaTypeForm.get('DurationOfVisit').setValue(15);
          }
          else{
            this.visaTypeForm.get('DurationOfVisit').setValue(localStorage.getItem("Duration"));
          } 
        }
        else{
          this.dataService.getCenterByCountryId_V01(this.countryId).subscribe(res => {this.centerList = res;});
        }
      }
    });    
  }

  selectCenter(e){
    var value =e.target.value;
    this.dataService.getCenterByCountryId_V01(value).subscribe(res => 
      {
        this.centerList = res;
      },
      error=>{
        this.error=error.error.Message;
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : this.error,
          title : "Alert!",
          buttonText : "Cancel"
        }});
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
    this.applicationSelectedIndex = selectedIndex;
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
        //console.log(data);     
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Application information updated Successfully",
        title : "Success",
        buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          //console.log('The dialog was closed',result);
          this.returnUrl = result;
          this.router.navigate(['/submit-application',{applicationId:this.applicationID}]);
          //this.router.navigate(['/visa-application',{applicationId:this.applicationID}]);
          //this.router.navigate(['/agency-contact-detail',{agentId:data.AgencyID,countryId:data.CountryID}]);
        });      
      },
      error=>{
        //console.log("error :"+error);
        this.error=error.error.Message;
        //console.log(error.error.Message);
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : this.error,
          title : "Alert!",
          buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/home']): this.router.navigate(['/visa-application',{applicationId:this.applicationID}]);
        });    
      });

    }
    else{
      this.dataService.saveAplication(this.visaTypeForm.getRawValue())
      .subscribe((data:any)=>{
        //console.log(data);
        if(this.applicationSelectedIndex==2){
          this.router.navigate(['/applicant-information',{applicationId:data.ApplicationID}]);
        }
        else{
          this.router.navigate(['/group-applicant-information',{applicationId:data.ApplicationID}]);
        }     
        // var dialogRef= this.dialog.open(ModalComponent,{ data: {
        // message : "Application registered Successfully, please click Ok to fill applicant information",
        // title : "Success",
        // buttonText : "Ok"
        // }});  
        // dialogRef.afterClosed().subscribe(
        //   result => {
        //   //console.log('The dialog was closed',result);
        //   this.returnUrl = result;
        //   if(this.applicationSelectedIndex==2){
        //     this.router.navigate(['/applicant-information',{applicationId:data.ApplicationID}]);
        //   }
        //   else{
        //     this.router.navigate(['/group-applicant-information',{applicationId:data.ApplicationID}]);
        //   }
          
        // });      
      },
      error=>{
        //console.log("error :"+error);
        this.error=error.error.Message;
        //console.log(error.error.Message);
        // var dialogRef =this.dialog.open(ModalComponent,{ data: {
        //   message : this.error,
        //   title : "Alert!",
        //   buttonText : "Cancel"
        // }});
        // dialogRef.afterClosed().subscribe(result => {
        //   //console.log('The dialog was closed',result);
        //   this.returnUrl = result;
        //   result ? this.router.navigate(['/home']): this.router.navigate(['/visa-application']);
        // });    
      });

    }

    
  }

}
