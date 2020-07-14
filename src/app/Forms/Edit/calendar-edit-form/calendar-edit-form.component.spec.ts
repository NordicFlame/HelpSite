import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEditFormComponent } from './calendar-edit-form.component';

describe('CalendarEditFormComponent', () => {
  let component: CalendarEditFormComponent;
  let fixture: ComponentFixture<CalendarEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
