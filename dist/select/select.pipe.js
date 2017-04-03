var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var SelectPipe = (function () {
    function SelectPipe() {
    }
    SelectPipe.prototype.transform = function (items, filter) {
        if (!items)
            return [];
        if (!filter)
            return items;
        filter = filter.toLowerCase();
        return items.filter(function (item) { return (item.text.toString().toLowerCase().indexOf(filter) !== -1); });
    };
    return SelectPipe;
}());
SelectPipe = __decorate([
    Pipe({
        name: 'selectPipe'
    })
], SelectPipe);
export { SelectPipe };
