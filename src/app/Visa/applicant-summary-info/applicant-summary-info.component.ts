import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-applicant-summary-info',
  templateUrl: './applicant-summary-info.component.html',
  styleUrls: ['./applicant-summary-info.component.css'],
  providers: [DatePipe]
})
export class ApplicantSummaryInfoComponent implements OnInit {

  applicationsList:any;
  error ='';
  dFormat:string;
  submissionDate:string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService:DataService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    
    this.dataService.getApplications()
      .subscribe(data=>{
        this.applicationsList=data;
        //console.log(this.applicationsList);
        this.submissionDate = this.datePipe.transform(this.applicationsList[0].SubmissionDate, 'dd/MM/yyyy');       

      },
      error=>{
        this.error = error;
        //console.log(this.error);
      }

    )
    
  }

}
