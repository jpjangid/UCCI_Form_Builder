import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
    heading:string='Form Title'
    jsonData : any={controls:[{id: "email",label: "Email",name: "email",placeholder: "Enter Email",required: true,type: "email",validators:{required: true},value:""},{id: "password",label: "Password",name: "password",placeholder: "Enter password",required: true,type: "password",validators:{required: true},value:""}]}
}