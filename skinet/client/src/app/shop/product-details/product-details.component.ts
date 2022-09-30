import { ImageUrlService } from './../../services/image-url.service';
import { IProduct } from './../../models/product';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  imagePath: string;
  productId: number;
  product: IProduct;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private imageUrlService: ImageUrlService
  ) {}

  ngOnInit(): void {
    this.setProductId();
    this.getProduct(this.productId);
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
      this.setImagePath();
    });
  }
}
