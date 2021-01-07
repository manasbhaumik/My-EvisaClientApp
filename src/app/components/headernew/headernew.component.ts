import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from  '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-headernew',
  templateUrl: './headernew.component.html',
  styleUrls: ['./headernew.component.css']
})
export class HeadernewComponent implements OnInit {
  userName:string;
  countryID : number;
  contactID : number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.userName=this.tokenStorage.getUser();
    this.dataService.getContact().subscribe((data:any)=>{
      this.countryID=data.CountryID;
      this.contactID=data.ContactID;      
    }); 
  }

  logOut(){
    this.tokenStorage.signOut();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
