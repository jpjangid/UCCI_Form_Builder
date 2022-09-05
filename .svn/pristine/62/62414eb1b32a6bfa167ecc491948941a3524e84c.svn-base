import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacilityBookingService {

  constructor(private http: HttpClient) { }
  
  baseURL: string = 'https://ucci.brandtalks.in/api/';

  token: string =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3VjY2kuYnJhbmR0YWxrcy5pbi9hcGkvbG9naW4iLCJpYXQiOjE2NjE0MTI2MDcsImV4cCI6MTY2MTQ5OTAwNywibmJmIjoxNjYxNDEyNjA3LCJqdGkiOiJoV3hFeDcwMUN0cldXUWZ0Iiwic3ViIjoiMTciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.3crVV2cvvaAtv3XBxrqCvseMFDo9MOFGSMrID684NKI'

  headers: any = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  requestOptions = { headers: this.headers };

  insertFacilityData(data: any): Observable<any> {
    const body = JSON.stringify(data)

    return this.http.post<any>(
      this.baseURL + 'bookFacility',
      body,
      this.requestOptions
    )
  }

  getDataFromJson(): Observable<any>{
    return this.http.get<any>(
      '/assets/facility-booking.json',
      // this.requestOptions
    );
  }
}
