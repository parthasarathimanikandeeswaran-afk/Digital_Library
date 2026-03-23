import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

 
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/User`, userData);
  }

  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/login`, credentials);
  }


  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Books`);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Books/${id}`);
  }

  
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Categories`);
  }

  
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/User`);
  }

  
  setLogin(email: string) {
   
    this.cookieService.set('userEmail', email, { expires: 1, path: '/' });
  }

  
  getUserEmail(): string {
    return this.cookieService.get('userEmail');
  }

  
  isLoggedIn(): boolean {
    return this.cookieService.check('userEmail');
  }

  
  logout() {
    this.cookieService.delete('userEmail', '/');
  }



  getBooksByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/books/category/${categoryId}`);
}


}
