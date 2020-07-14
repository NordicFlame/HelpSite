import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Units } from 'src/app/models/units';
import { CategoryService } from 'src/app/services/category.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit-edit-form',
  templateUrl: './unit-edit-form.component.html',
  styleUrls: ['./unit-edit-form.component.css']
})
export class UnitEditFormComponent implements OnInit {
  @Input() public id : string;
  categories$;
  unit = {} as Units;

  constructor( categoryService: CategoryService, private unitService: UnitService, private modalService: NgbModal) { 
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

  save(unit) {
    if (this.id) this.unitService.update(this.id, unit);
    else this.unitService.create(unit);
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    if (this.id) this.unitService.get(this.id).pipe(take(1)).subscribe(u => this.unit = u);
  }

}
