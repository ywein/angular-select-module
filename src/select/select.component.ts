import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

import { SelectPipe } from './select.pipe';

import { styles } from './select.component.css';

@Component({
  selector: 'angular-select',
  styles: [styles],
  template: `
    <div class="angular-select">
      <div (click)="toggleSelect($event)" 
        [ngClass]="{'angular-select__select-box--selected': selected, 'angular-select__select-box--open': open,'angular-select__select-box--with-search': showSearch && (showSearchThreshold < items.length)}" 
        class="angular-select__select-box">
        <div (click)="clearSelected($event)" *ngIf="selected" class="angular-select__select-box-clear"></div>
        <div *ngIf="!showSearch || !(showSearchThreshold < items.length) || !open">{{(selected ? selectedText : placeholder)}}</div>
        <input #searchInput [(ngModel)]="search" (click)="searchClick($event)" class="angular-select__search" *ngIf="showSearch && (showSearchThreshold < items.length) && open" type="" name="" value="">
      </div>
      <ul [ngClass]="{'angular-select__options-list--open': open}" class="angular-select__options-list">
        <li *ngFor="let item of items | selectPipe:search" [ngClass]="{'angular-select__option--selected': item.value === selected}" (click)="selectItem(item.value)" class="angular-select__option">
          <div *ngIf="showHtml === false">{{item.text}}</div>
          <div *ngIf="showHtml === true" [innerHTML]="item.text">

          </div>
        </li>
      </ul>
      <select [ngModel]="selected" (ngModelChange)="selectItem($event)">
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
  @Input() public selectedText: string;
  @Input() public selected: string;
  @Input() public placeholder: string = '';
  @Input() public items: any[];

  public search: string = '';

  @Output() public valueSelected:EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') public searchInput: ElementRef;
  
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
        if (typeof this.searchInput !== 'undefined') {
          this.searchInput.nativeElement.focus();
        }
      }, 0)
    }
  }

  closeSelect(): void {
    this.open = false;
  }

  selectItem(value: string): void {
    const selectedItem = this.items.find(item => item.value === value)
    if (selectedItem) {
      this.selectedText = selectedItem.text
    }
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
