import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

enum SectionNames {
  PROPERTY = 'Property',
  VALIDATION = 'Validation',
  SCORING = 'Scoring',
  HEALTH_ATTRIBUTES = 'Health Attributes',
}

@Pipe({
  name: 'expandedPanel',
})
export class ExpandedPanelPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(fields: FormlyFieldConfig[], type: string): FormlyFieldConfig[] {
    const baseFields: FormlyFieldConfig = {
      type: 'expansion-panel',
      props: { label: '' },
      fieldGroup: [
        {
          props: { label: `${type} ${SectionNames.PROPERTY}` },
          fieldGroup: [
            {
              key: 'props',
              props: { rowNumber: 2 },
              fieldGroup: [],
            },
          ],
        },
        {
          props: { label: SectionNames.VALIDATION },
          fieldGroup: [
            {
              key: 'props',
              props: { rowNumber: 2 },
              fieldGroup: [],
            },
          ],
        },
        {
          props: { label: SectionNames.SCORING },
          fieldGroup: [
            {
              key: 'props',
              props: { rowNumber: 2 },
              fieldGroup: [],
            },
          ],
        },
        {
          props: { label: SectionNames.HEALTH_ATTRIBUTES },
          fieldGroup: [
            {
              key: 'props',
              props: { rowNumber: 2 },
              fieldGroup: [],
            },
          ],
        },
      ],
    };

    const newBaseFields = JSON.parse(
      JSON.stringify(baseFields)
    ) as FormlyFieldConfig;

    fields.forEach((field) => {
      field.key === 'props'
        ? newBaseFields.fieldGroup?.forEach((group) =>
            field.fieldGroup?.forEach((input) => {
              group?.props?.label?.includes(input?.props?.['section']) &&
                group?.fieldGroup?.[0].fieldGroup?.push(input);
            })
          )
        : newBaseFields.fieldGroup?.forEach(
            (group) =>
              group?.props?.label?.includes(field?.props?.['section']) &&
              group?.fieldGroup?.push(field)
          );
    });

    newBaseFields.fieldGroup?.forEach((group) => {
      group.fieldGroup
        ?.sort((a, b) => {
          return a.props?.['rowNumber'] - b.props?.['rowNumber'];
        })
        .forEach((fg) => {
          fg.fieldGroup?.sort((a, b) => {
            return a.props?.['rowNumber'] - b.props?.['rowNumber'];
          });
        });
    });

    return [newBaseFields];
  }
}
