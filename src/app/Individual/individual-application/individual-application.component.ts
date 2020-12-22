import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationTypeService } from 'src/app/_services/ApplicationServices/application-type.service';

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

  constructor(
    private _formBuilder: FormBuilder,
    private applicationTypeService: ApplicationTypeService
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
  }


  originCountryChanged() {
    this.getOrigincountry();
  }

  private getOrigincountry() {
    // this.trainingSchedules = [];

    // if (this.form.get('trainingTypeId').value) {
    //   this.trainingScheduleService.getTrainingScheduleDropdown(this.form.get('trainingTypeId').value)
    //     .subscribe(res => {
    //       this.trainingSchedules = res;
    //       console.log('list loaded');
    //     });
    // }
  }

  setFormData(model: server.applicationTypeModel) {
    this.ApplicationTypeFormGroup = new FormGroup({
      submissionType: new FormControl(model.submissionType),
      countryID: new FormControl(model.countryID),
      centerId: new FormControl(model.centerId),
      totalApplicant: new FormControl(model.totalApplicant),
      durationOfVisit: new FormControl(model.durationOfVisit),
      isSponsor: new FormControl(model.isSponsor),
      applicationTypeID: new FormControl(model.applicationTypeID),
      purposeOfVisit: new FormControl(model.purposeOfVisit),
    });

    console.log(this.ApplicationTypeFormGroup);
  }

}
