import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css'],
  providers: [DatePipe]
})
export class PaymentInfoComponent implements OnInit {

  title="Payment Information";
  applicationId:number;
  applicationList:any;
  totalApplicant : number;
  processType:any;
  applicationFees : number;
  processFees : number;
  totalFees : number;
  paymentModeList:any;
  radioSelected:any;

  paymentInfoForm =this.fb.group({
     payment:['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
   // private decimalPipe: DecimalPipe
  ) { }

  get f(){ return this.paymentInfoForm.controls; }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      this.applicationId=applicationId;

      this.dataService.getApplicationsById(this.applicationId).subscribe(res => 
        {
          this.applicationList = res;console.log(this.applicationList);
          this.totalApplicant = this.applicationList.TotalApplicant;
          this.processType = this.applicationList.ApplicationType.ApplicationType1;
          this.applicationFees = this.applicationList.ApplicationType.SubmissionFee;
          this.processFees = this.applicationList.ApplicationType.ProccesingFee;
          this.totalFees = this.applicationList.ApplicationType.TotalFee;          

        });

        this.dataService.getPaymentMode().subscribe(res =>
          {

            this.paymentModeList =res;//console.log(this.paymentModeList);

        });
    });
  }

  changeGender(e) {
    console.log(e.target.value);
  }

  onSave(event: Event){
    this.router.navigate(['/credit-card-info']);
  }

}
