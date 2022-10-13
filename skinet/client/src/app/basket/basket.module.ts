import { SharedModule } from './../shared/shared.module';
import { ImageUrlService } from './../services/image-url.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, BasketRoutingModule, SharedModule],
  providers: [ImageUrlService],
})
export class BasketModule {}
