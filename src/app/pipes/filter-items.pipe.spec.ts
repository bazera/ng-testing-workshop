import { TestBed } from '@angular/core/testing';
import { FilterItemsPipe, Item } from './filter-items.pipe';

describe('FilterItemsPipe', () => {
  let pipe: FilterItemsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [FilterItemsPipe],
    }).compileComponents();

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

    const result = pipe.transform(items, filterCriteria);

    expect(result).toEqual([
      { name: 'Banana', price: 1 },
      { name: 'Orange', price: 3 },
    ]);
  });
});
