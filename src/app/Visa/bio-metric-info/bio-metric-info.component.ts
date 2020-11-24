import { Component, OnInit ,ElementRef,Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';
import { NgOpenCVService, OpenCVLoadResult } from 'ng-open-cv';
import { tap, switchMap, filter } from 'rxjs/operators';
import { forkJoin, Observable, empty, fromEvent, BehaviorSubject } from 'rxjs';

declare var cv: any;

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
  localstream : any;
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };

  title="Biometric Enrollment";
  divEvisa : boolean = true;
  divEvisaDetail : boolean = true;
  divImage : boolean = true;
  divAFIS  : boolean = true;
  picture : any;
  applicantInfoList : any;
  dFormat : string;
  applicationId : number;
  applicationList : any;
  visaRefNo : string;
  isSubmitted = false;
  issueDate :string;
  expiryDate :string;
  returnUrl : string;
  error : string;
  // Notifies of the ready state of the classifiers load operation
  private classifiersLoaded = new BehaviorSubject<boolean>(false);
  classifiersLoaded$ = this.classifiersLoaded.asObservable();


  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute,
    private ngOpenCVService: NgOpenCVService
  ) { }

  get f() { return this.applicantInfoForm.controls; }

  applicantInfoForm = this.fb.group({
    visaRefNo:['',Validators.required]
  });

  // Before attempting face detection, we need to load the appropriate classifiers in memory first
  // by using the createFileFromUrl(path, url) function, which takes two parameters
  // @path: The path you will later use in the detectMultiScale function call
  // @url: The url where to retrieve the file from.
  loadClassifiers(): Observable<any> {
    return forkJoin(
      this.ngOpenCVService.createFileFromUrl(
        'haarcascade_frontalface_default.xml',
        `src/assets/opencv/data/haarcascades/haarcascade_frontalface_default.xml`
      ),
      this.ngOpenCVService.createFileFromUrl(
        'haarcascade_eye.xml',
        `src/assets/opencv/data/haarcascades/haarcascade_eye.xml`
      )
    );
  }

  ngOnInit(): void {
    this.divEvisa = false;
    this.divImage = false;
    this.divAFIS = false;
    this.divEvisaDetail = false;
    this.getApplicationDetail();
    this.openNgCVService();
  }

  openNgCVService(){
    // Always subscribe to the NgOpenCVService isReady$ observer before using a CV related function to ensure that the OpenCV has been
    // successfully loaded
    this.ngOpenCVService.isReady$
      .pipe(
        // The OpenCV library has been successfully loaded if result.ready === true
        filter((result: OpenCVLoadResult) => result.ready),
        switchMap(() => {
          // Load the face and eye classifiers files
          return this.loadClassifiers();
        })
      )
      .subscribe(() => {
        // The classifiers have been succesfully loaded
        this.classifiersLoaded.next(true);
      });
  }

  ngAfterViewInit(): void {
    // Here we just load our example image to the canvas
    this.ngOpenCVService.isReady$
      .pipe(
        filter((result: OpenCVLoadResult) => result.ready),
        tap((result: OpenCVLoadResult) => {
          this.ngOpenCVService.loadImageToHTMLCanvas(this.videoElement.nativeElement, this.canvas.nativeElement).subscribe();
        })
      )
      .subscribe(() => {});
  }


  getApplicationDetail(){
    this.activeRouter.params.subscribe(params => {
      var applicationId = params['appId'];
      this.applicationId=applicationId;

      this.dataService.getApplicantsById(this.applicationId).subscribe(res => 
        {
          this.applicationList = res;console.log(this.applicationList);
          this.visaRefNo = this.applicationList.VisaApplications[0].MyEVisaRefNo;         

        });
    });
  }

  showEVisa(){
    this.divEvisa = true;
    this.divImage = false;
    this.divAFIS = false;
    this.divEvisaDetail = false;
  }

  showImage(){
    this.divEvisa = false;
    this.divImage = true;
    this.divAFIS = false;
    this.divEvisaDetail = false;
    this.startCamera();
  }

  showAFIS(){
    this.divEvisa = false;
    this.divImage = false;
    this.divAFIS = true;
    this.divEvisaDetail = false;
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    console.log(stream);
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
    //this.canvas.nativeElement.getContext('2d').fillRect(this.videoElement.nativeElement, 25, 25, 100, 100);
    this.picture = this.canvas.nativeElement.toDataURL("image/png");
    this.detectFace();
    
    this.videoElement.nativeElement.pause();
    if (this.localstream.stop) {
      this.localstream.stop();
    }
    if (this.localstream.getVideoTracks) {
      this.localstream.getVideoTracks().forEach((track: any) => {
        track.stop();
      });
    }
  }

  getApplicantInfo(){
    this.divEvisaDetail = true;
    this.isSubmitted = true;
    if(this.applicantInfoForm.invalid){
      return;
    }

    var refNo =  this.applicantInfoForm.controls['visaRefNo'].value;

    this.dataService.getApplicantStatusByVisaRefNo(refNo).subscribe(res=>{
      this.applicantInfoList=res;
      if(res == null){
        this.divEvisaDetail = false;
        this.applicantInfoList = null;
        var dialogRef =this.dialog.open(ModalComponent,{ data: {
          message : "Reference number does not exists",
          title : "Alert!",
          buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/home']): this.router.navigate(['/bio-metric-info',{appId:this.applicationList.Applicants[0].ApplicantID}]);
        });
      }
      else{
        //this.applicantInfoList=res;
        this.divEvisaDetail = false;
        if(!this.applicantInfoList?.length){
          var dialogRef =this.dialog.open(ModalComponent,{ data: {
            message : "Reference number does not exists",
            title : "Alert!",
            buttonText : "Cancel"
          }});
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed',result);
            this.returnUrl = result;
            result ? this.router.navigate(['/home']): this.router.navigate(['/bio-metric-info',{appId:this.applicationList.Applicants[0].ApplicantID}]);
          });
        }
        else{
          //this.applicantInfoList=res;
          this.divEvisaDetail = true;
          console.log(this.applicantInfoList);
          //console.log("aa" +this.applicantInfoList[0].Applicants[0].FullName );
          this.dFormat = this.datePipe.transform(this.applicantInfoList[0].Applicants[0].DOB, 'dd/MM/yyyy');
          this.issueDate=this.datePipe.transform(this.applicantInfoList[0].Applicants[0].TravelDocuments[0].IssuingDate, 'dd/MM/yyyy')
          this.expiryDate=this.datePipe.transform(this.applicantInfoList[0].Applicants[0].TravelDocuments[0].ExpiryDate, 'dd/MM/yyyy')
        }
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
    this.divEvisaDetail = false;
    // this.localstream.getVideoTracks()[0].stop();

  }
  savePhoto(){
    this.divEvisaDetail = false;
    var blob=this.dataURItoBlob(this.picture);
    console.log(blob);
    //var base64 = this.picture.replace(/^data:image\/(png|jpg);base64,/, "");
    //alert(this.visaRefNo);
    //console.log("Image : "+ this.picture.replace(/^data:image\/(png|jpg);base64,/, ""));

  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  detectFace() {
    // before detecting the face we need to make sure that
    // 1. OpenCV is loaded
    // 2. The classifiers have been loaded
    this.ngOpenCVService.isReady$
      .pipe(
        filter((result: OpenCVLoadResult) => result.ready),
        switchMap(() => {
          return this.classifiersLoaded$;
        }),
        tap(() => {
          this.clearOutputCanvas();
          this.findFaceAndEyes();
        })
      )
      .subscribe(() => {
        console.log('Face detected');
      },
      error=>{
        alert('Face not deduct');
      });
  }

  clearOutputCanvas() {alert('clear');
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  findFaceAndEyes() {alert('face');
    // Example code from OpenCV.js to perform face and eyes detection
    // Slight adapted for Angular
    const src = cv.imread(this.canvas.nativeElement.id);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    const faces = new cv.RectVector();
    const eyes = new cv.RectVector();
    const faceCascade = new cv.CascadeClassifier();
    const eyeCascade = new cv.CascadeClassifier();
    // load pre-trained classifiers, they should be in memory now
    faceCascade.load('haarcascade_frontalface_default.xml');
    eyeCascade.load('haarcascade_eye.xml');
    // detect faces
    const msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
    for (let i = 0; i < faces.size(); ++i) {
      const roiGray = gray.roi(faces.get(i));
      const roiSrc = src.roi(faces.get(i));
      const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
      const point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
      cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
      // detect eyes in face ROI
      eyeCascade.detectMultiScale(roiGray, eyes);
      for (let j = 0; j < eyes.size(); ++j) {
        const point3 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
        const point4 = new cv.Point(eyes.get(j).x + eyes.get(j).width, eyes.get(j).y + eyes.get(j).height);
        cv.rectangle(roiSrc, point3, point4, [0, 0, 255, 255]);
      }
      roiGray.delete();
      roiSrc.delete();
    }
    cv.imshow(this.canvas.nativeElement.id, src);
    src.delete();
    gray.delete();
    faceCascade.delete();
    eyeCascade.delete();
    faces.delete();
    eyes.delete();
  }



}
