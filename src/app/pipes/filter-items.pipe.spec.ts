import { TestBed } from '@angular/core/testing';
import { FilterItemsPipe, Item } from './filter-items.pipe';

describe('FilterItemsPipe', () => {
  let pipe: FilterItemsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterItemsPipe],
    });

    pipe = TestBed.inject(FilterItemsPipe);
  });

  it('should filter items by name', () => {
    const items: Item[] = [
      { name: 'Apple', price: 2 },
      { name: 'Banana', price: 1 },
      { name: 'Orange', price: 3 },
      { name: 'Grapes', price: 4 },
    ];

    const filterCriteria = { name: 'an' };
    const filteredItems = pipe.transform(items, filterCriteria);

    expect(filteredItems).toEqual([
      { name: 'Banana', price: 1 },
      { name: 'Orange', price: 3 },
    ]);
  });

  it('should filter items by price', () => {
    const items: Item[] = [
      { name: 'Apple', price: 2 },
      { name: 'Banana', price: 1 },
      { name: 'Orange', price: 3 },
      { name: 'Grapes', price: 4 },
    ];

    const filterCriteria = { price: 3 };
    const filteredItems = pipe.transform(items, filterCriteria);

    expect(filteredItems).toEqual([{ name: 'Orange', price: 3 }]);
  });

  it('should filter items by name and price', () => {
    const items: Item[] = [
      { name: 'Apple', price: 2 },
      { name: 'Banana', price: 1 },
      { name: 'Orange', price: 3 },
      { name: 'Grapes', price: 4 },
    ];

    const filterCriteria = { name: 'a', price: 3 };
    const filteredItems = pipe.transform(items, filterCriteria);

    expect(filteredItems).toEqual([{ name: 'Orange', price: 3 }]);
  });

  it('should return an empty array if no items match the criteria', () => {
    const items: Item[] = [
      { name: 'Apple', price: 2 },
      { name: 'Banana', price: 1 },
      { name: 'Orange', price: 3 },
      { name: 'Grapes', price: 4 },
    ];

    const filterCriteria = { name: 'Watermelon', price: 5 };
    const filteredItems = pipe.transform(items, filterCriteria);

    expect(filteredItems).toEqual([]);
  });

  it('should return an empty array if the input array is empty', () => {
    const items: Item[] = [];
    const filterCriteria = { name: 'Apple' };
    const filteredItems = pipe.transform(items, filterCriteria);

    expect(filteredItems).toEqual([]);
  });
});
