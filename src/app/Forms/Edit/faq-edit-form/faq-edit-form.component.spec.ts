import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqEditFormComponent } from './faq-edit-form.component';

describe('FaqEditFormComponent', () => {
  let component: FaqEditFormComponent;
  let fixture: ComponentFixture<FaqEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
