import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipTypeMasterService {

  constructor(private http: HttpClient) { }

  baseURL: string = 'https://ucci.brandtalks.in/api/';

  token: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3VjY2kuYnJhbmR0YWxrcy5pbi9hcGkvbG9naW4iLCJpYXQiOjE2NjE0MTI2MDcsImV4cCI6MTY2MTQ5OTAwNywibmJmIjoxNjYxNDEyNjA3LCJqdGkiOiJoV3hFeDcwMUN0cldXUWZ0Iiwic3ViIjoiMTciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.3crVV2cvvaAtv3XBxrqCvseMFDo9MOFGSMrID684NKI';

  headers: any = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  requestOptions = { headers: this.headers };

  /************** Insert Member Categories Method ***********/

  insertMembershipTypeMaster(mbershipType: any): Observable<any> {
    const body = JSON.stringify(mbershipType);
    console.log("body : ", body);
    
    return this.http.post<any>(
      this.baseURL + 'membership-type',
      body,
      this.requestOptions
    );
  }

  /************** Get Member Categories Method ***********/

  getMembershipTypeMaster(): Observable<any> {
    return this.http.get<any>(
      this.baseURL + 'membership-type',
      this.requestOptions
    );
  }
  /************** Edit Member Categories Method ***********/

  editMembershipTypeMaster(
    mbershipType: any,
    id: number
  ): Observable<any> {
    const body = JSON.stringify(mbershipType);

    return this.http.put<any>(
      this.baseURL + 'membership-type/' + id,
      body,
      this.requestOptions
    );
  }

  /************** Delete Member Categories Method ***********/

  deleteMembershipTypeMaster(id: number): Observable<any> {
    return this.http.delete<any>(
      this.baseURL + 'membership-type/' + id,
      this.requestOptions
    );
  }

}
