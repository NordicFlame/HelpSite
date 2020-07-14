import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { UnitService } from 'src/app/services/unit.service';
import { Units } from 'src/app/models/units';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms'
import { firestore } from 'firebase';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css']
})
export class UnitFormComponent implements OnInit {
  categories$;
  unit = {} as Units;
  timestamp = firestore.FieldValue.serverTimestamp();
  unitForm = this.fb.group({
    unitcode : '',
    title : '',
    category : '',
    timestamp : this.timestamp
  });

  constructor( categoryService: CategoryService, private unitService: UnitService, private modalService: NgbModal, private fb: FormBuilder) { 
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

  onSubmit() {
    this.unitService.create(this.unitForm.value);
    this.unitForm.reset();
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
  }

}
