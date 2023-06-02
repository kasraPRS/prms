import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'prms-table-pagination',
  templateUrl: './table-pagination.component.html',
})
export class TablePaginationComponent {

  @Input() model: PaginationModel<any>;
  @Output() change: EventEmitter<PaginationModel<any>> = new EventEmitter();
  Array = Array;

  onBtnPrevClick() {
    if (this.model.hasPreviousPage) {
      this.model.pageNumber--;
      this.change.emit(this.model);
    }
  }
  onBtnPageNumberClick(pageNumber: number) {
    if (this.model.pageNumber != pageNumber) {
      this.model.pageNumber = pageNumber;
      this.change.emit(this.model);
    }
  }
  onBtnNextClick() {
    if (this.model.hasNextPage) {
      this.model.pageNumber++;
      this.change.emit(this.model);
    }
  }

}
export class PaginationModel<T>{
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  constructor(
    items?: {
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      items: T,
      pageNumber: number,
      pageSize: number,
      totalCount: number,
      totalPages: number
    }
  ) {
    if (items) {
      this.hasNextPage = items.hasNextPage;
      this.hasPreviousPage = items.hasPreviousPage;
      this.items = items.items;
      this.pageNumber = items.pageNumber;
      this.pageSize = items.pageSize;
      this.totalCount = items.totalCount;
      this.totalPages = items.totalPages;
    }
  }

}
