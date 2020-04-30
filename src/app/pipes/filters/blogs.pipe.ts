import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blogs'
})
export class BlogsPipe implements PipeTransform {

  transform(value: any, arg: any, type = 'blogs'): any {
    
    const results = [];

    if (type == 'blogs') {
      if (arg === undefined || arg === '') { return value; }

      for (const blog of value) {
        if (blog.title.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          results.push(blog);
        }
      }
    }else{
      if (arg === undefined || arg === '') { return value; }

      for (const blog of value) {
        if (blog.street.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          results.push(blog);
        }
      }
    }
    return results;

  }
}
