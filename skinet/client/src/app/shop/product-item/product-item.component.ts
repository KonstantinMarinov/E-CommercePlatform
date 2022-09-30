import { ImageUrlService } from './../../services/image-url.service';
import { IProduct } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  imagePath: string;

  constructor(private imageUrlService: ImageUrlService) {}

  ngOnInit(): void {
    this.setImagePath();
  }

  setImagePath(): void {
    this.imagePath = this.imageUrlService.setImagePath(this.product.pictureUrl);
  }
}
