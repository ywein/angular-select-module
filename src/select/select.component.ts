import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

import { SelectPipe } from './select.pipe';

@Component({
  selector: 'angular-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements OnInit {

  @Input() public open: boolean = false;
  @Input() public showHtml: boolean = false;
  @Input() public showSearch: boolean = true;
  @Input() public showSearchThreshold: number = 10;
  @Input() public selected: string;
  @Input() public placeholder: string = '';
  @Input() public items: any[];

  public search: string = '';

  @Output() public valueSelected:EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') private searchInput: ElementRef;
  
  constructor() { }

  ngOnInit() {
    const self = this;
    window.addEventListener('click', this.closeSelect.bind(self));
  }

  ngOnDestroy() {
    const self = this;
    window.removeEventListener('click', this.closeSelect.bind(self));
  }

  toggleSelect(e: any): void {
    e.stopPropagation();
    this.open = !this.open;
    if (this.open === true) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0)
    }
  }

  closeSelect(): void {
    this.open = false;
  }

  selectItem(value: string): void {
    this.selected = value;
    this.closeSelect();
    this.valueSelected.emit(value);
  }

  clearSelected(e: any): void {
    e.stopPropagation();
    this.selected = null;
    this.valueSelected.emit('');
  }

  searchClick(e: any): void {
    e.stopPropagation();
  }

}
