import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weatherforecast {
  constructor() { }
  private http=inject(HttpClient);
  private apiUrl=environment.apiUrl+'/weatherforecast';

  public get():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
