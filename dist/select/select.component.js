var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { styles } from './select.component.css';
var SelectComponent = (function () {
    function SelectComponent() {
        this.open = false;
        this.showHtml = false;
        this.showSearch = true;
        this.showSearchThreshold = 10;
        this.placeholder = '';
        this.search = '';
        this.valueSelected = new EventEmitter();
    }
    SelectComponent.prototype.ngOnInit = function () {
        var self = this;
        window.addEventListener('click', this.closeSelect.bind(self));
    };
    SelectComponent.prototype.ngOnDestroy = function () {
        var self = this;
        window.removeEventListener('click', this.closeSelect.bind(self));
    };
    SelectComponent.prototype.toggleSelect = function (e) {
        var _this = this;
        e.stopPropagation();
        this.open = !this.open;
        if (this.open === true) {
            setTimeout(function () {
                if (typeof _this.searchInput !== 'undefined') {
                    _this.searchInput.nativeElement.focus();
                }
            }, 0);
        }
    };
    SelectComponent.prototype.closeSelect = function () {
        this.open = false;
    };
    SelectComponent.prototype.selectItem = function (value) {
        this.selected = value;
        this.closeSelect();
        this.valueSelected.emit(value);
    };
    SelectComponent.prototype.clearSelected = function (e) {
        e.stopPropagation();
        this.selected = null;
        this.valueSelected.emit('');
    };
    SelectComponent.prototype.searchClick = function (e) {
        e.stopPropagation();
    };
    return SelectComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "open", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "showHtml", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "showSearch", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], SelectComponent.prototype, "showSearchThreshold", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SelectComponent.prototype, "items", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SelectComponent.prototype, "valueSelected", void 0);
__decorate([
    ViewChild('searchInput'),
    __metadata("design:type", ElementRef)
], SelectComponent.prototype, "searchInput", void 0);
SelectComponent = __decorate([
    Component({
        selector: 'angular-select',
        styles: [styles],
        template: "\n    <div class=\"angular-select\">\n      <div (click)=\"toggleSelect($event)\" \n        [ngClass]=\"{'angular-select__select-box--selected': selected, 'angular-select__select-box--open': open,'angular-select__select-box--with-search': showSearch && (showSearchThreshold < items.length)}\" \n        class=\"angular-select__select-box\">\n        <div (click)=\"clearSelected($event)\" *ngIf=\"selected\" class=\"angular-select__select-box-clear\"></div>\n        <div *ngIf=\"!showSearch || !(showSearchThreshold < items.length) || !open\">{{(selected ? selected : placeholder)}}</div>\n        <input #searchInput [(ngModel)]=\"search\" (click)=\"searchClick($event)\" class=\"angular-select__search\" *ngIf=\"showSearch && (showSearchThreshold < items.length) && open\" type=\"\" name=\"\" value=\"\">\n      </div>\n      <ul [ngClass]=\"{'angular-select__options-list--open': open}\" class=\"angular-select__options-list\">\n        <li *ngFor=\"let item of items | selectPipe:search\" [ngClass]=\"{'angular-select__option--selected': item.value === selected}\" (click)=\"selectItem(item.value)\" class=\"angular-select__option\">\n          <div *ngIf=\"showHtml === false\">{{item.text}}</div>\n          <div *ngIf=\"showHtml === true\" [innerHTML]=\"item.text\">\n\n          </div>\n        </li>\n      </ul>\n      <select [ngModel]=\"selected\" (ngModelChange)=\"selectItem($event)\">\n        <option *ngFor=\"let item of items\" [ngValue]=\"item.value\">{{item.text}}</option>\n      </select>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [])
], SelectComponent);
export { SelectComponent };
