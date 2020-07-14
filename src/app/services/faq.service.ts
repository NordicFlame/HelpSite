import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { faq } from '../models/faq';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  timestamp = firestore.FieldValue.serverTimestamp();

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  create(image) {
    return this.afs.collection('faq').add(image);
  }
  
  read() {
    return this.afs.collection("faq", ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  readAdmin() {
    return this.afs.collection("faq", ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as faq;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  get(newsId) {

    return this.afs.collection('faq').doc(newsId).valueChanges();
  }

  update(newsId, news) {
    return this.afs.collection('faq').doc(newsId).update(news);
  }

  delete(unitId) {
    return this.afs.collection('faq').doc(unitId).delete();
  }
}






  