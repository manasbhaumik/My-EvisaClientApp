import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-homenew',
  templateUrl: './homenew.component.html',
  styleUrls: ['./homenew.component.css'],
  providers: [DatePipe]
})
export class HomenewComponent implements OnInit {
  title="Get Your Malaysia Visa Online";
  visaTypeList:any =[{ID:'1',Name:'Group of My E-Visa'},{ID:'2',Name:'Individual’s MyE-Visa'}];
  selectedVisa:any=[];
  countryList:any=[];
  selectedCountry=[];
  selectCountry:any=[{ID:'1',Name:'Malaysia'}];
  country=[{ID:'2',Name:'Malaysia'}];
  centerList:any=[];
  selectedCenter=[];
  visaList:any=[{ID:'1',Name:'e-Tourist Visa'},{ID:'2',Name:'e-Business Visa',disabled:true},{ID:'3',Name:'e-Conference Visa',disabled:true},{ID:'4',Name:'e-Student Visa',disabled:true},{ID:'5',Name:'e-Medical Attendant Visa',disabled:true}];
  selectedVisaType=[];
  SponsorList:any=[{ID:'1',Name:'Sponsor by Government'},{ID:'2',Name:'Sponsor by Government Agency'},{ID:'3',Name:'Sponsor by Public/Private Company'},{ID:'4',Name:'Sponsor by Association'},{ID:'5',Name:'Self-Dependent'}]
  selectedSponser=[];
  visaProcessTypeList:any=[];
  selectedProcess=[];
  visaFeeList:any;
  processingPeriod:number;
  processingFee:number;
  submissionFee:number;
  totalFee:number;
  error='';

  @ViewChild("txtNoOfStay") txtNoOfStay: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dataService.getAllCountries().subscribe(res => {this.countryList = res});
    this.country = this.selectCountry[0];
    this.dataService.getApplicationType().subscribe(res=>{
      this.visaProcessTypeList = res;
    },
    error=>{
      this.error = error;
    });
    
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  selectCenter(event){
    this.dataService.getCenterByCountryId_V01(this.selectedCountry).subscribe(res => 
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

  ChangeVisa(e){    
    //console.log(this.selectedVisa);
    if(this.selectedVisa=="2"){
      this.txtNoOfStay.nativeElement.value = "1";
      this.txtNoOfStay.nativeElement.disabled=true;
      //this.getValue();
    }
    else{
      this.txtNoOfStay.nativeElement.value = "";
      this.txtNoOfStay.nativeElement.disabled=false;
    }
  }

  getValue() {
   // console.log(this.txtNoOfStay.nativeElement.value);
  }

  selectProcessType(event){
    this.dataService.getApplicationTypeById(this.selectedProcess).subscribe(data => 
      {
        console.log(data);
        this.visaFeeList = data;
        this.processingPeriod = this.visaFeeList[0].ProcessingPeriod;
        this.processingFee = this.visaFeeList[0].ProccesingFee;
        this.submissionFee = this.visaFeeList[0].SubmissionFee;
        this.totalFee = this.visaFeeList[0].TotalFee;
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

  onStartClick(event: Event) {
    this.router.navigate(['/login']);
    //this.router.navigate(['/agency-contact-detail',{agentId:0,countryId:0}]);
  }

}
