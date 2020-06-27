import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { VisaApplicationComponent } from './visa-application/visa-application.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AgencyMenuComponent } from './Agency/agency-menu/agency-menu.component';
//import { MenuComponent } from './Agency/menu/menu.component';
import { AgencyDetailsComponent } from './Agency/agency-details/agency-details.component';
import { AgencyContactDetailComponent } from './Agency/agency-contact-detail/agency-contact-detail.component';
import { AgencyListComponent } from './Agency/agency-list/agency-list.component';
import { MemberListComponent } from './User/member-list/member-list.component';
import { VisaApplicationComponent } from './Visa/visa-application/visa-application.component';
import { ApplicantInformationComponent } from './Visa/applicant-information/applicant-information.component';
import { TravelDocumentComponent } from './Visa/travel-document/travel-document.component';
import {SubmitApplicationComponent} from './Visa/submit-application/submit-application.component';
import {BioMetricInfoComponent} from './Visa/bio-metric-info/bio-metric-info.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';


const approutes: Routes = [   
  // { path: '',   redirectTo: '/home', pathMatch: 'full' }
  { path: '',   component: HomeComponent, pathMatch: 'full' },
  { path: 'home',   component: HomeComponent },
  { path: 'visa-application', component: VisaApplicationComponent },
  { path: 'agency-menu', component: AgencyMenuComponent },
  //{ path: 'menu', component: MenuComponent },
  { path: 'agency-details', component: AgencyDetailsComponent },
  { path: 'agency-contact-detail', component: AgencyContactDetailComponent },
  { path: 'agency-list', component: AgencyListComponent },
  { path: 'member-list',component:MemberListComponent},
  { path: 'applicant-information',component:ApplicantInformationComponent},
  { path: 'travel-document',component:TravelDocumentComponent},
  { path: 'submit-application',component:SubmitApplicationComponent},
  { path: 'bio-metric-info',component:BioMetricInfoComponent},
  { path: 'forgot-password',component:ForgotPasswordComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
