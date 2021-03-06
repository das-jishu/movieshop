import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  category$;
  @Input('category') category;
  constructor( private categoryService: CategoryService ) { 
    this.category$ = this.categoryService.getAll();
  }

  ngOnInit(): void {
  }

}
