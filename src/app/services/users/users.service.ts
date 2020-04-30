import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/UserModel';

const APIURL = environment.apiURL;

const HTTPOPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  users(): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'users', HTTPOPTIONS)
      .pipe(
        tap(_ => this.log('users')),
        catchError(this.handleError('users', []))
      );
  }

  lastUsers(limit = 5): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'users' + '/lasts/' + limit, HTTPOPTIONS)
      .pipe(
        tap(_ => this.log('users')),
        catchError(this.handleError('users', []))
      );
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'users' + '/' + id)
      .pipe(
        tap(_ => this.log('users')),
        catchError(this.handleError('users', []))
      );
  }

  addUser(data): Observable<any> {
    return this.httpClient.post<any>(APIURL + 'users', data)
      .pipe(
        tap(_ => this.log('users')),
        catchError(this.handleError('users', []))
      );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(APIURL + 'users' + '/' + id)
      .pipe(
        tap(_ => this.log('users')),
        catchError(this.handleError('users', []))
      );
  }

  updateUser(id, user): Observable<any> {
    return this.httpClient.put<any>(APIURL + 'users' + '/' + id, user)
      .pipe(
        tap(_ => this.log('users')),
        catchError(this.handleError('users', []))
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
