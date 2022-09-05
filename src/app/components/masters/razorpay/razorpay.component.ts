import { Component, HostListener, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service.service';
declare var Razorpay: any;
@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss']
})
export class RazorpayComponent implements OnInit {

  form: any = {}; 
    paymentId: string;
    error: string;
   
    constructor(private orderService: OrderServiceService) {
 
    }
    
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
 
    options = {
    "key": "rzp_test_5R3ifzCtFSn1j1",
    "amount": "500", 
    "name": "Java Chinna",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id":"order_KC9n1XeYITXw7B",
    "handler": function (response){
        var event = new CustomEvent("payment.success", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        var event = new CustomEvent("onClick", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "test",
    "email": "test@gmail.com",
    "contact": "8890303023"
    },
    "notes": {
    "address": "webanix solutions"
    },
    "theme": {
    "color": "#3399cc"
    }
    };
 
    onSubmit(): void {
        this.paymentId = ''; 
        this.error = ''; 
        // this.orderService.createOrder(this.form).subscribe(
        // data => {
            // this.options.key = data.secretKey;
            // this.options.order_id = data.razorpayOrderId;
            // this.options.amount = data.applicationFee; //paise
            // this.options.prefill.name = this.form.name;
            // this.options.prefill.email = this.form.email;
            // this.options.prefill.contact = this.form.phone;
            var rzp1 = new Razorpay(this.options);
            rzp1.open();
                       
            rzp1.on('payment.failed', function (response){    
                // Todo - store this information in the server
                console.log(response.error.code);    
                console.log(response.error.description);    
                console.log(response.error.source);    
                console.log(response.error.step);    
                console.log(response.error.reason);    
                console.log(response.error.metadata.order_id);    
                console.log(response.error.metadata.payment_id);
                this.error = response.error.reason;
            }
            );
        // }
        // ,
        // err => {
        //     this.error = err.error.message;
        // }
        // );
    }
 
    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event): void {
      console.log(event)
    }
    @HostListener('window:onClick', ['$event']) 
    onClick(event): void {
      console.log(event)
    }
  

}
