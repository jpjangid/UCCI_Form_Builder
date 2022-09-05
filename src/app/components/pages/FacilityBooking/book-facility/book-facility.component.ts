import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FacilityBookingService } from 'src/app/services/facility-booking-services/facility-booking.service';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-book-facility',
  templateUrl: './book-facility.component.html',
  styleUrls: ['./book-facility.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BookFacilityComponent implements OnInit {
  minDate: Date;
  formState: boolean = false;
  nameState: boolean = false;
  typeState: boolean = false;
  bookedData: any[];
  items: MenuItem[];
  activeIndex: number = 1;
  constructor(
    private fb: FormBuilder,
    private FacilityBookingService: FacilityBookingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  breadcrumb: any[] = [
    {
      title: 'Facility Booking',
    },
  ];

  dropDown: any[] = [
    { name: 'Select Place' },
    { name: 'Palace' },
    { name: 'Hall' },
    { name: 'Auditorium' },
  ];
  selectedPlace: string;
  invalidDates: Array<Date>;
  data: Date = new Date('30/08/2022');

  postFacilityBookedData = this.fb.group({
    booking_type: ['', Validators.required],
    booking_date: ['', Validators.required],
    booked_by: ['', Validators.required],
    place: ['', Validators.required],
  });
  ngOnInit(): void {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month;
    let prevYear = prevMonth === 11 ? year - 1 : year;

    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);

    let invalidDate = new Date();
    let invalidDate2 = new Date();
    let invalidDate3 = new Date();
    invalidDate.setDate(today.getDate() + 1);
    invalidDate2.setDate(today.getDate() + 3);
    // invalidDate3.setDate(29-08-2022);
    this.invalidDates = [invalidDate, invalidDate2];

    this.FacilityBookingService.getDataFromJson().subscribe((res) => {
      // console.log("response : ", res);
      this.bookedData = res;
    });

    this.items = [
      {
        label: 'Personal',
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({
            severity: 'info',
            summary: 'First Step',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({
            severity: 'info',
            summary: 'Seat Selection',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({
            severity: 'info',
            summary: 'Pay with CC',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({
            severity: 'info',
            summary: 'Last Step',
            detail: event.item.label,
          });
        },
      },
    ];
  }
  Submit() {
    console.log('data : ', this.postFacilityBookedData.value);
    var d = moment(this.postFacilityBookedData.value.booking_date).format(
      'YYYY/MM/DD'
    );
    this.postFacilityBookedData.value.booking_date = d;
    console.log('date', this.postFacilityBookedData.value);

    // this.formState = true;

    // this.FacilityBookingService.insertFacilityData(this.postFacilityBookedData.value).subscribe((data) => {
    //   console.log("data : ", data);
    //   var msg = data.message;
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Success',
    //     detail: msg,
    //   });

    // })
  }
  onPlaceChange(event) {
    this.selectedPlace = event;
    var length = 7;
    console.log('array length ', this.bookedData.length);
    var ss: any = this.bookedData;
    for (var i = 0; i <= length; i++) {
      var data = JSON.parse(ss);
      console.log('filterd data : ' + i, data.length);
    }
    // this.bookedData.forEach(item => {
    //   // console.log("item", item);

    // });
    // console.log('Changed', this.bookedData);
  }
  onDateSelect() {
    if (this.postFacilityBookedData.value.place != '') {
      {
        if (
          this.postFacilityBookedData.value.booking_date != '' &&
          this.postFacilityBookedData.value.booking_date != 'Invalid date'
        ) {
          this.formState = true;
          var name = this.postFacilityBookedData.value.booked_by;
          if (name != '') {
            this.nameState = true;
            if (this.postFacilityBookedData.value.booking_type == 'external') {
              this.typeState = true;
            }
          }
        }
      }
    }
  }
}
