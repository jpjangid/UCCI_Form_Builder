import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import { TurnoverMasterService } from 'src/app/services/turnover-master.service';

@Component({
  selector: 'app-turnover-master',
  templateUrl: './turnover-master.component.html',
  styleUrls: ['./turnover-master.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class TurnoverMasterComponent implements OnInit {

  constructor(
    private TurnoverMasterService: TurnoverMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ) { }

  @ViewChild('focus') edit: ElementRef;

  breadcrumb: any[] = [
    {
      title: 'Turnover Master',
      subTitle: 'Masters',
    },
  ];

  mode: string = 'insert';

  editMemberCategory: any;

  focusState: boolean = false;

  position: string;

  postTurnoverForm = this.fb.group({
    component: ['', Validators.required],
  });

  memberCategoryName: any;

  name: string = '';

  member: any[];

  loading: boolean = true;

  btnText: string = 'Add';

  validText: boolean = true;

  important: string = ' !important';


  ngOnInit(): void {
    this.getMemberCategories();
    if(this.postTurnoverForm.value.component == ""){
      
      console.log("form values is blank ");
    }else  if(this.postTurnoverForm.value.component != ""){
      
      console.log("form values is full  ");
    }
    
  }
  /********************************************************************
                Add Member Categories Master
********************************************************************/

  onSubmit() {

    /---------- Insert Method ---------/

    if (this.postTurnoverForm.invalid) {
      this.validText = false;
      this.edit.nativeElement.focus();
    } else if (this.postTurnoverForm.valid) {
      this.validText = true;
      if (this.mode == 'insert') {
        this.TurnoverMasterService.insertTurnoverMaster(
          this.postTurnoverForm.value
        ).subscribe((data) => {
          this.getMemberCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Member category added successfully',
          });
        });
      }
    }
    /---------- Edit Method ---------/;
    if (this.postTurnoverForm.invalid) {
      this.validText = false;
      this.edit.nativeElement.focus();
    } else if (this.postTurnoverForm.valid) {
      this.validText = true;
      if (this.mode == 'edit') {
        this.TurnoverMasterService.editTurnoverMaster(
          this.postTurnoverForm.value,
          this.editMemberCategory.id
        ).subscribe((data) => {
          this.getMemberCategories();
          this.btnText = 'Add';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Member category changed successfully',
          });
        });
      }
    }
  }

  getValue() {
    console.log('data', this.postTurnoverForm.invalid);
  }

  /********************************************************************
                Get Member Categories Master
********************************************************************/

  getMemberCategories() {
    this.TurnoverMasterService.getTurnoverMaster().subscribe(
      (res) => {
        this.member = res.data;
        console.log("res", res);
        
        this.loading = false;
        this.postTurnoverForm.reset();
      }
    );
  }

  /********************************************************************
                  Edit Member Categories Master
  ********************************************************************/

  editMemberCategoryMaster(event) {
    this.mode = 'edit';
    this.editMemberCategory = event;
    this.name = event.component;
    this.edit.nativeElement.focus();
    this.btnText = 'Save';
  }

  /********************************************************************
                Delet Member Categories Master
********************************************************************/

  deleteMaster(event) {
    
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.TurnoverMasterService.deleteTurnoverMaster(
          event.id
        ).subscribe((data) => {
          this.getMemberCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Member category deleted successfully',
          });
        });
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
    
  }

  onSetValidState() {
    if (this.postTurnoverForm.invalid) {
      this.validText = false;
    } else if (this.postTurnoverForm.valid) {
      this.validText = true;
    }
  }
}
