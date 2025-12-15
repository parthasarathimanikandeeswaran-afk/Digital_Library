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
  selectedCategoryId: number | '' = ''; // ✅ Use CategoryId
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

  // ✅ Load all books
  loadBooks() {
    this.auth.getBooks().subscribe({
      next: (data: any[]) => {
        this.books = data;
        this.filteredBooks = [...this.books];
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  // ✅ Load all categories
  loadCategories() {
    this.auth.getCategories().subscribe({
      next: (data: any[]) => {
        console.log('📘 Categories from API:', data);
        this.categories = data; // keep full { categoryId, categoryName }
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  // ✅ Apply both search and category filters
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

  // ✅ View details
  onReadNow(book: any) {
    this.router.navigate(['/book', book.bookId]);
  }

  // ✅ Logout
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
