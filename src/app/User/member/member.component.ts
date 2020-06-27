import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  userName:string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.userName=this.tokenStorage.getUser();
  }

  logOut(){
    this.tokenStorage.signOut();
    this.router.navigate(['/home']);
  }

}
