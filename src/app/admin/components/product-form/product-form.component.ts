import { ProductServiceService } from 'shared/services/product-service.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product = {_key:'', title:'', category:'', price:'', imageUrl:''};
  id;

  constructor( private route: ActivatedRoute, private categoryservice: CategoryService, private productService: ProductServiceService, private router: Router) {
    this.categories$ = categoryservice.getAll();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit(): void {
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you want to delete this movie?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

}
