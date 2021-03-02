import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [DatePipe]
})
export class RegistrationComponent implements OnInit {
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
  buttonTitle = "Save";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  get f() { return this.userRegisterForm.controls; }

  ngOnInit(): void {
    this.dataService.getAllCountries().subscribe(res => {this.CountryList = res});
    this.dataService.getCenter().subscribe(res => 
      {
        // alert("1");
        // console.log("qq");
        this.centerList = res;
        
      },
      error=>{
        this.error=error.error.Message;
        console.log(error.error.Message);
        // var dialogRef =this.dialog.open(ModalComponent,{ data: {
        //   message : this.error,
        //   title : "Alert!",
        //   buttonText : "Cancel"
        // }});
        // dialogRef.afterClosed().subscribe(result => {
        //   this.returnUrl = result;
        //   result ? this.router.navigate(['/registration']): this.router.navigate(['/registration',{agentId:this.AgencyID,countryId:this.countryId,contactId:this.contactID}]);
        // });

      });
    this.activeRouter.params.subscribe(params => {
      var agencyId = params['agentId'];
      var Country=params['countryId'];
      var contactId = params['contactId'];
      this.AgencyID=agencyId; 
      this.strAgencyId=agencyId;
      this.countryId=Country;  
      this.contactID =  contactId;
    });  

    if(this.contactID !== undefined){
      this.dataService.getContactById(this.contactID).subscribe(res=>{
        this.contactList = res;
        this.isEdited=true;
        this.buttonTitle = "Update contact information";

        this.dataService.getCenterByCountryId_V01(this.contactList.CountryID).subscribe(res => {this.centerList = res});
  
        this.userRegisterForm.get('Name').setValue(this.contactList.Name);
        this.userRegisterForm.get('CountryId').setValue(this.contactList.CountryID);
        this.userRegisterForm.get('centerId').setValue(this.contactList.CenterID);
        this.userRegisterForm.get('idNo').setValue(this.contactList.IDNumber);
        this.userRegisterForm.get('Email').setValue(this.contactList.Email);
        this.userRegisterForm.get('ContactNo').setValue(this.contactList.ContactNo);
      });
    }
  }

  regionChange(e){
    var value =e.target.value;
    this.dataService.getCenterByCountryId_V01(value).subscribe(res => {this.centerList = res});
  }

  userRegisterForm=this.fb.group({

    Name:['',Validators.required],
    Email:['',[Validators.required,Validators.email]],
    idNo:['',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]],
    ContactNo:['',Validators.required],
    CountryId:['',Validators.required],  
    centerId:['',Validators.required],
    Password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
    RePassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
  },
  {validator: this.passwordMatchValidator});

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['Password'].value === frm.controls['RePassword'].value ? null : {'mismatch': true};
  }

  get Password() { return this.userRegisterForm.get('Password'); }
  get confRePasswordirm_password() { return this.userRegisterForm.get('RePassword'); }

  RegisterUser(){
    
    this.isSubmitted = true;
    if(this.userRegisterForm.invalid){
      return;
    }
    //console.log(this.userRegisterForm.getRawValue());

    if(this.isEdited == true){

      this.dataService.updateContact(this.userRegisterForm.getRawValue(),this.contactID)
      .subscribe((data:any)=>{
        //console.log(data);
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Contact information updated Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed',result);
          this.returnUrl = result;
          //this.ngOnInit();
          this.router.navigate(['/registration',{agentId:this.AgencyID,countryId:this.countryId,contactId:this.contactID}]);
        }); 
      },
      error=>{
        this.error=error.error.Message;
        //console.log(error.error.Message);
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : this.error,
          title : "Alert!",
          buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
         // console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/registration']): this.router.navigate(['/registration',{agentId:this.AgencyID,countryId:this.countryId,contactId:this.contactID}]);
        });

      });

    }
    else{

      this.dataService.saveRegisterUser(this.userRegisterForm.getRawValue())
      .subscribe((data:any)=>{
        //console.log(data);
        var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : data,//"Contact agent registered Successfully",
          title : "Success",
          buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed',result);
          this.returnUrl = result;
          //this.ngOnInit();
          this.router.navigate(['/login']);
        }); 
      },
      error=>{
        this.error=error.error.Message;
        //console.log(error.error.Message);
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : this.error,
          title : "Alert!",
          buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/registration']): this.router.navigate(['/registration',{agentId:this.AgencyID,countryId:this.countryId}]);
        });

      });

    }
  }

}
