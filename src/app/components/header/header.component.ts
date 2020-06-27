import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
 // templateUrl: './header.component.html',
  template:`
 <!-- Main Content -->
 <div id="content">
     <nav class="navbar navbar-expand navbar-light bg-white static-top shadow">
         <img class="bd-placeholder-img" style="margin-left:30px;" src="assets/img/Logo.png" width="50" height="50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140" />
         <!-- <a class="navbar-brand" style="margin-left:30px;" href="#">{{title}}</a>-->
         <span class="navbar-brand"  style="margin-left:30px;">{{title}}</span>
         <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse ml-auto" id="navbarNav">
             <ul class="navbar-nav ml-auto">
                   <li class="nav-item active">
                       <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                   </li>
                   <li class="nav-item">
                        <a class="nav-link" routerLink="/Contact">Contacts</a>
                   </li>
                   <li class="nav-item">
                       <a class="nav-link" routerLink="/Information">Information</a>
                   </li>
                   <li class="nav-item">
                       <a class="nav-link" routerLink="/Faq">F.A.Q</a>
                   </li>
             </ul>
             <span>
                 Language : EN | CN
             </span>
         </div>
     </nav>   
 </div> 
 <!-- End of Main Content -->    
 
    `,
   styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title="MyE-Visa";
  constructor() { }

  ngOnInit(): void {
  }

}
