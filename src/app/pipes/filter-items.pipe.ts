import { Pipe, PipeTransform } from '@angular/core';

export interface Item {
  name: string;
  price: number;
}

@Pipe({
  name: 'filterItems',
})
export class FilterItemsPipe implements PipeTransform {
  transform(
    items: Item[],
    filterCriteria: { name?: string; price?: number }
  ): Item[] {
    if (!items || items.length === 0) {
      return [];
    }

    return items.filter((item) => {
      const nameMatches = filterCriteria.name
        ? item.name.toLowerCase().includes(filterCriteria.name.toLowerCase())
        : true;
      const priceMatches = filterCriteria.price
        ? item.price === filterCriteria.price
        : true;

      return nameMatches && priceMatches;
    });
  }
}
