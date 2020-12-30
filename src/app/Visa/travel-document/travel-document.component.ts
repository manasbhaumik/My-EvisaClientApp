import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-travel-document',
  templateUrl: './travel-document.component.html',
  styleUrls: ['./travel-document.component.css'],
  providers: [DatePipe]
})
export class TravelDocumentComponent implements OnInit {
  title="PARTICULAR OF PASSPORT / TRAVEL DOCUMENT";
  myDate = new Date();
  dFormat:string;
  returnUrl: string;
  error = '';
  isSubmitted=false;  
  applicantID:number;
  applicationID : number;
  dobDate: NgbDate | null;
  travelList:any;
  isEdited = false;
  travelDocId : number;
  documentTypeList:any=["Diplomatic Passport","Ordinary/International Passport","Regular/Service Passport","Emergency Passport"];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var applicantID = params['applicantId'];
      this.applicantID=applicantID; 
      });  
      this.traveldocForm.get('Applicant').setValue(this.applicantID);

      if(this.applicantID !== undefined){
        this.dataService.getTravelDocumentByApplicantId(this.applicantID).subscribe(res=>
          {
            this.travelList = res;
            console.log(this.travelList);
            this.isEdited = true;
            this.travelDocId = this.travelList[0].DocumentID;
            this.traveldocForm.get('DocumentType').setValue(this.travelList[0].DocumentType);
            this.traveldocForm.get('PassportNo').setValue(this.travelList[0].PassportNo);
            this.traveldocForm.get('fatherName').setValue(this.travelList[0].FatherName);
            this.traveldocForm.get('motherName').setValue(this.travelList[0].MotherName);
            this.traveldocForm.get('IssuingCountry').setValue(this.travelList[0].IssuingCountry);
            this.traveldocForm.get('IssuingAuthority').setValue(this.travelList[0].IssuingAuthority);
            var yearIssue = Number(this.datePipe.transform(this.travelList[0].IssuingDate, 'yyyy'));
            var monthIssue = Number(this.datePipe.transform(this.travelList[0].IssuingDate, 'MM'));
            var dayIssue = Number(this.datePipe.transform(this.travelList[0].IssuingDate, 'dd'));
            this.traveldocForm.get('IssuingDate').setValue({year: yearIssue, month: monthIssue, day: dayIssue});
            var yearExpiry = Number(this.datePipe.transform(this.travelList[0].ExpiryDate, 'yyyy'));
            var monthExpiry = Number(this.datePipe.transform(this.travelList[0].ExpiryDate, 'MM'));
            var dayExpiry = Number(this.datePipe.transform(this.travelList[0].ExpiryDate, 'dd'));
            this.traveldocForm.get('ExpiryDate').setValue({year: yearExpiry, month: monthExpiry, day: dayExpiry});
            this.applicationID = this.travelList[0].ApplicationID;
          },
          error=>{
            this.error="Message: " + error.message + "<br/>Status: " +error.status;
            //console.log(this.error);
            this.isEdited = false;
          });
      }
  }

  get f(){ return this.traveldocForm.controls; }

  traveldocForm=this.fb.group({
    DocumentType:['',Validators.required],
    PassportNo:['',Validators.required],
    IssuingCountry:['',Validators.required],
    IssuingAuthority:[''],
    IssuingDate:['',Validators.required],
    ExpiryDate:['',Validators.required],
    fatherName:[''],
    motherName:[''],
    Applicant:['']
  });

  SaveTravelDoc(){
    //console.log(this.traveldocForm.getRawValue());
    // console.log('date:'+this.dobDate);
    //console.log(this.dobDate.day+"/"+this.dobDate.month+"/"+this.dobDate.year);
    console.log(this.traveldocForm.getRawValue());
    this.isSubmitted = true;
    if(this.traveldocForm.invalid){      
     return;
    }

    var passportno = this.traveldocForm.get('PassportNo').value;

    if(this.isEdited == true){
      this.dataService.updateTravelDocument(this.traveldocForm.getRawValue(),this.travelDocId).subscribe((data:any)=>{      
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Travel document updated Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          var travelDoclist:any;    
          this.router.navigate(['/submit-application',{applicationId:this.applicationID}]);    
        // this.router.navigate(['/travel-document',{applicantId:this.applicantID}]);
        }); 
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
          result ? this.router.navigate(['/home']): this.router.navigate(['/travel-document',{applicantId:this.applicantID}]);
        });
      });
    }
    else{
      this.dataService.saveTravelDocument(this.traveldocForm.getRawValue()).subscribe((data:any)=>{      
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Applicant registered Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          var travelDoclist:any;        
          this.router.navigate(['/member-list']);
        }); 
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
          result ? this.router.navigate(['/home']): this.router.navigate(['/travel-document',{applicantId:this.applicantID}]);
        });
      });
    }
  }

  getTravelDocByID(id:number):void{
    this.dataService.getTravelDocById(id).subscribe((res:any) => {
      console.log("res "+res);
      this.travelList = res
    });
   
    console.log("visa "+this.travelList);

  }

}
