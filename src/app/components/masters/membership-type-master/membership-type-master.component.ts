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
import { MembershipTypeMasterService } from 'src/app/services/membership-type-master.service';

@Component({
  selector: 'app-membership-type-master',
  templateUrl: './membership-type-master.component.html',
  styleUrls: ['./membership-type-master.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MembershipTypeMasterComponent implements OnInit {

  
  constructor(
    private MembershipTypeMasterService: MembershipTypeMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ) { }

  @ViewChild('focus') edit: ElementRef;

  breadcrumb: any[] = [
    {
      title: 'Membership Type Master',
      subTitle: 'Masters',
    },
  ];

  mode: string = 'insert';

  editMembershipType: any;

  focusState: boolean = false;

  position: string;

  postMembershipTypeForm = this.fb.group({
    membership_name: ['', Validators.required],
    type_of_fee: [ '', Validators.required],
    particulars: [ '', Validators.required],
    membership_fee: [ '', Validators.required],
    tax_percentage: [ '', Validators.required],
  });

  memberCategoryName: any;

  membershipName: string;

  typeOfFee: string;

  particulars: string;

  membershipFee: number;
  
  tax: number;

  feesData: any[];

  loading: boolean = true;

  btnText: string = 'Add';

  validFeesName: boolean = true;

  validFeesCategory: boolean = true;

  validMemberFees: boolean = true;
  
  validNonMemberFees: boolean = true;
  
  validTax: boolean = true;

  important: string = ' !important';

  ngOnInit(): void {
    this.getMemberCategories();
  }
  /********************************************************************
                Add Member Categories Master
********************************************************************/

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // this.memberCategoryName = this.postMemberClassificationForm.value.name;

    /---------- Insert Method ---------/;
      if (this.mode == 'insert') {
        if (this.postMembershipTypeForm.invalid) {
          this.validFeesName = false;
          this.validFeesCategory = false;
          this.validMemberFees = false;
          this.validNonMemberFees = false;
          this.validTax = false;
          this.edit.nativeElement.focus();
        } else if (this.postMembershipTypeForm.valid) {
          this.validFeesName = true;
          this.validFeesCategory = true;
          this.validMemberFees = true;
          this.validNonMemberFees = true;
          this.validTax = true;true

        // console.log("data : ", this.postMemberClassificationForm.value);
        this.MembershipTypeMasterService.insertMembershipTypeMaster(
          this.postMembershipTypeForm.value
        ).subscribe((data) => {
          console.log("data : ", data);
          
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
      if (this.mode == 'edit') {
        if (this.postMembershipTypeForm.invalid) {
          this.validFeesName = false;
          this.validFeesCategory = false;
          this.validMemberFees = false;
          this.validNonMemberFees = false;
          this.validTax = false;
          this.edit.nativeElement.focus();
        } else if (this.postMembershipTypeForm.valid) {
          this.validFeesName = true;
          this.validFeesCategory = true;
          this.validMemberFees = true;
          this.validNonMemberFees = true;
          this.validTax = true;
        this.MembershipTypeMasterService.editMembershipTypeMaster(
          this.postMembershipTypeForm.value,
          this.editMembershipType.id
        ).subscribe((data) => {
          console.log("data : ", data);
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
    console.log('data', this.postMembershipTypeForm.invalid);
  }

  /********************************************************************
                Get Member Categories Master
********************************************************************/

  getMemberCategories() {
    this.MembershipTypeMasterService.getMembershipTypeMaster().subscribe(
      (res) => {
        this.feesData = res.data;
        console.log("res", res);
        
        this.loading = false;
        this.postMembershipTypeForm.reset();
      }
    );
  }

  /********************************************************************
                  Edit Member Categories Master
  ********************************************************************/

  editMemberCategoryMaster(event) {
    console.log("event ", event);
    
    this.mode = 'edit';
    this.editMembershipType = event;
    this.membershipName = event.membership_name;
    this.typeOfFee = event.type_of_fee;
    this.particulars = event.particulars;
    this.membershipFee = event.membership_fee;
    this.tax = event.tax_percentage;

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
        this.MembershipTypeMasterService.deleteMembershipTypeMaster(
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
    if (this.postMembershipTypeForm.invalid) {
      this.validFeesName = false;
          this.validFeesCategory = false;
          this.validMemberFees = false;
          this.validNonMemberFees = false;
          this.validTax = false;
    } else if (this.postMembershipTypeForm.valid) {
      this.validFeesName = true;
          this.validFeesCategory = true;
          this.validMemberFees = true;
          this.validNonMemberFees = true;
          this.validTax = true;
    }
  }

}
