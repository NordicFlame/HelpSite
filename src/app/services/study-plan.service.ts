import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  private create() {
    return this.db.list('/study-plans').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/study-plans/' + cartId);
  }

  public async getAllCarts() {
    let cartId = await this.getOrCreateCartId();
    return this.db.list('/study-plans/' + cartId + '/units/');
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(unitId) {
    let cartId = await this.getOrCreateCartId();
    //db.ref("/study-plans/" + cartId + '/items/' + unitId)
    let item$ = this.db.object('/study-plans/' + cartId + '/units/' + unitId.id);
    item$.set({ 
      unitcode : unitId.unitcode,
      title : unitId.title,
      year : unitId.year,
      period : unitId.period,
      category : unitId.category
   });   
  }

  async delete(unitId) {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/study-plans/' + cartId + '/units/' + unitId.key).remove();
  }
}
