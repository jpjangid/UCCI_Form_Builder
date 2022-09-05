import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilderService } from 'src/app/services/form-builder.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CustomFormComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private route: Router, private messageService: MessageService, private __formBuilder: FormBuilderService) { }
  breadcrumb: any[] = [
    {
      title: 'Custom Forms',
      subTitle: 'Masters',
    },
  ];
  loading: boolean = true;
  forms: any = []
  ngOnInit(): void {
    this.getAllFormsList();
  }
  //to delete form from form list
  deleteFormDetail(id: any) {
    console.log(id)
    this.confirmationService.confirm({
      message: 'Do you want to delete this form?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        this.__formBuilder.deleteCustomForm(id).subscribe(
          (res: any) => {
            console.log(res);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.forms = [];
            res.data?.map((response: any) => {
              this.forms.push(response);
            })
            this.loading = false;
          },
          (error: HttpErrorResponse) => {
            console.log(error)
          })
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
  //to edit custom form
  editFormDetai(form: any) {
    this.route.navigateByUrl('/form-builder/' + form.slug);
  }
  navigateToFormBuilder() {
    this.route.navigateByUrl('/form-builder');
  }

  // showError() {
  //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  // }
  onReject() {
    this.messageService.clear('c');
  }
  //to get all custom forms
  getAllFormsList() {
    this.forms = []
    this.__formBuilder.getCustomFormsList().subscribe(
      (res: any) => {
        console.log(res);
        res.data?.map((response: any) => {
          this.forms.push(response);
        })
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      })
  }

}
