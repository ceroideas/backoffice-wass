import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BlogModel } from '../../models/BlogModel';

const APIURL = environment.apiURL;

const HTTPOPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '350px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    imageEndPoint: '',
    toolbar: [
        ['bold', 'italic', 'underline'],
    ]
  };

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllBlogs() {
    return this.httpClient.get<any>(APIURL + 'blogs')
      .pipe(
        tap(_ => this.log('blogs')),
        catchError(this.handleError('blogs', []))
      );
  }

  getBlogById(id: string): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'blogs' + '/' + id)
      .pipe(
        tap(_ => this.log('blogs')),
        catchError(this.handleError('blogs', []))
      );
  }

  addBlog(blog): Observable<any> {
    return this.httpClient.post<any>(APIURL + 'blogs', blog)
      .pipe(
        tap(_ => this.log('blogs')),
        catchError(this.handleError('blogs', []))
      );
  }

  deleteBlog(id: string): Observable<any> {
    return this.httpClient.delete<any>(APIURL + 'blogs' + '/' + id)
      .pipe(
        tap(_ => this.log('blogs')),
        catchError(this.handleError('blogs', []))
      );
  }

  updateBlog(_id, blog): Observable<any> {
    return this.httpClient.put<any>(APIURL + 'blogs' + '/' + _id, blog)
      .pipe(
        tap(_ => this.log('blogs')),
        catchError(this.handleError('blogs', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
