import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Subscription } from 'rxjs';
import { StudyPlanService } from 'src/app/services/study-plan.service';
import { AppUser } from 'src/app/models/app-user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { UnitFormComponent } from 'src/app/Forms/unit-form/unit-form.component';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css']
})
export class StudyPlanComponent {
  units: any[] = [];
  studyplan: any[] = [];
  filteredUnits: any[] = [];
  subscription: Subscription;
  appUser: AppUser;
  year;
  period;

  test: any[] = [
    {unitcode: 'TST001', title: 'Test Inside', year: '1', category: '1' }, 
    {unitcode: 'TST002', title: 'Test Inside', year: '1', category: '2' }, 
    {unitcode: 'TST003', title: 'Test Inside', year: '2', category: '1' }, 
    {unitcode: 'TST004', title: 'Test Inside', year: '2', category: '2' }, 

  ];
  
  constructor( private planService: StudyPlanService, private unitService: UnitService, private modalService: NgbModal, private auth: AuthService) { 
    this.planService.getAllCarts().then(cheese => {cheese.snapshotChanges().subscribe(stuff => this.studyplan = stuff)});
    //this.unitService.readAdmin().subscribe(units => { this.units = units });
    this.subscription = this.unitService.readAdmin().subscribe(units => this.filteredUnits = this.units = units);

    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  addToCart(item) {
    if (this.year) {
      item.year = this.year;
      item.period = this.period;
      this.planService.addToCart(item);
    }
  }

  deleteFromCart(unitId) {
    this.planService.delete(unitId);
  }

  open() {
    this.modalService.open(UnitFormComponent);
  }

  changeDate(year, period) {
    this.year = year;
    this.period = period;
  }

}
