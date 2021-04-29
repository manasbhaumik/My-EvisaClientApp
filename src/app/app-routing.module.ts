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
import { VisaApplicationCheckComponent } from './Visa/visa-application-check/visa-application-check.component';
import { NotificationComponent } from './Visa/notification/notification.component';
import { PaymentInfoComponent } from './Visa/payment-info/payment-info.component';
import { CreditCardInfoComponent } from './Visa/credit-card-info/credit-card-info.component';
import { PaymentSuccessComponent } from './Visa/payment-success/payment-success.component';
import { HomenewComponent } from './homenew/homenew.component';
import {LoginComponent} from './login/login.component';
import { RegisterIndividualApplicantComponent } from './Visa/register-individual-applicant/register-individual-applicant.component';
import { IndividualApplicationComponent } from './Individual/individual-application/individual-application.component';
import { RegistrationComponent } from './User/registration/registration.component';
import { ApplicantSummaryInfoComponent } from './Visa/applicant-summary-info/applicant-summary-info.component';
import { GroupApplicantInformationComponent } from './Visa/group-applicant-information/group-applicant-information.component';
import { GroupRegistrationComponent } from './Visa/group-registration/group-registration.component';
import { GroupVisaFormComponent } from './Visa/group-visa-form/group-visa-form.component';
import { PaymentSummaryInfoComponent } from './Visa/payment-summary-info/payment-summary-info.component';
import { ViewReceiptComponent } from './Visa/view-receipt/view-receipt.component';


const approutes: Routes = [   
  // { path: '',   redirectTo: '/home', pathMatch: 'full' }
  { path: '', redirectTo: 'homenew',  pathMatch: 'full' },
  { path: 'homenew',component:HomenewComponent},
 // { path: '',   component: HomenewComponent, pathMatch: 'full' },
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
  { path: 'visa-application-check',component:VisaApplicationCheckComponent},
  { path: 'notification',component:NotificationComponent},
  { path: 'payment-info',component:PaymentInfoComponent},
  { path: 'credit-card-info',component:CreditCardInfoComponent},
  { path: 'payment-success',component:PaymentSuccessComponent}, 
  { path: 'login',component:LoginComponent},
  { path: 'register-individual',component:RegisterIndividualApplicantComponent},
  { path: 'individual-application',component:IndividualApplicationComponent},
  { path: 'registration',component:RegistrationComponent},
  { path: 'applicant-summary-info',component:ApplicantSummaryInfoComponent},
  { path: 'group-applicant-information',component:GroupApplicantInformationComponent},
  { path: 'group-registration',component:GroupRegistrationComponent},
  { path: 'group-visa-form',component:GroupVisaFormComponent},
  { path: 'payment-summary-info',component:PaymentSummaryInfoComponent},
  { path: 'view-receipt',component:ViewReceiptComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
