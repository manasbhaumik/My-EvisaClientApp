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
  contactID : number;
  paymentID : number;
  applicationId : number;
  applicationList : any;
  totalFees : number;

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
          this.totalFees = this.applicationList[0].TotalAmount;   

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
