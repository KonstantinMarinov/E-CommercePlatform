import { BasketService } from './../../basket/basket.service';
import { ImageUrlService } from './../../services/image-url.service';
import { IProduct } from './../../models/product';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  imagePath: string;
  productId: number;
  product: IProduct;
  quantity = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private imageUrlService: ImageUrlService,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.breadcrumbService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.setProductId();
    this.getProduct(this.productId);
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  setImagePath(): void {
    this.imagePath = this.imageUrlService.setImagePath(this.product.pictureUrl);
  }

  getProductId(): number {
    return this.activatedRoute.snapshot.params['id'];
  }

  setProductId(): void {
    this.productId = this.getProductId();
  }

  getProduct(id: number): void {
    this.shopService.getProduct(id).subscribe((product) => {
      this.product = product;
      this.breadcrumbService.set('@productDetails', product.name);
      this.setImagePath();
    });
  }
}
