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
import { MemberClassificationMasterService } from 'src/app/services/member-classification.service';

@Component({
  selector: 'app-member-classification',
  templateUrl: './member-classification.component.html',
  styleUrls: ['./member-classification.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MemberClassificationComponent implements OnInit {

  constructor(
    private MemberClassificationMasterService: MemberClassificationMasterService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ) { }

  @ViewChild('focus') edit: ElementRef;

  mode: string = 'insert';

  editMemberClassification: any;

  focusState: boolean = false;

  position: string;

  postMemberClassificationForm = this.fb.group({
    name: ['', Validators.required],
    total_seats: [ '', Validators.required],
    occupied_seats: [ '', Validators.required]
  });

  memberCategoryName: any;

  name: string = '';

  totalSeats: number;

  occupiedSeats: number;

  classification: any[];

  loading: boolean = true;

  btnText: string = 'Add';

  validTextName: boolean = true;

  validTotalSeats: boolean = true;

  validOccupiedSeats: boolean = true;

  important: string = ' !important';

  breadcrumb: any[] = [
    {
      title: 'Member Classification',
      subTitle: 'Masters',
    },
  ];

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
        if (this.postMemberClassificationForm.invalid) {
          this.validTextName = false;
          this.validTotalSeats = false;
          this.validOccupiedSeats = false;
          this.edit.nativeElement.focus();
        } else if (this.postMemberClassificationForm.valid) {
          this.validTextName = true;
          this.validTotalSeats = true;
          this.validOccupiedSeats = true;

        // console.log("data : ", this.postMemberClassificationForm.value);
        this.MemberClassificationMasterService.insertMemberClassificationMaster(
          this.postMemberClassificationForm.value
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
        if (this.postMemberClassificationForm.invalid) {
          this.validTextName = false;
          this.validTotalSeats = false;
          this.validOccupiedSeats = false;
          this.edit.nativeElement.focus();
        } else if (this.postMemberClassificationForm.valid) {
          this.validTextName = true;
          this.validTotalSeats = true;
          this.validOccupiedSeats = true;
        this.MemberClassificationMasterService.editMemberClassificationMaser(
          this.postMemberClassificationForm.value,
          this.editMemberClassification.id
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
    console.log('data', this.postMemberClassificationForm.invalid);
  }

  /********************************************************************
                Get Member Categories Master
********************************************************************/

  getMemberCategories() {
    this.MemberClassificationMasterService.getMemberClassificationMaster().subscribe(
      (res) => {
        this.classification = res.data;
        this.loading = false;
        this.postMemberClassificationForm.reset();
      }
    );
  }

  /********************************************************************
                  Edit Member Categories Master
  ********************************************************************/

  editMemberCategoryMaster(event) {
    this.mode = 'edit';
    this.editMemberClassification = event;
    this.name = event.name;
    this.totalSeats = event.total_seats;
    this.occupiedSeats = event.occupied_seats

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
        this.MemberClassificationMasterService.deleteMemberClassificationMaser(
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
    if (this.postMemberClassificationForm.invalid) {
      this.validTextName = false;
      this.validTotalSeats = false;
      this.validOccupiedSeats = false;
    } else if (this.postMemberClassificationForm.valid) {
      this.validTextName = true;
      this.validTotalSeats = true;
      this.validOccupiedSeats = true;
    }
  }
}
