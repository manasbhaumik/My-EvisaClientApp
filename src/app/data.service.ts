import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders ,HttpErrorResponse,HttpRequest,HttpParams } from '@angular/common/http';

import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { retry, catchError,map } from 'rxjs/operators';
//import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  private API_TEST_SERVER1  = "http://192.168.0.10/ARB-Service";
  private API_TEST_SERVER2 = "https://localhost:44372";
  private TEST_API_SERVER  = "http://1.9.116.25/ARB-Service";



  constructor(private httpClient: HttpClient) { }
  public errorMessage: string = '';
  public AgencyID : 0;

  handleError(error: HttpErrorResponse) {
    console.log(error+"Err");
    let errorMessage = 'Unknown error!';
    if(error.status===401||error.status===403){
      errorMessage=error.message;
    }
    else if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public GetToken(){
    return this.httpClient.get(this.API_TEST_SERVER).pipe(catchError(this.handleError));
  }

  setData(data) {
    this.apiData.next(data)
  }


  public sendGetRequest(){
    return this.httpClient.get(this.API_TEST_SERVER).pipe(catchError(this.handleError));
  }

  public getAll1(API_TEST_SERVER: string): Observable<any> {
    return this.httpClient
      .get(API_TEST_SERVER+ '/api/Countries')
      .pipe(map(response => response));
  }

  public getAllCountries() {
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Countries').pipe(map(response => response));
  }

  public getCenterByCountryId(countryId){
    var params=new HttpParams();
    params=params.append('countryid',countryId);

    return this.httpClient.get(this.API_TEST_SERVER+ '/api/CentersByCountryId', {params: params}).pipe(map(response => response));
  }

  public getCenter() {
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Centers').pipe(map(response => response));
  }

  public getCountiesByCountryId(countryId){
   var params=new HttpParams();
   params.get(countryId);

    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Countries/'+countryId);
  }

  getAgentById(agentId){
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Agencies/'+agentId).pipe(map(response => response));;
  }

  getTotalAgents(){
    return this.httpClient.get<number>(this.API_TEST_SERVER+ '/api/TotalAgency').pipe(map(response => response));;
  }

  getAgentByRegisterNo(registerNo){
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/AgentByRegistrtionId/'+registerNo).pipe(map(response => response));;
  }

  agentRegister(agent){
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(this.API_TEST_SERVER + '/api/Agencies',
      {
        "RegistrationNo":agent.RegistrationNo,
        "AgencyType":agent.AgencyType,
        "AgencyName":agent.AgencyName,
        "ContactPerson":agent.ContactPerson,
        "ContacNo":agent.ContactNo,
        "Address":agent.Address,
        "Address1":agent.Address1,
        "Address2":agent.Address2,
        "CountryID":agent.Region,
        "State":agent.State,
        "City":agent.City,
        "Pincode":agent.Pincode,
        "Email":agent.Email,
        "Fax":agent.Fax,
        "ActiveStatus":"Y"
      } ,httpOptions)
      //.pipe(catchError(this.handleError));
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  updateAgent(agent,agencyId){
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.put(this.API_TEST_SERVER + '/api/Agencies/'+agencyId,
      {
        "AgencyID":agencyId,
        "RegistrationNo":agent.RegistrationNo,
        "AgencyType":agent.AgencyType,
        "AgencyName":agent.AgencyName,
        "ContactPerson":agent.ContactPerson,
        "ContacNo":agent.ContactNo,
        "Address":agent.Address,
        "Address1":agent.Address1,
        "Address2":agent.Address2,
        "CountryID":agent.Region,
        "State":agent.State,
        "City":agent.City,
        "Pincode":agent.Pincode,
        "Email":agent.Email,
        "Fax":agent.Fax,
        "ActiveStatus":"Y"
      } ,httpOptions)
      //.pipe(catchError(this.handleError));
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  GetAgency(){
    return this.httpClient
    .get(this.API_TEST_SERVER+ '/api/Agencies')
    .pipe(map(response => response));
  }

  saveAgencyContact(agentContact){
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(this.API_TEST_SERVER + '/api/Contacts',
      {
        "IDNumber":agentContact.idNo,
        "Name":agentContact.firstName,
        "ContactNo":agentContact.ContactNo,
        "AltContactNo":agentContact.AltContactNo,
        "Address":agentContact.Address,
        "City":agentContact.City,
        "State":agentContact.State,
        "CountryID":agentContact.Country,
        "Email":agentContact.Email,
        "WhatsappNo":"1",
        "Status":"Y",
        "AgencyID":agentContact.Agency,
        "CenterID":agentContact.centerId
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  updateContact(agentContact,contactId){
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.put(this.API_TEST_SERVER + '/api/Contacts/'+contactId,
      {
        "ContactID":contactId,
        "IDNumber":agentContact.idNo,
        "Name":agentContact.firstName,
        "ContactNo":agentContact.ContactNo,
        "AltContactNo":agentContact.AltContactNo,
        "Address":agentContact.Address,
        "City":agentContact.City,
        "State":agentContact.State,
        "CountryID":agentContact.Country,
        "Email":agentContact.Email,
        "WhatsappNo":"1",
        "Status":"Y",
        "AgencyID":agentContact.Agency,
        "CenterID":agentContact.centerId
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  getContact():Observable<any>{
   var accessToken=  localStorage.getItem('auth-token');
    console.log(accessToken);
    var httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}` )
    }
    // let header = new Headers({ 'Authorization': `Bearer ${token}` });
    // const options = new RequestOptions({
    //    headers: header,
    // });
    return this.httpClient
    .get(this.API_TEST_SERVER+ '/api/UserContactsProfile',httpOptions)
    .pipe(map(response => response));

  }

  getContactById(Id):Observable<any>{
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Contacts/'+Id);
    //.pipe(map(response => response));

  }

  saveAplication(application):Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.post(this.API_TEST_SERVER + '/api/Applications',
      {
        "ApplicationTypeID":application.ApplicationTypeID,
        "SubmissionType":application.submissionType,
        "CenterID":application.centerId,
        "ContactID":application.ContactID,
        "TotalApplicant":application.TotalApplicant,
        "PurposeOfVisit":application.PurposeOfVisit,
        "DurationOfVisit":application.DurationOfVisit,
        "VisaTypeID":"1",
        "SubmitedBy":application.SubmitedBy,
        "SubmissionDate":application.SubmisisionDate,
        "AcceptedBy":application.AcceptedBy,
        "Status":"Y"
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  updateAplication(application,applicationID):Observable<any>{
    console.log(application);
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.httpClient.put(this.API_TEST_SERVER + '/api/Applications/'+applicationID,
      {
        "ApplicationID":applicationID,
        "ApplicationTypeID":application.ApplicationTypeID,
        "SubmissionType":application.submissionType,
        "CenterID":application.centerId,
        "ContactID":application.ContactID,
        "TotalApplicant":application.TotalApplicant,
        "PurposeOfVisit":application.PurposeOfVisit,
        "DurationOfVisit":application.DurationOfVisit,
        "VisaTypeID":"1",
        "SubmitedBy":application.SubmitedBy,
        "SubmissionDate":application.SubmisisionDate,
        "AcceptedBy":application.AcceptedBy,
        "Status":"Y"
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  getApplications():Observable<any>{
     return this.httpClient
     .get(this.API_TEST_SERVER+ '/api/ApplicationsByUser')
     .pipe(
       map(response => response),
        catchError((error: HttpErrorResponse) => {
        return throwError(error);
        })
      );
 }

   getApplicationType():Observable<any>{
    return this.httpClient
    .get(this.API_TEST_SERVER+ '/api/ApplicationTypes')
    .pipe(map(response => response),
    catchError((error: HttpErrorResponse) => {
      return throwError(error);
      }));
  }

  getApplicationById(appId):Observable<any>{
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Applications/'+appId);
    //.pipe(map(response => response));

  }

  saveAplicant(applicant):Observable<any>{
    var dob1=applicant.DOB.year+"/"+applicant.DOB.month+"/"+applicant.DOB.day;
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.httpClient.post(this.API_TEST_SERVER + '/api/Applicants',
      {
        "ApplicationID":applicant.Application,
        "FullName":applicant.FullName,
        "FamlilyName":applicant.FamlilyName,
        "FirstName":applicant.FirstName,
        "NickName":applicant.NickName,
        "Gender":applicant.Gender,
        "IDNumber":applicant.IDNumber,
        "DOB":dob1,
        "Address1":applicant.Address1,
        "Address2":applicant.Address2,
        "Address3":applicant.Address3,
        "PostCode":applicant.PostCode,
        "City":applicant.City,
        "State":applicant.State,
        "ContactNo":applicant.ContactNo,
        "Email":applicant.Email,
        "Photo":""
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateAplicant(applicant,applicantId,applicationId):Observable<any>{
    var dob1=applicant.DOB.year+"/"+applicant.DOB.month+"/"+applicant.DOB.day;
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.httpClient.put(this.API_TEST_SERVER + '/api/Applicants/'+applicantId,
      {
        "ApplicantID":applicantId,
        "ApplicationID":applicationId,
        "FullName":applicant.FullName,
        "FamlilyName":applicant.FamlilyName,
        "FirstName":applicant.FirstName,
        "NickName":applicant.NickName,
        "Gender":applicant.Gender,
        "IDNumber":applicant.IDNumber,
        "DOB":dob1,
        "Address1":applicant.Address1,
        "Address2":applicant.Address2,
        "Address3":applicant.Address3,
        "PostCode":applicant.PostCode,
        "City":applicant.City,
        "State":applicant.State,
        "ContactNo":applicant.ContactNo,
        "Email":applicant.Email,
        "Photo":""
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  saveTravelDocument(travelDocument):Observable<any>{
    var issueDate=travelDocument.IssuingDate.year+"/"+travelDocument.IssuingDate.month+"/"+travelDocument.IssuingDate.day;
    var expiryDate=travelDocument.ExpiryDate.year+"/"+travelDocument.ExpiryDate.month+"/"+travelDocument.ExpiryDate.day;
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.httpClient.post(this.API_TEST_SERVER + '/api/TravelDocuments',
      {
        "ApplicantID":travelDocument.Applicant,
        "DocumentType":travelDocument.DocumentType,
        "PassportNo":travelDocument.PassportNo,
        "FatherName":travelDocument.fatherName,
        "MotherName":travelDocument.motherName,
        "IssuingCountry":travelDocument.IssuingCountry,
        "IssuingAuthority":travelDocument.IssuingAuthority,
        "IssuingDate":issueDate,
        "ExpiryDate":expiryDate
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  updateTravelDocument(travelDocument,DocumentId):Observable<any>{
    var issueDate=travelDocument.IssuingDate.year+"/"+travelDocument.IssuingDate.month+"/"+travelDocument.IssuingDate.day;
    var expiryDate=travelDocument.ExpiryDate.year+"/"+travelDocument.ExpiryDate.month+"/"+travelDocument.ExpiryDate.day;
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.httpClient.put(this.API_TEST_SERVER + '/api/TravelDocuments/'+DocumentId,
      {
        "DocumentID" : DocumentId,
        "ApplicantID":travelDocument.Applicant,
        "DocumentType":travelDocument.DocumentType,
        "PassportNo":travelDocument.PassportNo,
        "FatherName":travelDocument.fatherName,
        "MotherName":travelDocument.motherName,
        "IssuingCountry":travelDocument.IssuingCountry,
        "IssuingAuthority":travelDocument.IssuingAuthority,
        "IssuingDate":issueDate,
        "ExpiryDate":expiryDate
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  getTravelDocById(docId):Observable<any>{
    console.log("doc "+docId);
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/TravelDocuments/'+docId);
    //.pipe(map(response => response));

  }

  saveVisaApplication(visaApplication):Observable<any>{
     var issueDate=visaApplication.IssuingDate.day+"/"+visaApplication.IssuingDate.month+"/"+visaApplication.IssuingDate.year;
    // var expiryDate=travelDocument.ExpiryDate.day+"/"+travelDocument.ExpiryDate.month+"/"+travelDocument.ExpiryDate.year;
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.httpClient.post(this.API_TEST_SERVER + '/api/VisaApplications',
      {
        "ApplicantID":visaApplication.ApplicantID,
        "DurationOfVisit":visaApplication.DurationOfVisit,
        "PurposeOfVisit":visaApplication.PurposeOfVisit,
        "VisaTypeID":visaApplication.VisaTypeID,
        "ApprovalDate":issueDate,
        "ApprovalStatus":"P"
      } ,httpOptions)
      .pipe(
        map(res => res),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }));

  }

  getApplicationsById(applicationId:number):Observable<any>{
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/Applications/'+applicationId).pipe(map(response => response));
  }

  getBioMetricInfoByVisaNo(visaNo:string):Observable<any>{
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/VisaApplications/'+visaNo).pipe(map(response => response));
  }

  forgotPassword(forgotPassword):Observable<any>{
   var httpOptions = {
     headers: new HttpHeaders({'Content-Type': 'application/json'})
   }

   return this.httpClient.post(this.API_TEST_SERVER + '/api/Account/ForgetPassword',
     {
       "NricNo":forgotPassword.Email,
       "Newpassword":forgotPassword.NewPassword
     } )
     .pipe(
       map(res => res),
       catchError((error: HttpErrorResponse) => {
         return throwError(error);
       }));

 }

  getApplicantsById(applicantId:number):Observable<any>{
   return this.httpClient.get(this.API_TEST_SERVER+ '/api/Applicants/'+applicantId).pipe(map(response => response));
  }

  getTravelDocumentByApplicantId(applicantId):Observable<any>{
    var params=new HttpParams();
    params=params.append('applicantid',applicantId);
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/TravelDocumentByApplicantID', {params: params}).pipe(map(response => response),catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));

  }

  getApplicantStatusByVisaRefNo(visaRefNo ):Observable<any>{
    var params=new HttpParams();
    params=params.append('visaRefNo',visaRefNo);
    return this.httpClient.get(this.API_TEST_SERVER+ '/api/ApplicantByVisaRefNo', {params: params}).pipe(map(response => response),catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
}
