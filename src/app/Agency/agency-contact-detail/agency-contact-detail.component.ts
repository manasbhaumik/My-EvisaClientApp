import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';
import { switchMap } from 'rxjs/operators';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-agency-contact-detail',
  templateUrl: './agency-contact-detail.component.html',
  styleUrls: ['./agency-contact-detail.component.css'],
  providers: [DatePipe]
})
export class AgencyContactDetailComponent implements OnInit {
  @Input() AgentList:any;
  @Input() count:number;
  AgencyID: number;
  Data:any;
  isSubmitted=false;  
  centerList:any;
  CountryList:any;
  countryId:number;
  agencyList:any;
  returnUrl: string;
  error : string;
  strAgencyId : string;
  contactList : any;
  contactID : number;
  isEdited=false;
  buttonTitle = "Save Contact Information";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  get f() { return this.agencyContactForm.controls; }

  ngOnInit(): void {
   this.dataService.getAllCountries().subscribe(res => {this.CountryList = res});
    //this.dataService.apiData$.subscribe(data=>this.Data=data);
   // this.AgencyID=this.Data.AgencyID;
   // this.AgencyID= this.activeRouter.snapshot.paramMap.get('id');
    this.activeRouter.params.subscribe(params => {
    var agencyId = params['agentId'];
    var Country=params['countryId'];
    var contactId = params['contactId'];
    this.AgencyID=agencyId; 
    this.strAgencyId=agencyId;
    this.countryId=Country;  
    this.contactID =  contactId;
    });    
    // this.dataService.getCenterByCountryId(this.countryId).subscribe(res => {this.centerList = res});
    //this.dataService.getCountiesByCountryId(this.countryId).subscribe(res => {this.CountryList = res});
    console.log(this.countryId +'Agent:'+this.AgencyID);
    if(this.AgencyID!=0){
      this.dataService.getCenterByCountryId(this.countryId).subscribe(res => {this.centerList = res});
      this.agencyContactForm.get('Country').disable();
      this.agencyContactForm.get('Country').setValue(this.countryId);
      this.agencyContactForm.get('Agency').setValue(this.strAgencyId);
    }
    else{
      this.dataService.getCenter().subscribe(res => {this.centerList = res});
      this.agencyContactForm.get('Country').enable();
      //this.agencyContactForm.get('Agency').setValue(0);
    }

    if(this.contactID !== undefined){
      this.dataService.getContactById(this.contactID).subscribe(res=>{
        this.contactList = res;
        this.isEdited=true;
        this.buttonTitle = "Update contact information";

        this.agencyContactForm.get('firstName').setValue(this.contactList.Name);
        this.agencyContactForm.get('Country').setValue(this.contactList.CountryID);
        this.agencyContactForm.get('centerId').setValue(this.contactList.CenterID);
        this.agencyContactForm.get('idNo').setValue(this.contactList.IDNumber);
        this.agencyContactForm.get('Email').setValue(this.contactList.Email);
        this.agencyContactForm.get('ContactNo').setValue(this.contactList.ContactNo);
        this.agencyContactForm.get('AltContactNo').setValue(this.contactList.AltContactNo);
        this.agencyContactForm.get('Address').setValue(this.contactList.Address);
        this.agencyContactForm.get('City').setValue(this.contactList.City);
        this.agencyContactForm.get('State').setValue(this.contactList.State);

      });
    }
    
   
  }

  regionChange(e){
    var value =e.target.value;
    this.dataService.getCenterByCountryId_V01(value).subscribe(res => {this.centerList = res});
  }

  agencyContactForm=this.fb.group({

    firstName:['',Validators.required],
    //contactLastName:['',Validators.required],
    idNo:['',Validators.required],
    ContactNo:['',Validators.required],
    AltContactNo:[''],
    Address:[''],
    City:[''],
    State:[''],
    Country:[''],    
    Email:['',[Validators.required,Validators.email]],
    Agency:[''],
    centerId:['',Validators.required],
    

  });

  SaveAgencyContact(){
    // if(this.AgencyID==0){
    //   alert("The Agency is not created, please create agency (or) select Agent from Agent List ");
    // }
    this.isSubmitted = true;
    if(this.agencyContactForm.invalid){
      return;
    }
    console.log(this.agencyContactForm.getRawValue());

    if(this.isEdited == true){

      this.dataService.updateContact(this.agencyContactForm.getRawValue(),this.contactID)
      .subscribe((data:any)=>{
        //console.log(data);
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Contact information updated Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          //this.ngOnInit();
          this.router.navigate(['/agency-contact-detail',{agentId:this.AgencyID,countryId:this.countryId,contactId:this.contactID}]);
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
          result ? this.router.navigate(['/agency-details']): this.router.navigate(['/agency-contact-detail',{agentId:this.AgencyID,countryId:this.countryId,contactId:this.contactID}]);
        });

      });

    }
    else{

      this.dataService.saveAgencyContact(this.agencyContactForm.getRawValue())
      .subscribe((data:any)=>{
        //console.log(data);
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : data,//"Contact agent registered Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          //this.ngOnInit();
          this.router.navigate(['/login']);
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
          result ? this.router.navigate(['/agency-details']): this.router.navigate(['/agency-contact-detail',{agentId:this.AgencyID,countryId:this.countryId}]);
        });

      });

    }
  }

}
