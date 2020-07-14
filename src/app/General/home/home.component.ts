import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from 'src/app/models/app-user';
import { NewsService } from 'src/app/services/news.service';
import { AuthService } from 'src/app/services/auth.service';
import { NewsFormComponent } from 'src/app/Forms/news-form/news-form.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  news: any[];
  appUser: AppUser;

  constructor(private newsService: NewsService, private modalService: NgbModal, private auth: AuthService) {
    this.newsService.read().subscribe(news => this.news = news);
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }
  
   open() {
    this.modalService.open(NewsFormComponent);
  }

}