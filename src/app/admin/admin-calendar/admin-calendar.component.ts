import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEditFormComponent } from 'src/app/Forms/Edit/calendar-edit-form/calendar-edit-form.component';
import { CalendarFormComponent } from 'src/app/Forms/calendar-form/calendar-form.component';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {
  events: any[];
  orderId;

  constructor(private calendarService: CalendarService, private modalService: NgbModal) {
    this.calendarService.readAdmin().subscribe(element => this.events = element);
   }

  open() {
    this.modalService.open(CalendarFormComponent);
  }

  edit(item) {
    const modalRef = this.modalService.open(CalendarEditFormComponent);
    modalRef.componentInstance.id = item;
  }

  delete(item) {
    if (!confirm('Are you sure you want to delete this unit?')) return;
    this.calendarService.delete(item.id);
  }

  ngOnInit() {

  }

}
