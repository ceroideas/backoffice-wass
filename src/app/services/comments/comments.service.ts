import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CommentModel } from '../../models/CommentModel';

const APIURL = environment.apiURL;

const HTTPOPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getAllComments(): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'comments')
      .pipe(
        tap(_ => this.log('comments')),
        catchError(this.handleError('comments', []))
      );
  }

  getCommentById(id: string): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'comments' + '/' + id)
      .pipe(
        tap(_ => this.log('comments')),
        catchError(this.handleError('comments', []))
      );
  }

  lastComments(limit = 2): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'comments' + '/lasts/' + limit, HTTPOPTIONS)
      .pipe(
        tap(_ => this.log('comments')),
        catchError(this.handleError('comments', []))
      );
  }

  addComment(comment): Observable<any> {
    return this.httpClient.post<any>(APIURL + 'comments', comment)
      .pipe(
        tap(_ => this.log('comments')),
        catchError(this.handleError('comments', []))
      );
  }

  deleteComment(id: string): Observable<any> {
    return this.httpClient.delete<any>(APIURL + 'comments' + '/' + id)
      .pipe(
        tap(_ => this.log('comments')),
        catchError(this.handleError('comments', []))
      );
  }

  updateComment(id, comment) {
    return this.httpClient.put<any>(APIURL + 'comments' + '/' + id, comment)
      .pipe(
        tap(_ => this.log('comments')),
        catchError(this.handleError('comments', []))
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
