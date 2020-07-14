import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitFormComponent } from 'src/app/Forms/unit-form/unit-form.component';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { UnitEditFormComponent } from 'src/app/Forms/Edit/unit-edit-form/unit-edit-form.component';

@Component({
  selector: 'app-admin-unit',
  templateUrl: './admin-unit.component.html',
  styleUrls: ['./admin-unit.component.css']
})
export class AdminUnitComponent implements OnInit, OnDestroy {
  units: any[];
  filteredUnits: any[];
  subscription: Subscription;
  appUser: AppUser;

  constructor(private unitService: UnitService, private modalService: NgbModal, private auth: AuthService) {
    this.subscription = this.unitService.readAdmin()
      .subscribe(units => this.filteredUnits = this.units = units);
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
  }

  filter(query: string) {
    this.filteredUnits = (query) ?
      this.units.filter(u => (u.title).toLowerCase().includes(query.toLowerCase())) :
      this.units;
  }

  open() {
    this.modalService.open(UnitFormComponent);
  }

  edit(item) {
    const modalRef = this.modalService.open(UnitEditFormComponent);
    modalRef.componentInstance.id = item;
  }

  delete(item) {
    if (!confirm('Are you sure you want to delete this unit?')) return;
    this.unitService.delete(item.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
