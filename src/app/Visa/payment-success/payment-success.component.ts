import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';



@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
  providers: [DatePipe]
})
export class PaymentSuccessComponent implements OnInit {
  title = "Payment Information";
  contactID : number;
  paymentID : number;
  applicationId : number;
  applicationList : any;
  totalFees : number;
  myDate = new Date();
  dFormat : string;
  totalApplicant : number;
  ttlVisaFee : number;
  ttlProcessFee : number;
  transactionDate : string;

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

      this.dataService.getPaySummaryByApplicationId(this.applicationId).subscribe(res => 
        {
          this.applicationList = res;
          console.log(this.applicationList);

          this.totalApplicant = this.applicationList[0].TotalApplicant;
          var visaFee = 0;
          var processFee = 0;
          var TotalFee = 0;
          for(let i =0;i<this.totalApplicant;i++){
            visaFee = visaFee + this.applicationList[i].SubmissionFee;
            processFee = processFee + this.applicationList[i].ProccesingFee;
            TotalFee = TotalFee + this.applicationList[i].TotalFee;
            this.ttlVisaFee = visaFee;
            this.ttlProcessFee = processFee;
            this.totalFees = TotalFee;

          }
          
         // this.totalFees = this.applicationList[0].TotalFee;   
          this.dFormat = this.datePipe.transform(this.myDate, 'dd-MMMM-yyyy hh:mm:ss');
          this.transactionDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');

        });

        
    });


    this.dataService.getContact()
    .subscribe((data:any)=>{
      this.contactID=data.ContactID;      
    }); 
  }

  onBioClick(event: Event) {
    //this.router.navigate(['/notification',{contactId:this.contactID,paymentId:1}]);
    // this.router.navigate(['/applicant-summary-info',{applicationId:this.applicationId}]);
    this.router.navigate(['/payment-summary-info',{applicationId:this.applicationId}]);
  }

  

}
