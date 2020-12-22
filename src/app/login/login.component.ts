import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AuthenticationServiceService } from '../authentication-service.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';

export class User{
  public email:string;
  public password:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user=new User();
  fieldTextType: boolean;
  returnUrl: string;
  error = '';
  closeResult: string;

  constructor(
    private http: HttpClient,
    private dataService:DataService,
    private route: ActivatedRoute,
    private router: Router,
    private authentictionService:AuthenticationServiceService,
    private  dialog:  MatDialog,
    private authService: AuthService, private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login(){
    this.authentictionService.userAuthentication(this.user.email,this.user.password)
      .subscribe((data:any)=>{
      //localStorage.setItem('accessToken',data.access_token);
      this.tokenStorage.saveToken(data.access_token);
      this.tokenStorage.saveUser(data.userName);
     var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Hi, "+ data.userName +" , Welcome to MyE-Visa portal",
        title : "Success",
        buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          this.returnUrl = result;
          //this.ngOnInit();
          this.router.navigate(['/visa-application']);
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/register-individual']);
          // }); 
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/individual-application']);
          // });
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate(['/register-individual']);
        });      
    },
    error=>{
      this.error=error;
      var dialogRef =this.dialog.open(ModalComponent,{ data: {
        message : error.error.error_description,
        title : "Alert!",
        buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          this.returnUrl = result;
          result ? this.router.navigate(['/agency-details']): this.router.navigate(['/login']);
        });    
    });
  }

}
