import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectPipe'
})
export class SelectPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
      if (!items) return [];
      if (!filter) return items;
      filter = filter.toLowerCase();
      return items.filter(item => (item.text.toString().toLowerCase().indexOf(filter) !== -1));
  }

}
