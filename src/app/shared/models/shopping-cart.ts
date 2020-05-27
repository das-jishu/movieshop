import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    public itemsMap;
    constructor( itemsMaps ) {
        this.itemsMap = itemsMaps || {};
        for (let productId in this.itemsMap) {
            let item = this.itemsMap[productId];
            this.items.push(new ShoppingCartItem({
                ...item,
                _key: productId
            }));
        }
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product._key];
        return item ? item.quantity : 0;
    }
    

    get totalPrices() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }    

    getTotalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}