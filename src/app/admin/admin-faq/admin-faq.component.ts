import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { FaqFormComponent } from 'src/app/Forms/faq-form/faq-form.component';
import { FaqEditFormComponent } from 'src/app/Forms/Edit/faq-edit-form/faq-edit-form.component';

@Component({
  selector: 'app-admin-faq',
  templateUrl: './admin-faq.component.html',
  styleUrls: ['./admin-faq.component.css']
})
export class AdminFaqComponent implements OnInit, OnDestroy {
  faqs: any[];
  filteredUnits: any[];
  subscription: Subscription;
  appUser: AppUser;

  constructor(private faqService: FaqService, private modalService: NgbModal, private auth: AuthService) {
    this.subscription = this.faqService.readAdmin()
      .subscribe(faqs => this.filteredUnits = this.faqs = faqs);
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  filter(query: string) {
    this.filteredUnits = (query) ?
      this.faqs.filter(u => (u.question).toLowerCase().includes(query.toLowerCase())) :
      this.faqs;
  }

  open() {
    this.modalService.open(FaqFormComponent);
  }

  edit(item) {
    const modalRef = this.modalService.open(FaqEditFormComponent);
    modalRef.componentInstance.id = item;
  }

  delete(item) {
    if (!confirm('Are you sure you want to delete this unit?')) return;
    this.faqService.delete(item.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
  }
}