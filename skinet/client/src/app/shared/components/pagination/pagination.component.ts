import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() totalCount: number;
  @Input() itemsPerPage: number;
  @Input() pageSize: number;

  @Output() pageChanged = new EventEmitter<number>();

  ngOnInit(): void {}

  onPageChanged(event: any) {
    this.pageChanged.emit(event.page);
  }
}
