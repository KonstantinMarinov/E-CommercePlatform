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

  constructor() {}

  ngOnInit(): void {
    this.setImagePath();
  }

  separateFileNameFromPictureUrl(pictureUrl: string): string {
    var separated = pictureUrl.split('/');
    return separated[separated.length - 1];
  }

  setImagePath(): void {
    this.imagePath =
      '../../../assets/products/' +
      this.separateFileNameFromPictureUrl(this.product.pictureUrl);
  }
}
