import { ProductServiceService } from 'shared/services/product-service.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: any;
  subscription: Subscription;
  items: Product[] = [];
  itemCount;
  displayedColumns: string[] = ['title', 'category', 'price', 'link'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private productService: ProductServiceService) { 
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredProducts = (filterValue) ?
      this.products.filter(p => p.title.toLowerCase().includes(filterValue.toLowerCase())) :
      this.products;

    this.initializeTable(this.filteredProducts);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
