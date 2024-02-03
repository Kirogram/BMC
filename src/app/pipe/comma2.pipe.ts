import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'comma2'
})
export class Comma2Pipe implements PipeTransform {

  transform(key: any): string {
    if (key === 0) {
      key = '0';
    } else if (key === ' ') {
      key = null;
    }
    const account = key ? key.toString() : '없음';
    account.replace(/,/g, '');
    return account.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
