import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FullCalendarModule } from '@fullcalendar/angular';

import { BsNavbarComponent } from './General/bs-navbar/bs-navbar.component';
import { AdminUnitComponent } from './admin/admin-unit/admin-unit.component';
import { AdminFaqComponent } from './admin/admin-faq/admin-faq.component';

import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { CalendarComponent } from './General/calendar/calendar.component';
import { HomeComponent } from './General/home/home.component';
import { FaqComponent } from './General/faq/faq.component';
import { StudyPlanComponent } from './General/study-plan/study-plan.component';

import { UnitFormComponent } from './Forms/unit-form/unit-form.component';
import { NewsFormComponent } from './Forms/news-form/news-form.component';
import { FaqFormComponent } from './Forms/faq-form/faq-form.component';
import { CalendarFormComponent } from './Forms/calendar-form/calendar-form.component';

import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { UnitService } from './services/unit.service';
import { NewsService } from './services/news.service';
import { FaqService } from './services/faq.service';
import { StudyPlanService } from './services/study-plan.service';
import { CalendarService } from './services/calendar.service';

import { ImgFallbackDirective } from './Directives/img-fallback.directive';
import { CommonModule } from '@angular/common';
import { NewsEditFormComponent } from './Forms/Edit/news-edit-form/news-edit-form.component';
import { FaqEditFormComponent } from './Forms/Edit/faq-edit-form/faq-edit-form.component';
import { UnitEditFormComponent } from './Forms/Edit/unit-edit-form/unit-edit-form.component';
import { AdminCalendarComponent } from './admin/admin-calendar/admin-calendar.component';
import { CalendarEditFormComponent } from './Forms/Edit/calendar-edit-form/calendar-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    FaqComponent,
    CalendarComponent,

    AdminUnitComponent,
    AdminFaqComponent,
    AdminNewsComponent,
    StudyPlanComponent,
    
    UnitFormComponent,
    NewsFormComponent,
    FaqFormComponent,
    CalendarFormComponent,
    
    AdminFaqComponent,

    ImgFallbackDirective,

    NewsEditFormComponent,

    FaqEditFormComponent,

    UnitEditFormComponent,

    AdminCalendarComponent,

    CalendarEditFormComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule,
    FullCalendarModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'studyplan', component: StudyPlanComponent },
      { path: 'calendar', component: CalendarComponent },

      { path: 'admin/faq/new', component: FaqFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/units/new', component: UnitFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/news/new', component: NewsFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/calendar/new', component: CalendarFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      { path: 'admin/units/:id', component: UnitEditFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/faq/:id', component: FaqEditFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/news/:id', component: NewsEditFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/calendar/:id', component: CalendarEditFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      { path: 'admin/units', component: AdminUnitComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/news', component: AdminNewsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/faq', component: AdminFaqComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/calendar', component: AdminCalendarComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    UnitService,
    NewsService,
    FaqService,
    StudyPlanService,
    CalendarService,
  

    AuthGuard,
    AdminAuthGuard,

    AngularFireDatabase,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
