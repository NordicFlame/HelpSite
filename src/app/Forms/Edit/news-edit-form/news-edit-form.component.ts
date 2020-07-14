import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news';
import { take } from 'rxjs/operators';
import { NewsService } from 'src/app/services/news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-edit-form',
  templateUrl: './news-edit-form.component.html',
  styleUrls: ['./news-edit-form.component.css']
})
export class NewsEditFormComponent implements OnInit {
  @Input() public id : string;
  news = {} as News;

  constructor( private newsService: NewsService, private modalService: NgbModal) { }

  save(news) {
    if (this.id) this.newsService.update(this.id, news);
    else this.newsService.create(news);
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    if (this.id) this.newsService.get(this.id).pipe(take(1)).subscribe(u => this.news = u);
  }
}
