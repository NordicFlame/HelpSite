import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CalendarService } from 'src/app/services/calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firestore } from 'firebase';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent {
  timestamp = firestore.FieldValue.serverTimestamp();

  eventsForm = this.fb.group({
    title : '',
    start : ''
  });

  constructor(private fb: FormBuilder, private calendarService: CalendarService, private modalService: NgbModal ) {  }

  onSubmit(){
    this.calendarService.create(this.eventsForm.value);
    this.eventsForm.reset();
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

}
