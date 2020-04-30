import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comments'
})
export class CommentsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results = [];
    if (arg === undefined || arg === '') { return value; }

    for (const comment of value) {
      if (comment.comment.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      comment.location.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        results.push(comment);
      }
    }
    return results;
  }
}
