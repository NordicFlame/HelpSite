import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FaqService } from 'src/app/services/faq.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { faq } from 'src/app/models/faq';
import { FormBuilder } from '@angular/forms'
import { firestore } from 'firebase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent {
  timestamp = firestore.FieldValue.serverTimestamp();

  faqForm = this.fb.group({
    unitcode : '',
    question : '',
    answer : '',
    timestamp : this.timestamp
  });

  constructor(private fb: FormBuilder, private faqService: FaqService, private modalService: NgbModal) { }

  onSubmit(){
    this.faqService.create(this.faqForm.value);
    this.faqForm.reset();
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }



}

