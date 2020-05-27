import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'boot-navbar',
  templateUrl: './boot-navbar.component.html',
  styleUrls: ['./boot-navbar.component.css']
})
export class BootNavbarComponent implements OnInit {
  appUser: AppUser;
  public isMenuCollapsed = true;
  cart$: Observable<any>;

  constructor( private auth: AuthService, private shoppingCartService: ShoppingCartService ) {
    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
