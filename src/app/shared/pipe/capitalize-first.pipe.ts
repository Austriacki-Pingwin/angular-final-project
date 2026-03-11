import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
  public transform(str: string): string {
    if (!str) {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
