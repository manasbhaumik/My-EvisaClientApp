import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-summary-info',
  templateUrl: './payment-summary-info.component.html',
  styleUrls: ['./payment-summary-info.component.css'],
  providers: [DatePipe]
})
export class PaymentSummaryInfoComponent implements OnInit {

  applicationsList:any;
  error ='';
  dFormat:string;
  submissionDate:string;
  applicationId : number;
  applicationList : number;
  totalApplicant : number;
  ttlVisaFee : number;
  ttlProcessFee : number;
  TotalFee : number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService:DataService,
    private datePipe: DatePipe,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      this.applicationId=applicationId;

      this.dataService.getPaySummaryByApplicationId(this.applicationId).subscribe(res => 
        {
          this.applicationsList = res;
          this.totalApplicant = this.applicationsList[0].TotalApplicant;
          var visaFee = 0;
          var processFee = 0;
          var TotalFee = 0;
          for(let i =0;i<this.totalApplicant;i++){
            visaFee = visaFee + this.applicationsList[i].SubmissionFee;
            processFee = processFee + this.applicationsList[i].ProccesingFee;
            TotalFee = TotalFee + this.applicationsList[i].TotalFee;
            this.ttlVisaFee = visaFee;
            this.ttlProcessFee = processFee;
            this.TotalFee = TotalFee;

          }
         console.log(this.applicationsList);   

        });

        
    });

    // this.dataService.getApplications()
    //   .subscribe(data=>{
    //     this.applicationsList=data;
    //     //console.log(this.applicationsList);
    //     this.submissionDate = this.datePipe.transform(this.applicationsList[0].SubmissionDate, 'dd/MM/yyyy');       

    //   },
    //   error=>{
    //     this.error = error;
    //     //console.log(this.error);
    //   }

    // )
    
  }
  

}
