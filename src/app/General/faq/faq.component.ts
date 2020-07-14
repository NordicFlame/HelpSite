import { Component } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { FaqFormComponent } from 'src/app/Forms/faq-form/faq-form.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs: any[];
  filteredUnits: any[];
  subscription: Subscription;
  appUser: AppUser;

  constructor(private faqService: FaqService, private modalService: NgbModal, private auth: AuthService) {
    this.subscription = this.faqService.read().subscribe(faqs => this.filteredUnits = this.faqs = faqs);
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  filter(query: string) {
    this.filteredUnits = (query) ? this.faqs.filter(u => (u.question).toLowerCase().includes(query.toLowerCase())) : this.faqs;
  }

  open() {
    this.modalService.open(FaqFormComponent);
  }

}
