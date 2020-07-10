import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { VisaApplicationComponent } from './visa-application/visa-application.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AgencyDetailsComponent } from './Agency/agency-details/agency-details.component';
//import { MenuComponent } from './Agency/menu/menu.component';
import { AgencyContactDetailComponent } from './Agency/agency-contact-detail/agency-contact-detail.component';
import { AgencyMenuComponent } from './Agency/agency-menu/agency-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { MemberComponent } from './User/member/member.component';
import { MemberListComponent } from './User/member-list/member-list.component';
import { AgencyListComponent } from './Agency/agency-list/agency-list.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './_helpers/auth.interceptor';
// import { NgbDateCustomParserFormatter } from './_helpers/dateformat';
import { ApplicantInformationComponent } from './Visa/applicant-information/applicant-information.component';
import { VisaApplicationComponent } from './Visa/visa-application/visa-application.component';
import { TravelDocumentComponent } from './Visa/travel-document/travel-document.component';
import { SubmitApplicationComponent } from './Visa/submit-application/submit-application.component';
import { BioMetricInfoComponent } from './Visa/bio-metric-info/bio-metric-info.component';
import { ChartsModule } from 'ng2-charts';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { VisaApplicationCheckComponent } from './Visa/visa-application-check/visa-application-check.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    AgencyDetailsComponent,
    //MenuComponent,
    AgencyContactDetailComponent,
    AgencyMenuComponent,
    ModalComponent,
    MemberComponent,
    MemberListComponent,
    AgencyListComponent,    
    VisaApplicationComponent,
    ApplicantInformationComponent,
    TravelDocumentComponent,
    SubmitApplicationComponent,
    BioMetricInfoComponent,
    ForgotPasswordComponent,
    VisaApplicationCheckComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    //MatDatepickerModule,
    NgbModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
