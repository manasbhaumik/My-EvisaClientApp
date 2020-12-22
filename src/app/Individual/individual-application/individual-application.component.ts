import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private _formBuilder: FormBuilder
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

}
