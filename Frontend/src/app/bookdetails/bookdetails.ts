import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authservice } from '../authservice';

@Component({
  selector: 'app-bookdetails',
  standalone: true,
  imports: [CommonModule], // ✅ required for *ngIf, etc.
  templateUrl: './bookdetails.html',
  styleUrls: ['./bookdetails.css']
})
export class Bookdetails implements OnInit {
  book: any = null;
  bookId!: number;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: Authservice
  ) {}

  ngOnInit(): void {
    // ✅ Get book ID from route
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Fetch book details from backend
    this.authService.getBookById(this.bookId).subscribe({
      next: (data:any) => {
        this.book = data;
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching book:', err);
        this.errorMessage = 'Book not found or server error.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  onReadNow(book: any) {
    this.router.navigate(['/read', book.bookId]);
  }
}
