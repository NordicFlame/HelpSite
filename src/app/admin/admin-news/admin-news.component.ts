import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsFormComponent } from 'src/app/Forms/news-form/news-form.component';
import { NewsEditFormComponent } from 'src/app/Forms/Edit/news-edit-form/news-edit-form.component';


@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit{
  news: any[];

  constructor(private newsService: NewsService, private modalService: NgbModal) {
    this.newsService.readAdmin().subscribe(news => this.news = news);
   }

  open() {
    this.modalService.open(NewsFormComponent);
  }

  edit(item) {
    const modalRef = this.modalService.open(NewsEditFormComponent);
    modalRef.componentInstance.id = item;
  }

  delete(item) {
    if (!confirm('Are you sure you want to delete this unit?')) return;
    this.newsService.delete(item.id);
  }

  ngOnInit() {

  }

}


