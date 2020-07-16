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
  styleUrls: ['./bio-metric-info.component.css']
})
export class BioMetricInfoComponent implements OnInit {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoWidth = 0;
  videoHeight = 0;
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


  constructor(
    private renderer: Renderer2
  ) { }

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

  save(){

    console.log("Image : "+ this.picture.replace(/^data:image\/(png|jpg);base64,/, ""));

  }

}
