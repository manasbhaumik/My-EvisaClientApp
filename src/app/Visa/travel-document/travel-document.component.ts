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
  dobDate: NgbDate | null;
  travelList:any;


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
  }

  get f(){ return this.traveldocForm.controls; }

  traveldocForm=this.fb.group({
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
    console.log(this.traveldocForm.getRawValue());
   // console.log('date:'+this.dobDate);
    //console.log(this.dobDate.day+"/"+this.dobDate.month+"/"+this.dobDate.year);
    this.isSubmitted = true;
    if(this.traveldocForm.invalid){      
     return;
    }

    this.dataService.saveTravelDocument(this.traveldocForm.getRawValue())
    .subscribe((data:any)=>{
      console.log(data);
     // console.log("Visa1 "+data.Applicant.Application.PurposeOfVisit);
      //this.getTravelDocByID(data.DocumentID);     
      
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
        
         
        //  var visaApplication={
        //   ApplicantID:this.traveldocForm.get('Applicant').value,
        //   DurationOfVisit:travelDoclist.Applicant.Application.PurposeOfVisit,
        //   PurposeOfVisit:travelDoclist.Applicant.Application.DurationOfVisit,
        //   VisaTypeID:travelDoclist.Applicant.Application.VisaTypeID,
        //   ApprovalDate:""          
        // }
        // this.dataService.saveVisaApplication(visaApplication).subscribe((vdata:any)=>{console.log(vdata);});
         //this.ngOnInit();
         this.router.navigate(['/member-list']);
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
          result ? this.router.navigate(['/home']): this.router.navigate(['/travel-document',{applicantId:this.applicantID}]);
        });

    }

    );
  }

  getTravelDocByID(id:number):void{
    this.dataService.getTravelDocById(id).subscribe((res:any) => {
      console.log("res "+res);
      this.travelList = res
    });
   
    console.log("visa "+this.travelList);

  }

}
