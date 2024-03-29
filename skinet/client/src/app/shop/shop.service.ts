import { ShopParams } from './../models/shopParams';
import { IType } from './../models/product-type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../models/brand';
import { IPagination } from '../models/paginated-product';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl + `products/${id}`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
