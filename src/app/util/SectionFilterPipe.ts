import {Pipe, PipeTransform} from '@angular/core';
import {Section} from '../model/Section';

@Pipe({
  name: 'sectionFilter',
  pure: false
})
export class SectionFilterPipe implements PipeTransform {
  transform(value: Section[], v: string): Section[] {
    if (!value) {
      return [];
    }
    return value.filter(section => section.title.toLowerCase().startsWith(v.toLowerCase()));
  }

}
