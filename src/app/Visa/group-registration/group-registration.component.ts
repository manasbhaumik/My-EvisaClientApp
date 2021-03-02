import { Component, OnInit,ElementRef,Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.css'],
  providers: [DatePipe]
})
export class GroupRegistrationComponent implements OnInit {
  @ViewChild("txtPassportNo") txtPassportNo: ElementRef;
  @ViewChild("txtNRICNO") txtNRICNO: ElementRef;
  @ViewChild("txtName") txtName: ElementRef;
  @ViewChild("txtRelationship") txtRelationship: ElementRef;
  @ViewChild("btnDisable") btnDisable : ElementRef;
  @ViewChild("hdPending") hdPending : ElementRef;

  myDate = new Date();
  dFormat:string;
  returnUrl: string;
  error = '';
  isSubmitted=false; 
  applicationId:number;
  applicantId:number;
  applicationList:any;
  passportNo:any;
  nricNo:any;
  name:any;
  relationShip:any;
  countryId:any;
  count:number;
  nooApplicant:number;
  processingFee:number;
  submissionFee:number;
  totalFee:number;
  totalApplicant:number;
  primaryPassportNo:number;
  displayBtn:boolean;

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
      var applicantId = params['applicantId'];
      
      this.applicationId=applicationId;
      this.applicantId = applicantId;

      this.getGroupApplicationList(this.applicationId);
      
    });
  }

  getGroupApplicationList(applicationID){
    this.dataService.getApplicationsPreviewById(applicationID).subscribe(res => 
      {
       this.applicationList = res;
       console.log(res);
       this.primaryPassportNo = this.applicationList[0].PassportNo;
       var count = this.applicationList.length;
       this.count = count+1;
       this.totalApplicant = count;
       this.countryId = this.applicationList[0].CountryID;
       this.nooApplicant = this.applicationList[0].TotalApplicant;
       this.processingFee = this.applicationList[0].ProccesingFee;
       this.submissionFee = this.applicationList[0].SubmissionFee;
       this.totalFee = this.processingFee*this.totalApplicant+this.submissionFee*this.totalApplicant;
       
      
      for(let i=0;i<this.totalApplicant;i++){//alert("a");
        //console.log("forloop"+this.applicationList[i].FatherName);
        //alert(this.applicationList[i].FatherName);
        if(this.applicationList[i].FatherName==""){
          this.displayBtn = false;
        }
        else{
          this.displayBtn = true;
        }
      }
      if(this.displayBtn == true){
        this.btnDisable.nativeElement.disabled = false;
      }
      else{
        this.btnDisable.nativeElement.disabled = true;
      }
       
      });
  }

  onClick(event: Event) {
    if(this.totalApplicant >= this.nooApplicant){
      var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "No of Applicant cannot be more than "+ this.nooApplicant,
        title : "Success",
        buttonText : "Ok"
      }});  
      dialogRef.afterClosed().subscribe(result => {
        this.returnUrl = result;
        this.router.navigate(['/group-registration',{applicantId:this.applicantId,applicationId:this.applicationId}]);
      }); 
    }
    else{
      this.passportNo=this.txtPassportNo.nativeElement.value;
      this.nricNo=this.txtNRICNO.nativeElement.value;
      this.name=this.txtName.nativeElement.value;
      this.relationShip=this.txtRelationship.nativeElement.value;
      
      if(this.passportNo == ''){
        this.displayErrorMessage("Please enter Passport Number Group's Member");
      }
      else if(this.nricNo == ''){
        this.displayErrorMessage("Please enter National RIC Number of the Group");        
      }
      else if(this.name == ''){
        this.displayErrorMessage("Please enter Name of one of hte Group's Member");
      }
      else if(this.relationShip == ''){
        this.displayErrorMessage("Please enter Relationship with the Head of the Group");
      }
      else{
        this.dataService.AddGroupAplicant(this.applicationId,this.name,this.nricNo,this.passportNo,this.relationShip,this.countryId).subscribe((data:any)=>{
          //console.log(data);
          var dialogRef= this.dialog.open(ModalComponent,{ data: {
            message : "Applicant added successfully",
            title : "Success",
            buttonText : "Ok"
          }});  
          dialogRef.afterClosed().subscribe(result => {
            this.returnUrl = result;
            this.router.navigate(['/group-registration',{applicantId:data.ApplicantID,applicationId:this.applicationId}]);
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
            //console.log('The dialog was closed',result);
            this.returnUrl = result;
            result ? this.router.navigate(['/home']): this.router.navigate(['/group-applicant-information',{applicantId:this.applicationId}]);
          });
        });

      }
    }
    this.clear();
    this.getGroupApplicationList(this.applicationId);
    //this.router.navigate(['/group-registration',{applicationId:this.applicationList[0].ApplicationID}]);
  }

  displayErrorMessage(message){
    var dialogRef= this.dialog.open(ModalComponent,{ data: {
      message : message,
      title : "Alert!",
      buttonText : "Cancel"
    }});  
    dialogRef.afterClosed().subscribe(result => {
      this.returnUrl = result;
      if(this.passportNo != ''){
        this.txtPassportNo.nativeElement.value = this.passportNo;
      }
      if(this.nricNo != ''){
        this.txtNRICNO.nativeElement.value = this.nricNo;
      }
      if(this.name != ''){
        this.txtName.nativeElement.value = this.name;
      }
      if(this.relationShip != ''){
        this.txtRelationship.nativeElement.value = this.relationShip;
      }
      this.router.navigate(['/group-registration',{applicantId:this.applicantId,applicationId:this.applicationId}]);
    }); 

    
  }

  deleteApplicant(applicantId){
    alert(applicantId);
    this.dataService.deleteApplicantById(applicantId).subscribe((data:any)=>{
      var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Applicant deleted successfully",
        title : "Success",
        buttonText : "Ok"
      }});  
      dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed',result);
        this.returnUrl = result;
        // this.router.navigate(['/travel-document',{applicantId:data.ApplicantID}]);
        this.router.navigate(['/group-registration',{applicantId:this.applicantId,applicationId:this.applicationId}]);
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
        result ? this.router.navigate(['/home']): this.router.navigate(['/group-registration',{applicantId:this.applicationId,applicationId:this.applicationId}]);
      });
    });

  }

  clear(){
    this.txtPassportNo.nativeElement.value="";
    this.txtNRICNO.nativeElement.value="";
    this.txtName.nativeElement.value="";
    this.txtRelationship.nativeElement.value="";
  }

  onPaymentClick(event: Event){
    //this.btnDisable.nativeElement.disabled = true;
    if(this.totalApplicant < this.nooApplicant){
      var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Total Applicant cannot be less than "+ this.nooApplicant +", Please add the new applicant",
        title : "Success",
        buttonText : "Ok"
      }});  
      dialogRef.afterClosed().subscribe(result => {
        this.returnUrl = result;
        this.router.navigate(['/group-registration',{applicantId:this.applicantId,applicationId:this.applicationId}]);
      }); 
    }
    else{
      if(this.displayBtn == true){
        this.btnDisable.nativeElement.disabled = false;
      }
      
      this.router.navigate(['/payment-info',{applicationId:this.applicationList[0].ApplicationID}]);
    }
    
  }
 

}
