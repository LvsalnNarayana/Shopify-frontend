import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }
  get(url: string) {
    return new Observable((Subscriber: any) => {
      this.http.get(url, {withCredentials: true }).pipe(
        catchError(error => {
          Subscriber.next(error);
          return [error];
        })
      ).subscribe((data: any) => {
        Subscriber.next(data);
      })
    })

  }
}
