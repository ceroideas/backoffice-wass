import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const APIURL = environment.apiURL;

const HTTPOPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

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


  getAllPlaces() {
    return this.httpClient.get<any>(APIURL + 'places')
      .pipe(
        tap(_ => this.log('places')),
        catchError(this.handleError('places', []))
      );
  }

  getPlaceById(id: string): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'places' + '/' + id)
      .pipe(
        tap(_ => this.log('places')),
        catchError(this.handleError('places', []))
      );
  }

  addPlace(blog): Observable<any> {
    return this.httpClient.post<any>(APIURL + 'places', blog)
      .pipe(
        tap(_ => this.log('places')),
        catchError(this.handleError('places', []))
      );
  }

  deletePlace(id: string): Observable<any> {
    return this.httpClient.delete<any>(APIURL + 'places' + '/' + id)
      .pipe(
        tap(_ => this.log('places')),
        catchError(this.handleError('places', []))
      );
  }

  updatePlace(_id, place): Observable<any> {
    return this.httpClient.put<any>(APIURL + 'places' + '/' + _id, place)
      .pipe(
        tap(_ => this.log('places')),
        catchError(this.handleError('places', []))
      );
  }

  /**/

  getAllCommunities() {
    return this.httpClient.get<any>(APIURL + 'communities')
      .pipe(
        tap(_ => this.log('communities')),
        catchError(this.handleError('communities', []))
      );
  }

  getCommunityById(id: string): Observable<any> {
    return this.httpClient.get<any>(APIURL + 'communities' + '/' + id)
      .pipe(
        tap(_ => this.log('communities')),
        catchError(this.handleError('communities', []))
      );
  }

  addCommunity(community): Observable<any> {
    return this.httpClient.post<any>(APIURL + 'communities', community)
      .pipe(
        tap(_ => this.log('communities')),
        catchError(this.handleError('communities', []))
      );
  }

  deleteCommunity(id: string): Observable<any> {
    return this.httpClient.delete<any>(APIURL + 'communities' + '/' + id)
      .pipe(
        tap(_ => this.log('communities')),
        catchError(this.handleError('communities', []))
      );
  }

  updateCommunity(_id, place): Observable<any> {
    return this.httpClient.put<any>(APIURL + 'communities' + '/' + _id, place)
      .pipe(
        tap(_ => this.log('communities')),
        catchError(this.handleError('communities', []))
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
