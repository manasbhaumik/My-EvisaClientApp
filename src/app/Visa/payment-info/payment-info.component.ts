import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';
import { DecimalPipe } from '@angular/common';

export class Payment{
  public ApplicationId : number;
  public PaymentModeId : string;
  public TotalAmt   : number;
  public PaidAmt    : number;
  public DueAmt     : number;
  public PayDate : string;
  public Status : string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css'],
  providers: [DatePipe]
})
export class PaymentInfoComponent implements OnInit {

  payment=new Payment();

  title= "Payment Gateway - Visa Fees";//"Payment Information";
  subTitle = "Payment Information";
  applicationId:number;
  applicationList:any;
  totalApplicant : number;
  processType:any;
  applicationFees : number;
  processFees : number;
  totalFees : number;
  paymentModeList: any;
  radioSelected:string;
  paymentModule:any;
  myDate = new Date();
  dFormat:string;
  status:string;
  returnUrl : string;
  error : string;
  processPeriod:number;
  divError:boolean=false;

  // paymentInfoForm =this.fb.group({
  //    payment:['']
  // });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
   // private decimalPipe: DecimalPipe
  ) { }

  // get f(){ return this.paymentInfoForm.controls; }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      this.applicationId=applicationId;

      this.dataService.getPayInfoByApplicationId(this.applicationId).subscribe(res => 
        {
          this.applicationList = res;
          this.totalApplicant = this.applicationList[0].TotalApplicant;
          this.processType = this.applicationList[0].ApplicationType;
          this.applicationFees = this.applicationList[0].SubmissionFee;
          this.processFees = this.applicationList[0].ProccesingFee;
          this.totalFees = this.processFees*this.totalApplicant+this.applicationFees*this.totalApplicant;//this.applicationList[0].TotalFee;  
          this.processPeriod= this.applicationList[0].DurationOfVisit;       

        });

        this.dataService.getPaymentMode().subscribe(res =>
          {

            this.paymentModeList =res;console.log(this.paymentModeList);

        });
    });
    this.dFormat = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.status="S";
    this.paymentModule=new Payment();
  }

  changeGender(e) {
    console.log(e.target.value);
  }

  

  onSave(event: Event){
    
    //console.log(this.radioSelected);
    //console.log(this.totalFees);
    
    //alert(this.paymentModule);
    this.payment.ApplicationId = this.applicationId;
    this.payment.PaymentModeId = this.radioSelected;
    this.payment.TotalAmt = this.totalFees;
    this.payment.PaidAmt = this.totalFees;
    this.payment.DueAmt = this.totalFees - this.totalFees;
    this.payment.PayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.payment.Status = "S";
    // alert(this.payment=this.payment);
    //this.router.navigate(['/credit-card-info']);
    // this.payment=new Payment();
    // this.payment.append("Form", JSON.stringify(_this.data.formData));
    this.dataService.savePayment(this.applicationId,this.payment.PaymentModeId,this.payment.TotalAmt,this.payment.PaidAmt,this.payment.DueAmt,this.payment.PayDate,this.payment.Status).subscribe((data:any)=>{
      //alert(data);
      // var dialogRef= this.dialog.open(ModalComponent,{ data: {
      //   message : "Payment Successfull",
      //   title : "Success",
      //   buttonText : "Ok"
      // }});  
      // dialogRef.afterClosed().subscribe(result => {
      //   this.returnUrl = result;
      //   this.router.navigate(['/credit-card-info',{applicationId:this.applicationId}]);
      // }); 
      this.router.navigate(['/credit-card-info',{applicationId:this.applicationId}]);
    },
    error=>{
      this.error=error.error.Message;//alert(this.error);
      this.divError=true;
      // var dialogRef =this.dialog.open(ModalComponent,{ data: {
      //   message : this.error,
      //   title : "Alert!",
      //   buttonText : "Cancel"
      // }});
      // dialogRef.afterClosed().subscribe(result => {
      //   this.returnUrl = result;
      //   result ? this.router.navigate(['/home']): this.router.navigate(['/payment-info',{applicationId:this.applicationId}]);
      // });
    });
  }

}
