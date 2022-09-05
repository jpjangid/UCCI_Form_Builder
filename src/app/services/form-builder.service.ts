import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private http:HttpClient) { }
  baseURL: string = 'http://ucci.brandtalks.in/api/';

  token: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdWNjaS5icmFuZHRhbGtzLmluL2FwaS9sb2dpbiIsImlhdCI6MTY2MTg1NzcxMCwiZXhwIjoxNjYxODYxMzEwLCJuYmYiOjE2NjE4NTc3MTAsImp0aSI6IjZUU25HaVBYQkVHV01TcVEiLCJzdWIiOiI0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.exE9kTOmGeoCP4itkrkYWh7pXQ1O0UijqZFfmrXgw2U';

  headers: any = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });
  requestOptions = { headers: this.headers };

  //to get all custom forms 
  getCustomFormsList() : Observable<any> {
    return this.http.get(this.baseURL+'form',this.requestOptions);
  }
  //to delete custom form from from list
  deleteCustomForm(id:any) : Observable<any> {
    return this.http.delete(this.baseURL+'form/'+id,this.requestOptions);
  }
  //to create custom form
  createCustomForm(formData:any): Observable<any> {
    return this.http.post(this.baseURL+'form',formData,this.requestOptions)
  }
  //to edit custom form
  editCustomForm(id?:any): Observable<any> {
    return this.http.put(this.baseURL+'form/'+id,this.requestOptions)
  }
  //to get form by slug
  getCustomFormBySlug(slug?:any) :Observable<any> {
    return this.http.get(this.baseURL+'form/'+slug,this.requestOptions)
  }
}
