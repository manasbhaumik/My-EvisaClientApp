import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css'],
  providers: [DatePipe]
})
export class ViewReceiptComponent implements OnInit {

  applicationsList:any;
  error ='';
  myDate = new Date();
  dFormat:string;
  invoiceDate:string;
  applicationId : number;
  applicationList : number;
  totalApplicant : number;
  ttlVisaFee : number;
  ttlProcessFee : number;
  TotalFee : number;

  @ViewChild("divPrint", { static: true }) divPrint: ElementRef;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService:DataService,
    private datePipe: DatePipe,
    private activeRouter:ActivatedRoute,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['applicationId'];
      this.applicationId=applicationId;

      this.dataService.getInvoiceByApplicationId(this.applicationId).subscribe(res =>
      {
        this.applicationsList = res;
        this.invoiceDate = this.datePipe.transform(this.applicationsList[0].ReceiptDate, 'dd-MMMM-yyyy hh:mm:ss');
        this.dFormat = this.datePipe.transform(this.myDate, 'EEEE, MMMM d, y');
        this.SpinnerService.hide();
      });
    });
  }

  onPrint(divPrint: string){
    // const printContent = document.getElementById(this.divPrint.nativeElement);alert(printContent);
    // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write('<link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
    //alert(divPrint);
    let printContents = document.getElementById(divPrint).innerHTML;
   // let originalContents = document.body.innerHTML;alert(originalContents);

    window.document.write('<link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">');
    // window.document.write('<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>');
    // window.document.write('<script src="https://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>');
    window.document.write(printContents);
    //document.body.innerHTML = printContents;

    window.print();

    //document.body.innerHTML = originalContents;
   window.location.reload();
  }

}
