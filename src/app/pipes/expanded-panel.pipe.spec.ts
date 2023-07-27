import { TestBed } from '@angular/core/testing';
import { ExpandedPanelPipe } from './expanded-panel.pipe';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DatePipe } from '@angular/common';

describe('ExpandedPanelPipe', () => {
  let pipe: ExpandedPanelPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpandedPanelPipe, DatePipe],
    });

    pipe = TestBed.inject(ExpandedPanelPipe);
  });

  it('should transform fields correctly for type "Foo"', () => {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'props',
        props: { section: 'property' },
        fieldGroup: [{ key: 'name', type: 'input' }],
      },
      {
        key: 'props',
        props: { section: 'validation' },
        fieldGroup: [{ key: 'required', type: 'checkbox' }],
      },
    ];

    const transformedFields = pipe.transform(fields, 'Foo');

    expect(transformedFields).toEqual([
      {
        type: 'expansion-panel',
        props: { label: '' },
        fieldGroup: [
          {
            props: { label: 'Foo Property' },
            fieldGroup: [
              { key: 'props', props: { rowNumber: 2 }, fieldGroup: [] },
            ],
          },
          {
            props: { label: 'Validation' },
            fieldGroup: [
              { key: 'props', props: { rowNumber: 2 }, fieldGroup: [] },
            ],
          },
          {
            props: { label: 'Scoring' },
            fieldGroup: [
              { key: 'props', props: { rowNumber: 2 }, fieldGroup: [] },
            ],
          },
          {
            props: { label: 'Health Attributes' },
            fieldGroup: [
              { key: 'props', props: { rowNumber: 2 }, fieldGroup: [] },
            ],
          },
        ],
      },
    ]);
  });
});
