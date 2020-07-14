import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { CalendarEvents } from '../models/CalendarEvents';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  timestamp = firestore.FieldValue.serverTimestamp();

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  
  create(event) {
    return this.afs.collection('calendar').add(event);
  }

  read() {
    return this.afs.collection("calendar").valueChanges();
  }

  readAdmin() {
    return this.afs.collection("calendar").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CalendarEvents;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  get(eventsId) {

    return this.afs.collection('calendar').doc(eventsId).valueChanges();
  }

  update(eventsId, event) {
    return this.afs.collection('calendar').doc(eventsId).update(event);
  }

  delete(eventsId) {
    return this.afs.collection('calendar').doc(eventsId).delete();
  }

}
