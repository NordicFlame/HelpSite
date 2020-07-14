import { Component, OnInit, Input } from '@angular/core';
import { faq } from 'src/app/models/faq';
import { take } from 'rxjs/operators';
import { FaqService } from 'src/app/services/faq.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq-edit-form',
  templateUrl: './faq-edit-form.component.html',
  styleUrls: ['./faq-edit-form.component.css']
})
export class FaqEditFormComponent implements OnInit {
  @Input() public id : string;
  faq = {} as faq;

  constructor( private faqService: FaqService, private modalService: NgbModal) { }

  save(faq) {
    if (this.id) this.faqService.update(this.id, faq);
    else this.faqService.create(faq);
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    if (this.id) this.faqService.get(this.id).pipe(take(1)).subscribe(u => this.faq = u);
  }
}
