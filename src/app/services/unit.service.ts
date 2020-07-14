import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { Units } from '../models/units';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  timestamp = firestore.FieldValue.serverTimestamp();

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  create(image) {
    return this.afs.collection('units').add(image);
  }
  
  read() {
    return this.afs.collection("units").valueChanges();
  }

  readAdmin() {
    return this.afs.collection("units").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Units;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  get(unitId) {

    return this.afs.collection('units').doc(unitId).valueChanges();
  }

  update(unitId, unit) {
    return this.afs.collection('units').doc(unitId).update(unit);
  }

  delete(unitId) {
    return this.afs.collection('units').doc(unitId).delete();
  }
}
