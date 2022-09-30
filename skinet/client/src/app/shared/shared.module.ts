import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [PaginationComponent, PaginationHeaderComponent],
  imports: [CommonModule, PaginationModule.forRoot()],
  exports: [PaginationModule, PaginationComponent, PaginationHeaderComponent]
})
export class SharedModule {}
