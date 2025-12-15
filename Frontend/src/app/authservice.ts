import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private apiUrl = environment.apiUrl; // ✅ backend URL

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // 🧑 Register User
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/User`, userData);
  }

  // 🔐 Login User
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/login`, credentials);
  }

  // 📚 Get all books
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Books`);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Books/${id}`);
  }

  // 🗂 Get categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Categories`);
  }

  // 👤 Get all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/User`);
  }

  // ==============================
  // ✅ COOKIE LOGIN MANAGEMENT
  // ==============================

  // Save user email after login
  setLogin(email: string) {
    // Cookie expires in 1 day
    this.cookieService.set('userEmail', email, { expires: 1, path: '/' });
  }

  // Get current logged-in user's email
  getUserEmail(): string {
    return this.cookieService.get('userEmail');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.cookieService.check('userEmail');
  }

  // Logout (remove cookie)
  logout() {
    this.cookieService.delete('userEmail', '/');
  }



  getBooksByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/books/category/${categoryId}`);
}


}
