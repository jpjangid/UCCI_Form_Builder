import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  Validators,
  FormBuilder,
} from '@angular/forms';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import { FeesMasterService } from 'src/app/services/fees-master.service';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  styleUrls: ['./fees-master.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class FeesMasterComponent implements OnInit {

  constructor(
    private FeesMasterService: FeesMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ) { }

  @ViewChild('focus') edit: ElementRef;

  breadcrumb: any[] = [
    {
      title: 'Fees Master',
      subTitle: 'Masters',
    },
  ];

  mode: string = 'insert';

  editFees: any;

  focusState: boolean = false;

  position: string;

  postFeesForm = this.fb.group({
    fee_name: ['', Validators.required],
    fee_category: [ '', Validators.required],
    member_amount: [ '', Validators.required],
    non_member_amount: [ '', Validators.required],
    taxes: [ '', Validators.required],
  });

  memberCategoryName: any;

  feeName: string = '';

  feeCategory: string;

  memberAmount: number;

  nonMemberAmount: number;
  
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
        if (this.postFeesForm.invalid) {
          this.validFeesName = false;
          this.validFeesCategory = false;
          this.validMemberFees = false;
          this.validNonMemberFees = false;
          this.validTax = false;
          this.edit.nativeElement.focus();
        } else if (this.postFeesForm.valid) {
          this.validFeesName = true;
          this.validFeesCategory = true;
          this.validMemberFees = true;
          this.validNonMemberFees = true;
          this.validTax = true;true

        // console.log("data : ", this.postMemberClassificationForm.value);
        this.FeesMasterService.insertFeesMaster(
          this.postFeesForm.value
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
        if (this.postFeesForm.invalid) {
          this.validFeesName = false;
          this.validFeesCategory = false;
          this.validMemberFees = false;
          this.validNonMemberFees = false;
          this.validTax = false;
          this.edit.nativeElement.focus();
        } else if (this.postFeesForm.valid) {
          this.validFeesName = true;
          this.validFeesCategory = true;
          this.validMemberFees = true;
          this.validNonMemberFees = true;
          this.validTax = true;
        this.FeesMasterService.editFeesMaster(
          this.postFeesForm.value,
          this.editFees.id
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
    console.log('data', this.postFeesForm.invalid);
  }

  /********************************************************************
                Get Member Categories Master
********************************************************************/

  getMemberCategories() {
    this.FeesMasterService.getFeesMaster().subscribe(
      (res) => {
        this.feesData = res.data;
        console.log("res", res);
        
        this.loading = false;
        this.postFeesForm.reset();
      }
    );
  }

  /********************************************************************
                  Edit Member Categories Master
  ********************************************************************/

  editMemberCategoryMaster(event) {
    this.mode = 'edit';
    this.editFees = event;
    this.feeName = event.fee_name;
    this.feeCategory = event.fee_category;
    this.memberAmount = event.member_amount;
    this.nonMemberAmount = event.non_member_amount;
    this.tax = event.taxes;

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
        this.FeesMasterService.deleteFeesMaster(
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
    if (this.postFeesForm.invalid) {
      this.validFeesName = false;
          this.validFeesCategory = false;
          this.validMemberFees = false;
          this.validNonMemberFees = false;
          this.validTax = false;
    } else if (this.postFeesForm.valid) {
      this.validFeesName = true;
          this.validFeesCategory = true;
          this.validMemberFees = true;
          this.validNonMemberFees = true;
          this.validTax = true;
    }
  }

}
