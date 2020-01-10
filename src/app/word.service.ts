import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Word } from './word';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WordService {

  // private wordsUrl = 'http://localhost:5000/words'; // URL to words we are to learn
  // private learnedWordsUrl = 'http://localhost:5000/learned'; // URL to words we learned
  // private backendUrl = 'http://localhost:5000';
  private backendUrl = 'https://words-backend-romank.appspot.com';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getWords(): Observable<Word[]> {
    // TODO: send the message _after_ fetching the words
    return this.http.get<Word[]>(`${this.backendUrl}/words`)
      .pipe(
        tap(_ => this.log('fetched words')),
        catchError(this.handleError<Word[]>('getWords', []))
    );
  }

  /** PUT: Send the word, which we have just learnt, to the server */
  putLearnedWord(word: Word): Observable<any> {
    return this.http.put(`${this.backendUrl}/learned`, word, this.httpOptions).pipe(
      catchError(this.handleError<any>('learnWord'))
    );
  }

  /** GET word by id. Return `undefined` when id not found */
  getWordNo404<Data>(id: number): Observable<Word> {
    const url = `${this.backendUrl}/words/?id=${id}`;
    return this.http.get<Word[]>(url)
      .pipe(
        map(words => words[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} word id=${id}`);
        }),
        catchError(this.handleError<Word>(`getWord id=${id}`))
      );
  }

  /** GET word by id. Will 404 if id not found */
  getWord(id: number): Observable<Word> {
    const url = `${this.backendUrl}/words/${id}`;
    return this.http.get<Word>(url).pipe(
      tap(_ => this.log(`fetched word id=${id}`)),
      catchError(this.handleError<Word>(`getWord id=${id}`))
    );
  }

  /* GET words whose name contains search term */
  findByName(term: string): Observable<Word[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    // return this.http.get<Word[]>(`${this.wordsUrl}/?name=${term}`).pipe(
    return this.http.get<Word[]>(`${this.backendUrl}/words/findByName/${term}`).pipe(
      tap(_ => this.log(`found words matching "${term}"`)),
      catchError(this.handleError<Word[]>('searchWords', []))
    );
  }

  /* !!! TODO: I modified the server logic, so below methods do not work anymore !!!
    Need to invent relevant logic */

  /** PUT: update the word on the server */
  updateWord(word: Word): Observable<any> {
    return this.http.put(`${this.backendUrl}/words`, word, this.httpOptions).pipe(
      tap(_ => this.log(`updated word id=${word.id}`)),
      catchError(this.handleError<any>('updateWord'))
    );
  }

  /** POST: add a new word to the server */
  addWord(word: Word): Observable<Word> {
    return this.http.post<Word>(`${this.backendUrl}/words`, word, this.httpOptions).pipe(
      tap((newWord: Word) => this.log(`added word w/ id=${newWord.id}`)),
      catchError(this.handleError<Word>('addWord'))
    );
  }

  /** DELETE: delete the word from the server */
  deleteWord(word: Word | number): Observable<Word> {
    const id = typeof word === 'number' ? word : word.id;
    const url = `${this.backendUrl}/words/${id}`;

    return this.http.delete<Word>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted word id=${id}`)),
      catchError(this.handleError<Word>('deleteWord'))
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

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`WordService: ${message}`);
  }
}
