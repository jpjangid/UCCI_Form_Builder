import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilderService } from 'src/app/services/form-builder.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  providers: [MessageService]
})
export class FormBuilderComponent implements OnInit {
  constructor(private activeRoute:ActivatedRoute,private messageService: MessageService,private __formBuilder:FormBuilderService,private route:Router) { }
  buttonFields:any = {controls:[]};
  formModel:any = {};
  breadcrumb: any[] = [
    {
      title: 'Form Builder',
      subTitle: 'Masters',
    },
  ];
  slug:any;
  formId:any;
  ngOnInit(): void {
    this.slug = this.activeRoute.snapshot;
    console.log(this.slug)
    if(this.slug.params.slug) {
      this.__formBuilder.getCustomFormBySlug(this.slug.params.slug).subscribe(
        (res: any) => {
          console.log(JSON.parse(res.data.form_fields));
          this.formId=res.data.id;
          this.buttonFields= JSON.parse(res.data.form_fields);
          this.formModel.form_name=res.data.name
          console.log(this.buttonFields)
        },
        (error: HttpErrorResponse) => {
          this.route.navigateByUrl('custom-form')          
        }) 
    }
  }
  jsonData : any;
  getJson(event:any) {
    console.log(event);    
    if(this.formModel.form_name) {
      this.jsonData = JSON.parse(event);
      this.formModel.data = this.jsonData;
      console.log(this.formModel);
      if(this.slug) {
        this.__formBuilder.editCustomForm(this.formId).subscribe((res:any)=> {
          this.route.navigateByUrl('/custom-form')
        },
        (error:HttpErrorResponse)=> {
          console.log(error);
        })
      }
      else {
        this.__formBuilder.createCustomForm(JSON.stringify(this.formModel)).subscribe((res:any)=> {
          this.route.navigateByUrl('/custom-form')
        },
        (error:HttpErrorResponse)=> {
          console.log(error);
        })
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'OOPS', detail: 'Please enter form title to proceed !' });
      window.scroll(0,0)
    }
  }
  onReject() {
    this.messageService.clear('c');
  }

}
