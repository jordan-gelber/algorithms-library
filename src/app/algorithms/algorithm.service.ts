import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Algorithm } from './algorithm';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  private algorithmsUrl = 'api/algorithms'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET: get algorithm by id. Will 404 if id not found */
  getAlgorithm(id: string): Observable<Algorithm> {
    const url = `${this.algorithmsUrl}/${id}`;
    return this.http.get<Algorithm>(url).pipe(
      tap(_ => this.log(`fetched algorithm id = ${id}`)),
      catchError(this.handleError<Algorithm>(`getAlgorithm id = ${id}`))
    );
  }

  /** GET: get algorithm by name. Will 404 if id not found */
  getAlgorithmByName(name: string): Observable<Algorithm> {
    const url = `${this.algorithmsUrl}/${name}`;
    return this.http.get<Algorithm>(url).pipe(
      tap(_ => this.log(`fetched algorithm name ${name}`)),
      catchError(this.handleError<Algorithm>(`getAlgorithmByName ${name}`))
    );
  }

  /** GET: get list of all algorithms from the server */
  getAlgorithms(): Observable<Algorithm[]> {
    return this.http.get<Algorithm[]>(this.algorithmsUrl).pipe(
      tap(_ => this.log('fetched algorithms')),
      catchError(this.handleError<Algorithm[]>('getAlgorithms', []))
    );
  }

  /** GET: get list of algorithms whose name contains a search term */
  searchAlgorithms(term: string): Observable<Algorithm[]> {
    if(!term.trim()) { // if no search term, return empty algorithm array
      return of([]);
    }
    return this.http.get<Algorithm[]>(`${this.algorithmsUrl}/?title=${term}`)
      .pipe(tap(x => x.length ?
          this.log(`found algorithms matching "${term}"`) :
          this.log(`no algorithms found matching "${term}"`)),
        catchError(this.handleError<Algorithm[]>('searchAlgorithms', []))
      );
  }

  /** GET: get list of algorithms filtered by group */
  filterAlgorithms(group: string): Observable<Algorithm[]> {
    return this.http.get<Algorithm[]>(`${this.algorithmsUrl}/?group=${group}`)
      .pipe(tap(x => x.length ?
        this.log(`algorithms under "${group}" group`) :
        this.log(`no algorithms found under "${group}" group`)),
      catchError(this.handleError<Algorithm[]>('filterAlgorithms', []))
    );
  }

  /** PUT: update algorithm on the server */
  updateAlgorithm(algorithm: Algorithm): Observable<any> {
    const url = `${this.algorithmsUrl}/${algorithm._id}`;
    return this.http.put(url, algorithm, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated algorithm id = ${algorithm._id}`)),
        catchError(this.handleError<any>('updateAlgorithm'))
      );
  }

  /** POST: add a new algorithm to the server */
  addAlgorithm(algorithm: Algorithm): Observable<Algorithm> {
    return this.http.post<Algorithm>(this.algorithmsUrl, algorithm, this.httpOptions)
      .pipe(
        tap((alg: Algorithm) => this.log(`added algorithm id = ${alg._id}`)),
        catchError(this.handleError<Algorithm>('addAlgorithm'))
      );
  }

  /** DELETE: delete algorithm from the server */
  deleteAlgorithm(algorithm: Algorithm | number): Observable<Algorithm> {
    const id = typeof algorithm === 'number' ? algorithm : algorithm._id;
    const url = `${this.algorithmsUrl}/${id}`;

    return this.http.delete<Algorithm>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted algorithm id = ${id}`)),
      catchError(this.handleError<Algorithm>('deleteAlgorithm'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by retuning an empty result
      return of(result as T);
    };
  }

  /** Send a AlgorithmService message with the MessageService */
  private log(message: string) {
    console.log(`AlgorithmService: ${message}`);
  }
}
