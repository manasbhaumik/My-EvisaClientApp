import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';


@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css'],
  providers: [DatePipe]
})
export class AgencyDetailsComponent implements OnInit {
  title = "Agency/Organizer Information";
  myDate = new Date();
  dFormat:string;
  disableSelect: boolean = true;
  RegionList:any;
  CountryList:any;
  StateList:any;
  selectCountryText:string;
  countryCode:string;
  registerNo:string;
  agentCodeNo : string;
  AgencyTypeList:any =["Government Agency","Private Agency","Non-Government Organization","Travel Agent","Head Of Family"];
  returnUrl: string;
  error = '';
  returnAgent : any;
  AgentList:any;
  AgencyID: number;
  strAgencyId : string;
  countryId:number;
  totalAgent:number;
  agentByRegisterNoList : any;
  isEdited=false;
  buttonTitle = "Save & Continue to Contact Information";
  
  // RegionList : any = ["China","Australia","Taiwan","Indonesia","Bangladesh","Nepal","Pakistan","India"
  //                       ,"Cambodia","Myanmar","Philippines","Vietnam","Nigeria","Sri Lanka","Saudi Arabia"
  //                       ,"United Kingdom","Thailand","United State"];
  // StateList : any = ["Qinghai","Sichuan","Gansu","Heilongjiang","Yunnan","Hunan","Shaanxi","Hebei","Jilin"
  //                     ,"Hubei","Guangdong","Guizhou","Jiangxi","Henan","Shanxi","Shandong","Liaoning","Anhui"
  //                     ,"Fujian","Jiangsu","Zhejiang","Taiwan","Hainan"]; 

  agencyRegisterForm= this.fb.group({
    Region:['',Validators.required],
    RegistrationNo:[{value:'',disabled:true}],
    AgencyType:['',Validators.required],
    AgencyName:['',Validators.required],    
    ContactPerson:['',Validators.required],
    ContactNo:['',Validators.required],
    Fax:[''],
    Email:['',[Validators.required,Validators.email]],
    Address:['',Validators.required],
    Address1:[''],
    Address2:[''],
    // City: [{value:'',disabled:true},Validators.required],
    City: ['',Validators.required],
    State: [''],
    Pincode: ['']
  });
  isSubmitted=false;                    

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
    ) { }

  get f() { return this.agencyRegisterForm.controls; }

  ngOnInit(): void {
  //  this.dataService.getAllCountries().subscribe(res => {this.RegionList = res});
    // this.dataService.getAll().subscribe(res => {this.CountryList = res});
    this.activeRouter.params.subscribe(params => {
      var agencyId = params['agentId'];
      var Country=params['countryId'];
      this.AgencyID=agencyId; 
      this.strAgencyId=agencyId;
      this.countryId=Country; 

      if(this.AgencyID!==undefined){
        this.dataService.getAgentById(this.AgencyID).subscribe(res => 
          {
            this.AgentList = res;
            this.isEdited=true;
            this.buttonTitle = "Update Agency information";
            console.log(this.AgentList); 
            console.log(this.AgentList.RegistrationNo);
            console.log(this.AgentList.Country.CountryName);
            this.RegionList=this.AgentList.CountryID;
            this.RegionList = Array.of(this.RegionList);
            
            this.agencyRegisterForm.get('Region').setValue(this.AgentList.CountryID);
            this.agencyRegisterForm.get('RegistrationNo').setValue(this.AgentList.RegistrationNo);
            this.agencyRegisterForm.get('AgencyType').setValue(this.AgentList.AgencyType);
            this.agencyRegisterForm.get('AgencyName').setValue(this.AgentList.AgencyName);
            this.agencyRegisterForm.get('ContactPerson').setValue(this.AgentList.ContactPerson);
            this.agencyRegisterForm.get('ContactNo').setValue(this.AgentList.ContacNo);
            this.agencyRegisterForm.get('Fax').setValue(this.AgentList.Fax);
            this.agencyRegisterForm.get('Email').setValue(this.AgentList.Email);
            this.agencyRegisterForm.get('Address').setValue(this.AgentList.Address);
            this.agencyRegisterForm.get('Address1').setValue(this.AgentList.Address1);
            this.CountryList=[this.AgentList.Country.CountryName];
            this.agencyRegisterForm.get('City').disable();
            this.agencyRegisterForm.get('State').setValue(this.AgentList.State);
            this.agencyRegisterForm.get('Pincode').setValue(this.AgentList.Pincode);
          });

      }
    });
   
   this.dataService.getAllCountries().subscribe(res => {this.RegionList = res});
   
  }

  regionChange(e){
    var val=e.target.value;
    //this.displayState(val);
   //console.log(e.target.value);
    var selectedOptions = e.target['options'];
    var selectedIndex = selectedOptions.selectedIndex;
    var selectElementText = selectedOptions[selectedIndex].text;
    this.selectCountryText=selectElementText;
    console.log(selectElementText);
    this.CountryList = [selectElementText];
    this.agencyRegisterForm.get('City').disable();//.setValue(this.CountryList);
    this.dFormat = this.datePipe.transform(this.myDate, 'yyMM');
    this.countryIsCode(selectElementText);
   if(this.agentCodeNo="undefined"){
     this.agentCodeNo = "01";
   }
    this.dataService.getTotalAgents().subscribe(id=>{
      this.totalAgent = id;
      this.registerNo = this.countryCode+ this.agentCodeNo +this.dFormat+'/000'+(this.totalAgent+1);
      this.agencyRegisterForm.get('RegistrationNo').setValue(this.registerNo);
    });

    // this.dataService.getAgentByRegisterNo(this.registerNo).subscribe(res=>{
    //   this.agentByRegisterNoList = res;
    //   this.registerNo = this.countryCode+ this.agentCodeNo +this.dFormat+'/000'+(this.totalAgent+1);
    //   this.agencyRegisterForm.get('RegistrationNo').setValue(this.registerNo);
    // });
    
    
    
  }

  agencyChange(e){
    var selectedOptions = e.target['options'];
    var selectedIndex = selectedOptions.selectedIndex;
    var selectElementText = selectedOptions[selectedIndex].text;
    this.selectCountryText=selectElementText;
    console.log(selectElementText);

    this.agentTypeNo(selectElementText);
    this.countryIsCode(this.AgentList.Country.CountryName);
    this.dFormat = this.datePipe.transform(this.myDate, 'yyMM');

    this.dataService.getTotalAgents().subscribe(id=>{
      this.totalAgent = id;
      this.registerNo = this.countryCode+ this.agentCodeNo +this.dFormat+'/000'+(this.totalAgent+1);
      this.agencyRegisterForm.get('RegistrationNo').setValue(this.registerNo);
    });

    // this.registerNo = this.countryCode+ this.agentCodeNo +this.dFormat+'/0001';
    // this.agencyRegisterForm.get('RegistrationNo').setValue(this.registerNo);

  }

  click(e ,id:string){
    console.log(e,id);

  }

  selectChange(e) {
    console.log(e.target.text);
    var selectedVal=e.target.value;
    
    this.displayState(selectedVal);
    // this.agencyRegisterForm.get('City').setValue(e.target.value, {
    //    onlySelf: true
    // })
  }

  public displayState(selectedVal : string){
    if(selectedVal=="1"){
      this.StateList=["Melbourne"];
    }
    else if(selectedVal=="2"){
      this.StateList=["Dhaka"];
    }
    else if(selectedVal=="3"){
      this.StateList=["Phnom Penh"];
    }
    else if(selectedVal=="4"){
      this.StateList=["Beijing","Guangzhou","Hong Kong","Kunming","Shanghai"];
    }
    else if(selectedVal=="5"){
      this.StateList=["Taipei"];
    }
    else if(selectedVal=="6"){
      this.StateList=["Chennai","Mumbai","New Delhi"];
    }
    else if(selectedVal=="7"){
      this.StateList=["Jakarta","Medan","Pekan Baru","Pontianak"];
    }
    else if(selectedVal=="8"){
      this.StateList=["Yangon"];
    }
    else if(selectedVal=="9"){
      this.StateList=["Kathmandu"];
    }
    else if(selectedVal=="10"){
      this.StateList=["Abuja"];
    }
    else if(selectedVal=="11"){
      this.StateList=["Islamabad","Karachi"];
    }
    else if(selectedVal=="12"){
      this.StateList=["Manila"];
    }
    else if(selectedVal=="13"){
      this.StateList=["Jeddah"];
    }
    else if(selectedVal=="14"){
      this.StateList=["Colombo"];
    }
    else if(selectedVal=="15"){
      this.StateList=["Bangkok"];
    }
    else if(selectedVal=="16"){
      this.StateList=["London"];
    }
    else if(selectedVal=="17"){
      this.StateList=["New York"];
    }
    else if(selectedVal=="18"){
      this.StateList=["Hanoi","Ho Chin Minh"];
    }

  }

  public countryIsCode(country:string){
    if(country=="Australia"){
      this.countryCode="AU";
    }
    else if(country=="Bangladesh"){
      this.countryCode="BD";
    }
    else if(country=="Cambodia"){
      this.countryCode="KH";
    }
    else if(country=="China"){
      this.countryCode="CN";
    }
    else if(country=="Taiwan"){
      this.countryCode="TW";
    }
    else if(country=="India"){
      this.countryCode="IN";
    }
    else if(country=="Indonesia"){
      this.countryCode="ID";
    }
    else if(country=="Myanmar"){
      this.countryCode="MM";
    }
    else if(country=="Nepal"){
      this.countryCode="NP";
    }
    else if(country=="Nigeria"){
      this.countryCode="NG";
    }
    else if(country=="Pakistan"){
      this.countryCode="PK";
    }
    else if(country=="Philippines"){
      this.countryCode="PH";
    }
    else if(country=="Saudi Arabia"){
      this.countryCode="SA";
    }
    else if(country=="Sri Lanka"){
      this.countryCode="LK";
    }
    else if(country=="Thailand"){
      this.countryCode="TH";
    }
    else if(country=="United Kingdom"){
      this.countryCode="GB";
    }
    else if(country=="United State"){
      this.countryCode="US";
    }
    else if(country=="Vietnam"){
      this.countryCode="VN";
    }
    

  }

  public agentTypeNo(agentCode : string){
    
    if(agentCode=="Government Agency"){
      this.agentCodeNo="01";
    }
    else if(agentCode=="Private Agency"){
      this.agentCodeNo="02";
    }
    else if(agentCode=="Non-Government Organization"){
      this.agentCodeNo="03";
    }
    else if(agentCode=="Travel Agent"){
      this.agentCodeNo="04";
    }
    else if(agentCode=="Head Of Family"){
      this.agentCodeNo="05";
    }
    

  }

  SaveAgency(){
    this.agencyRegisterForm.get('RegistrationNo').value;
    console.log(this.agencyRegisterForm.getRawValue());
    this.isSubmitted = true;
    if(this.agencyRegisterForm.invalid){
      return;
    }

    if(this.isEdited == true){
      this.dataService.updateAgent(this.agencyRegisterForm.getRawValue(),this.AgencyID)
      .subscribe((data:any)=>{
       var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Agent information updated Successfully",
          title : "Success",
          buttonText : "Ok"
          }});  
          dialogRef.afterClosed().subscribe(
            result => {
            console.log('The dialog was closed',result);
            this.returnUrl = result;
            //this.ngOnInit();
            this.router.navigate(['/agency-details',{agentId:this.AgencyID,countryId:this.countryId}]);
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
            result ? this.router.navigate(['/agency-details']): this.router.navigate(['/agency-details',{agentId:this.AgencyID,countryId:this.countryId}]);
          });    
      });
    }
    else{
      this.dataService.agentRegister(this.agencyRegisterForm.getRawValue())
      .subscribe((data:any)=>{
       var dialogRef= this.dialog.open(ModalComponent,{ data: {
          message : "Agent registered Successfully, click ok to fill contact information",
          title : "Success",
          buttonText : "Ok"
          }});  
          dialogRef.afterClosed().subscribe(
            result => {
            console.log('The dialog was closed',result);
            this.returnUrl = result;
            //this.ngOnInit();
            this.router.navigate(['/agency-contact-detail',{agentId:data.AgencyID,countryId:data.CountryID}]);
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
            result ? this.router.navigate(['/agency-details']): this.router.navigate(['/agency-details']);
          });    
      });
    }
  }

}
