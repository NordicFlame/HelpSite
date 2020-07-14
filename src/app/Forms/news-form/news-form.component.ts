import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder } from '@angular/forms'
import { firestore } from 'firebase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent {
  timestamp = firestore.FieldValue.serverTimestamp();
  newsForm = this.fb.group({
    title : '',
    message : '',
    imgURL : '',
    date : '',
    timestamp : this.timestamp
  });

  constructor(private fb: FormBuilder, private newsService: NewsService, private modalService: NgbModal) { }

  onSubmit(){
    this.newsService.create(this.newsForm.value);
    this.newsForm.reset();
    this.modalService.dismissAll();
  }

  dismiss() {
    this.modalService.dismissAll();
  }

}

