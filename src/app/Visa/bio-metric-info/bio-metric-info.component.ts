import { Component, OnInit ,ElementRef,Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-bio-metric-info',
  templateUrl: './bio-metric-info.component.html',
  styleUrls: ['./bio-metric-info.component.css'],
  providers: [DatePipe]
})
export class BioMetricInfoComponent implements OnInit {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoWidth = 0;
  videoHeight = 0;
  localstream ="";
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };

  title="Biometric Enrollment";
  divEvisa : boolean = true;
  divImage : boolean = true;
  divAFIS  : boolean = true;
  picture : any;
  applicantInfoList : any;
  dFormat : string;
  isSubmitted = false;
  issueDate :string;
  expiryDate :string;
  returnUrl : string;
  error : string;


  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  get f() { return this.applicantInfoForm.controls; }

  applicantInfoForm = this.fb.group({
    visaRefNo:['',Validators.required]
  });

  ngOnInit(): void {
    this.divEvisa = false;
    this.divImage = false;
    this.divAFIS = false;
  }

  showEVisa(){
    this.divEvisa = true;
    this.divImage = false;
    this.divAFIS = false;
  }

  showImage(){
    this.divEvisa = false;
    this.divImage = true;
    this.divAFIS = false;
    this.startCamera();
  }

  showAFIS(){
    this.divEvisa = false;
    this.divImage = false;
    this.divAFIS = true;
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.localstream = stream;
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
        this.videoHeight = this.videoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.picture = this.canvas.nativeElement.toDataURL("image/png");
  }

  getApplicantInfo(){
    this.isSubmitted = true;
    if(this.applicantInfoForm.invalid){
      return;
    }

    var refNo =  this.applicantInfoForm.controls['visaRefNo'].value;

    this.dataService.getApplicantStatusByVisaRefNo(refNo).subscribe(res=>{
      this.applicantInfoList=res;
      if(res == null){
        this.applicantInfoList = null;
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : "Reference number does not exists",
          title : "Alert!",
          buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/home']): this.router.navigate(['/bio-metric-info']);
        });
      }
      else{
        //this.applicantInfoList=res;
        if(!this.applicantInfoList?.length){
          var dialogRef =this.dialog.open(ModalComponent,{ data: {
            message : "Reference number does not exists",
            title : "Alert!",
            buttonText : "Cancel"
          }});
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed',result);
            this.returnUrl = result;
            result ? this.router.navigate(['/home']): this.router.navigate(['/bio-metric-info']);
          });
        }
        else{
          //this.applicantInfoList=res;
          console.log(this.applicantInfoList);
          console.log("aa" +this.applicantInfoList[0].Applicants[0].FullName );
          this.dFormat = this.datePipe.transform(this.applicantInfoList[0].Applicants[0].DOB, 'dd/MM/yyyy');
          this.issueDate=this.datePipe.transform(this.applicantInfoList[0].Applicants[0].TravelDocuments[0].IssuingDate, 'dd/MM/yyyy')
          this.expiryDate=this.datePipe.transform(this.applicantInfoList[0].Applicants[0].TravelDocuments[0].ExpiryDate, 'dd/MM/yyyy')
        }
        console.log(this.applicantInfoList);
      }
    },
    error =>{
      var dialogRef =this.dialog.open(ModalComponent,{ data: {
        message : "Not found",
        title : "Alert!",
        buttonText : "Cancel"
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        this.returnUrl = result;
        result ? this.router.navigate(['/agency-details']): this.router.navigate(['/bio-metric-info']);
      });
    });

  }

  save(){
    // this.localstream.getVideoTracks()[0].stop();

    console.log("Image : "+ this.picture.replace(/^data:image\/(png|jpg);base64,/, ""));

  }

}
