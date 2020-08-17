import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(
    private loggerService: LoggerService,
    private httpClient: HttpClient
  ) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log('http call');
    return this.httpClient.get<Book[]>('/api/books');
    // return allBooks;
  }

  getBookById(id: number): Observable<Book> {
    const httpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'aniket'
    });
    return this.httpClient
      .get<Book>(`/api/books/${id}`, {
        headers: httpHeaders
      })
      .pipe(
        map(result => new Book())
      );
    // return allBooks.find(book => book.bookID === id);
  }
}
