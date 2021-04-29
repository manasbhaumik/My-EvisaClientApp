import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from 'src/app/modal/modal.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  title="Forgot Password";
  isSubmitted=false;  
  returnUrl: string;
  error : string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService:DataService,
    //private datePipe: DatePipe,
    private  dialog:  MatDialog,
    private activeRouter:ActivatedRoute
  ) { }

  get f() { return this.forgotPasswordForm.controls; }

  ngOnInit(): void {
  }

  forgotPasswordForm = this.fb.group({
    Email :['',[Validators.required,Validators.email]],
    NewPassword : ['']
  });

  Save(){
    this.isSubmitted = true;
    if(this.forgotPasswordForm.invalid){
      return;
    }

    this.dataService.forgotPassword(this.forgotPasswordForm.getRawValue())
    .subscribe((data:any)=>{
      //console.log(data);
      var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : data,//"Contact agent registered Successfully",
        title : "Success",
        buttonText : "Ok"
      }});  
      // dialogRef.afterClosed().subscribe(
      //   result => {
      //    console.log('The dialog was closed',result);
      //    this.returnUrl = result;
      //    //this.ngOnInit();
      //     this.router.navigate(['/']);
      //   }
      // ); 
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
          result ? this.router.navigate(['/home']): this.router.navigate(['/forgot-password']);
        });

    }

    );
  }

}
