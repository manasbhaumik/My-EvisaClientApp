import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AuthenticationServiceService } from '../authentication-service.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef,MatDialogConfig ,MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';

// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class User{
  public email:string;
  public password:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user=new User();
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
    // private modalService: NgbModal    
    ) { 
      
    }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.authentictionService.userAuthentication(this.user.email,this.user.password)
      .subscribe((data:any)=>{
      //localStorage.setItem('accessToken',data.access_token);
      this.tokenStorage.saveToken(data.access_token);
      this.tokenStorage.saveUser(data.userName);
      console.log(data);
     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
     var dialogRef= this.dialog.open(ModalComponent,{ data: {
        message : "Hi, "+ data.userName +" , Welcome to MyE-Visa portal",
        title : "Success",
        buttonText : "Ok"
        }});  
        dialogRef.afterClosed().subscribe(
          result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          //this.ngOnInit();
          this.router.navigate(['/visa-application']);
        });      
    },
    error=>{
      this.error=error;
      console.log(error);
      //this.OpenModal(error);
      // this.dialog.open(ModalComponent,{ 
      //   width:'250%',
      //   data: error
      //   });
      var dialogRef =this.dialog.open(ModalComponent,{ data: {
        message : error.error.error_description,
        title : "Alert!",
        buttonText : "Cancel"
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          this.returnUrl = result;
          result ? this.router.navigate(['/agency-details']): this.router.navigate(['/home']);
        });    
    });
  }

  OpenModal(error){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data=error;
    this.dialog.open(ModalComponent,dialogConfig);
  }

 

}


