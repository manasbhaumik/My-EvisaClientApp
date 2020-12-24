import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { ApplicationTypeModel } from 'src/app/models/applicationType/ApplicationTypeModel.cs';
import { ApplicationTypeService } from 'src/app/_services/ApplicationServices/application-type.service';
import { CountryService } from 'src/app/_services/CountryServices/country.service';

@Component({
  selector: 'app-individual-application',
  templateUrl: './individual-application.component.html',
  styleUrls: ['./individual-application.component.css']
})
export class IndividualApplicationComponent implements OnInit {

  ApplicationTypeFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isEditable = false;
  countryList: any = [];
  centerList: any = [];
  visaProcessTypeList:any=[];

  public isNew: boolean;
  public isLoading = true;

  // public allCountries: Array<server.DropdownModel<any>>;

  constructor(
    private _formBuilder: FormBuilder,
    private applicationTypeService: ApplicationTypeService,
    private countryService: CountryService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.ApplicationTypeFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    // this.countryService.getAllCountries().subscribe(res => {this.countryList = res});
    this.dataService.getAllCountries().subscribe(res => { this.countryList = res });

    this.route.params.subscribe(p => {
      const id = p.id;

      this.dataService.getApplicationType().subscribe(res=>{
        this.visaProcessTypeList = res;
      });

      // if (id === 'new') {
      //   this.isNew = true;
      // this.applicationTypeService.getApplications()
      //   .pipe(finalize(() => this.isLoading = false))
      //   .subscribe(res => {
      //     this.setFormData(res);
      //   }, err => {
      //     alert(err);
      //   });
      // } else {
      // this.isNew = false;
      // this.applicationTypeService.getApplicationById(id)
      //   .pipe(finalize(() => this.isLoading = false))
      //   .subscribe(res => {
      //     this.setFormData(res);
      //   }, err => {
      //     alert(err);
      //   });
      // }
    });
  }

  countryChanged() {
    this.getAmbassy();
  }

  private getAmbassy() {
    this.centerList = [];

    if (this.ApplicationTypeFormGroup.get('CountryID').value) {
      this.dataService.getCenterByCountryId_V01(this.ApplicationTypeFormGroup.get('CountryID').value)
        .subscribe(res => {
          this.centerList = res;
          console.log('list loaded');
        });
    }
  }

  setFormData(model: ApplicationTypeModel) {
    this.ApplicationTypeFormGroup = new FormGroup({
      SubmissionType: new FormControl(model.SubmissionType),
      countryID: new FormControl(model.CountryID),
      CenterID: new FormControl(model.CenterID),
      TotalApplicant: new FormControl(model.TotalApplicant),
      DurationOfVisit: new FormControl(model.DurationOfVisit),
      // isSponsor: new FormControl(model.isSponsor),
      ApplicationTypeID: new FormControl(model.ApplicationTypeID),
      PurposeOfVisit: new FormControl(model.PurposeOfVisit),
    });
  }

}
