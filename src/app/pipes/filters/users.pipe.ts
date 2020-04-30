import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results = [];
    if (arg === undefined || arg === '') { return value; }

    for (const user of value) {
      if (user.firstName.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      user.email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        results.push(user);
      }
    }
    return results;
  }
}
