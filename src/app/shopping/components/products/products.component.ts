import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { CategoryService } from 'shared/services/category.service';
import { ProductServiceService } from 'shared/services/product-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart$: Observable<any>;

  constructor( private route: ActivatedRoute, private productService: ProductServiceService, private shoppingCartService: ShoppingCartService ) {  
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().subscribe(prod => {
      this.product = prod;
      this.route.queryParamMap.subscribe(params => { 
        this.category = params.get('category');
        this.applyFilter(); 
      });
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
          this.product.filter(p => p.category === this.category) :
          this.product;
  }
      
}
