import { ShoppingCart } from 'shared/models/shopping-cart';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({ 
      dateCreated: new Date().getTime() 
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map(( x:ShoppingCart ) => new ShoppingCart(x.items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if(!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

    return cartId;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.getItem(cartId, product._key).valueChanges();
    let item$$ = this.getItem(cartId, product._key);
    item$.pipe(take(1)).subscribe(item => {
      if (!item) {
        item$$.set({ 
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl, 
          quantity: 0 + change 
        });
      }
      else {
        let q = (item.quantity || 0) + change;
        if (q === 0) item$$.remove();
        else
        item$$.update({ 
          //product: product,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl, 
          quantity: q
        });
      } 
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

}
