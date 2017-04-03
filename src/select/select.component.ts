import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

import { SelectPipe } from './select.pipe';

let styles = `
.angular-select {
  position: relative;
  box-sizing: border-box;
  font-size: 18px
}
.angular-select__select-box {
  height: 40px;
  line-height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .15);
  background: #ffffff;
  padding: 0 25px 0 5px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease
}
.angular-select__select-box:hover {
  background: #cccccc
}
.angular-select__select-box:after {
  content: ' ';
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #000000;
  position: absolute;
  right: 4px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%)
}
.angular-select__select-box--open {
  padding: 0
}
.angular-select__select-box--open:after {
  content: '';
  display: none
}
.angular-select__search {
  width: 100%;
  height: 100%;
  font-size: 18px;
  background: #ffffff;
  box-shadow: none;
  outline: none;
  border: 0;
  padding: 0 4px
}
.angular-select__select-box-clear {}
.angular-select__select-box-clear:before {
  content: '✕';
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%)
}
.angular-select__options-list {
  display: none;
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 5px 0;
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
}
.angular-select__options-list--open {
  display: block
}
.angular-select__option {
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  padding: 0 10px
}
.angular-select__option:hover, .angular-select__option--selected {
  background: #428BCA;
  color: #ffffff
}
.angular-select select {
  display: none;
}
`;

@Component({
  selector: 'angular-select',
  styles: [styles],
  template: `
    <div class="angular-select">
      <div (click)="toggleSelect($event)" 
        [ngClass]="{'angular-select__select-box--selected': selected, 'angular-select__select-box--open': open}" 
        class="angular-select__select-box">
        <div (click)="clearSelected($event)" *ngIf="selected" class="angular-select__select-box-clear"></div>
        <div *ngIf="!showSearch || !(showSearchThreshold < items.length) || !open">{{(selected ? selected : placeholder)}}</div>
        <input #searchInput [(ngModel)]="search" (click)="searchClick($event)" class="angular-select__search" *ngIf="showSearch && (showSearchThreshold < items.length) && open" type="" name="" value="">
      </div>
      <ul [ngClass]="{'angular-select__options-list--open': open}" class="angular-select__options-list">
        <li *ngFor="let item of items | selectPipe:search" [ngClass]="{'angular-select__option--selected': item.value === selected}" (click)="selectItem(item.value)" class="angular-select__option">
          <div *ngIf="showHtml === false">{{item.text}}</div>
          <div *ngIf="showHtml === true" [innerHTML]="item.text">

          </div>
        </li>
      </ul>
      <select [ngModel]="selected">
        <option *ngFor="let item of items" [ngValue]="item.value">{{item.text}}</option>
      </select>
    </div>
  `,
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
