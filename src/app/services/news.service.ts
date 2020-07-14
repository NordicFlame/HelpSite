import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  timestamp = firestore.FieldValue.serverTimestamp();

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  create(image) {
    return this.afs.collection('gallery').add(image);
  }
  
  read() {
    return this.afs.collection("gallery", ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  readAdmin() {
    return this.afs.collection("gallery", ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  get(newsId) {

    return this.afs.collection('gallery').doc(newsId).valueChanges();
  }

  update(newsId, news) {
    return this.afs.collection('gallery').doc(newsId).update(news);
  }

  delete(unitId) {
    return this.afs.collection('gallery').doc(unitId).delete();
  }
  
}


