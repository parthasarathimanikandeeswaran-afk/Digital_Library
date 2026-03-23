import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  searchText = '';
  selectedCategoryId: number | '' = ''; 
  categories: any[] = [];
  books: any[] = [];
  filteredBooks: any[] = [];
  userEmail = '';

  constructor(private router: Router, private auth: Authservice) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userEmail = this.auth.getUserEmail();
    this.loadBooks();
    this.loadCategories();
  }


  loadBooks() {
    this.auth.getBooks().subscribe({
      next: (data: any[]) => {
        this.books = data;
        this.filteredBooks = [...this.books];
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }


  loadCategories() {
    this.auth.getCategories().subscribe({
      next: (data: any[]) => {
        console.log('📘 Categories from API:', data);
        this.categories = data; 
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  applyFilters() {
    const text = this.searchText.toLowerCase();

    this.filteredBooks = this.books.filter((book) => {
      const matchesText =
        book.title.toLowerCase().includes(text) ||
        book.author.toLowerCase().includes(text);

      const matchesCategory =
        this.selectedCategoryId === '' ||
        book.categoryId === Number(this.selectedCategoryId);

      return matchesText && matchesCategory;
    });
  }

 
  onReadNow(book: any) {
    this.router.navigate(['/book', book.bookId]);
  }


  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
