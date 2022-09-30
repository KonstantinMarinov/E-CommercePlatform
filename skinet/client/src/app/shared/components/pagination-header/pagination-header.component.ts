import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
})
export class PaginationHeaderComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;

  ngOnInit(): void {}
}
