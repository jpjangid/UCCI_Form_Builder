import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;
 
@Injectable({
providedIn: 'root'
})
export class OrderServiceService {
 
    constructor(private http: HttpClient) {
 
    }
   
    createOrder(order:any): Observable<any> {
        return order;
    }
   
    updateOrder(order:any): Observable<any> {
        return order;
    }
}