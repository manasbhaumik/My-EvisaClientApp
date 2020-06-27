import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-bio-metric-info',
  templateUrl: './bio-metric-info.component.html',
  styleUrls: ['./bio-metric-info.component.css']
})
export class BioMetricInfoComponent implements OnInit {
  title="Biometric Enrollment";

  constructor() { }

  ngOnInit(): void {
  }

}
