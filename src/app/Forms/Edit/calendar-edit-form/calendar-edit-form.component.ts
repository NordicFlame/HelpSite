import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvents } from 'src/app/models/CalendarEvents';
import { CalendarService } from 'src/app/services/calendar.service';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-edit-form',
  templateUrl: './calendar-edit-form.component.html',
  styleUrls: ['./calendar-edit-form.component.css']
})
export class CalendarEditFormComponent implements OnInit {
  @Input() public id : string;
  events = {} as CalendarEvents;

  constructor( private calendarService: CalendarService, private modalService: NgbModal) { }

  save(news) {
    if (this.id) this.calendarService.update(this.id, news);
    else this.calendarService.create(news);
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    if (this.id) this.calendarService.get(this.id).pipe(take(1)).subscribe(u => this.events = u);
  }
}
