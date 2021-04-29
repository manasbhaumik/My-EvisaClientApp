import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
//import { MatDatepickerModule} from '@angular/material/datepicker';
import { NgOpenCVModule } from 'ng-open-cv';
import { OpenCVOptions } from 'ng-open-cv/public_api.d';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule} from 'angular-datatables';
import { NgxSpinnerModule } from "ngx-spinner"; 

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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { NotificationComponent } from './Visa/notification/notification.component';
import { PaymentInfoComponent } from './Visa/payment-info/payment-info.component';
import { CreditCardInfoComponent } from './Visa/credit-card-info/credit-card-info.component';
import { PaymentSuccessComponent } from './Visa/payment-success/payment-success.component';
import { HeadernewComponent } from './components/headernew/headernew.component';
import { HomenewComponent } from './homenew/homenew.component';
import { LoginComponent } from './login/login.component';
import { RegisterIndividualApplicantComponent } from './Visa/register-individual-applicant/register-individual-applicant.component';
import { IndividualApplicationComponent } from './Individual/individual-application/individual-application.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RegistrationComponent } from './User/registration/registration.component';
import { ApplicantSummaryInfoComponent } from './Visa/applicant-summary-info/applicant-summary-info.component';
import { GroupApplicantInformationComponent } from './Visa/group-applicant-information/group-applicant-information.component';
import { GroupRegistrationComponent } from './Visa/group-registration/group-registration.component';
import { GroupVisaFormComponent } from './Visa/group-visa-form/group-visa-form.component';
import { PaymentSummaryInfoComponent } from './Visa/payment-summary-info/payment-summary-info.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewReceiptComponent } from './Visa/view-receipt/view-receipt.component';

const openCVConfig: OpenCVOptions = {
  scriptUrl: `assets/opencv/wasm/3.4/opencv.js`,
  wasmBinaryFile: 'opencv_js.wasm',
  usingWasm: true
};

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
    VisaApplicationCheckComponent,
    NotificationComponent,
    PaymentInfoComponent,
    CreditCardInfoComponent,
    PaymentSuccessComponent,
    HeadernewComponent,
    HomenewComponent,
    LoginComponent,
    RegisterIndividualApplicantComponent,
    IndividualApplicationComponent,
    RegistrationComponent,
    ApplicantSummaryInfoComponent,
    GroupApplicantInformationComponent,
    GroupRegistrationComponent,
    GroupVisaFormComponent,
    PaymentSummaryInfoComponent,
    SpinnerComponent,
    ViewReceiptComponent
  ],
  imports: [
    BrowserModule,
    NgOpenCVModule.forRoot(openCVConfig),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    //MatDatepickerModule,
    NgbModule,
    ChartsModule,
    NgSelectModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxSpinnerModule
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
