import { IBrand } from './../models/brand';
import { IPagination } from './../models/paginated-product';
import { ShopService } from './shop.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { IType } from '../models/product-type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  sortOptions = [
    {
      name: 'Alphabetical',
      value: 'name',
    },
    {
      name: 'Price: Low to High',
      value: 'priceAsc',
    },
    {
      name: 'Price: High to Low',
      value: 'priceDesc',
    },
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService
      .getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected)
      .subscribe({
        next: (response: IPagination) => {
          this.products = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (response: IBrand[]) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response: IType[]) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getProducts();
  }

  onSearch() {}

  onReset() {}
}
