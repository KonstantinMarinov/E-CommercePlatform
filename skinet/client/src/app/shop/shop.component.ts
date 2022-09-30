import { ShopParams } from './../models/shopParams';
import { IBrand } from './../models/brand';
import { IPagination } from './../models/paginated-product';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../models/product';
import { IType } from '../models/product-type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  shopParams = new ShopParams();
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

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response: IPagination) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
