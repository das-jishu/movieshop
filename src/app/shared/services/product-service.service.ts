import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    var myRef = firebase.database().ref('/products').push(product);
    var key = myRef.key;
    this.db.object('/products/' + key).update({
      _key: key
    })
  }

  getAll(): Observable<any> {
    return this.db.list('/products').valueChanges();
  }

  get(productId): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
