import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { MemberCategoriesMasterService } from '../../../services/member-categories.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';

@Component({
  selector: 'app-member-categories',
  templateUrl: './member-categories.component.html',
  styleUrls: ['./member-categories.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MemberCategoriesComponent implements OnInit {
  constructor(
    private MemberCategoriesMasterService: MemberCategoriesMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ) {}

  @ViewChild('focus') edit: ElementRef;

  breadcrumb: any[] = [
    {
      title: 'Member Categories',
      subTitle: 'Masters',
    },
  ];

  mode: string = 'insert';

  editMemberCategory: any;

  focusState: boolean = false;

  position: string;

  postMemberCategoriesForm = this.fb.group({
    name: ['', Validators.required],
  });

  memberCategoryName: any;

  name: string = '';

  member: any[];

  loading: boolean = true;

  btnText: string = 'Add';

  validText: boolean = true;

  ngOnInit(): void {
    this.getMemberCategories();
  }
  /********************************************************************
                Add Member Categories Master
********************************************************************/

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.memberCategoryName = this.postMemberCategoriesForm.value.name;

    /---------- Insert Method ---------/;
    if (this.postMemberCategoriesForm.invalid) {
      this.validText = false;
      this.edit.nativeElement.focus();
    } else if (this.postMemberCategoriesForm.valid) {
      this.validText = true;
      if (this.mode == 'insert') {
        this.MemberCategoriesMasterService.insertMemberCategoriesMaster(
          this.postMemberCategoriesForm.value
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
    if (this.postMemberCategoriesForm.invalid) {
      this.validText = false;
      this.edit.nativeElement.focus();
    } else if (this.postMemberCategoriesForm.valid) {
      this.validText = true;
      if (this.mode == 'edit') {
        this.MemberCategoriesMasterService.editMemberCategoriesMaser(
          this.postMemberCategoriesForm.value,
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
    console.log('data', this.postMemberCategoriesForm.invalid);
  }

  /********************************************************************
                Get Member Categories Master
********************************************************************/

  getMemberCategories() {
    this.MemberCategoriesMasterService.getMemberCategoriesMaster().subscribe(
      (res) => {
        this.member = res.data;
        this.loading = false;
        this.postMemberCategoriesForm.reset();
      }
    );
  }

  /********************************************************************
                  Edit Member Categories Master
  ********************************************************************/

  editMemberCategoryMaster(event) {
    this.mode = 'edit';
    this.editMemberCategory = event;
    this.name = event.name;
    this.edit.nativeElement.focus();
    this.btnText = 'Save';
  }

  /********************************************************************
                Delet Member Categories Master
********************************************************************/

  deleteMaster(event) {
    console.log("fewcds");
    
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.MemberCategoriesMasterService.deleteMemberCategoriesMaser(
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
    if (this.postMemberCategoriesForm.invalid) {
      this.validText = false;
    } else if (this.postMemberCategoriesForm.valid) {
      this.validText = true;
    }
  }
}
