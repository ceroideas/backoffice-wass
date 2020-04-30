import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AreaModel } from '../../models/AreaModel';

const APIURL = environment.apiURL;

const HTTPOPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllAreas() {
    return this.httpClient.get<any>(APIURL + 'areas')
      .pipe(
        tap(_ => this.log('areas')),
        catchError(this.handleError('areas', []))
      );
  }

  getAreaById(id: string) {
    return this.httpClient.get<AreaModel>(APIURL + 'areas' + '/' + id)
      .pipe(
        tap(_ => this.log('areas')),
        catchError(this.handleError('areas', []))
      );
  }

  addArea(area: AreaModel) {
    return this.httpClient.post(APIURL + 'areas', area)
      .pipe(
        tap(_ => this.log('areas')),
        catchError(this.handleError('areas', []))
      );
  }

  deleteArea(id: string) {
    return this.httpClient.delete(APIURL + 'areas' + '/' + id)
      .pipe(
        tap(_ => this.log('areas')),
        catchError(this.handleError('areas', []))
      );
  }

  updateArea(area: AreaModel) {
    return this.httpClient.put(APIURL + 'areas' + '/' + area._id, area)
      .pipe(
        tap(_ => this.log('areas')),
        catchError(this.handleError('areas', []))
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
