import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
  transform(value): any {
    const values = [];
    for (const key in value) {
      values.push(value[key]);
    }
    return values;
  }
}
