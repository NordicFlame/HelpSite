import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from '../../models/app-user';
import { AuthService } from '../../services/auth.service';
import { CalendarFormComponent } from 'src/app/Forms/calendar-form/calendar-form.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  events: any[];
  appUser: AppUser;
  calendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [{ title: 'New Event', start: new Date('2019-09-23') }, { title: 'New Event', start: new Date('2019-09-23') }];

  constructor( private modalService: NgbModal, private auth: AuthService, private calendarService: CalendarService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.calendarService.read().subscribe(element => this.events = element );
  }

  open() {
    this.modalService.open(CalendarFormComponent);
    
  }
  
}
