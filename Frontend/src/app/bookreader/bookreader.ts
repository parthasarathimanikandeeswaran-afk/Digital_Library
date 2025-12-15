import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Authservice } from '../authservice'; // ✅ your existing service

@Component({
  selector: 'app-bookreader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookreader.html',
  styleUrls: ['./bookreader.css']
})
export class Bookreader implements OnInit {
  pdfUrl!: SafeResourceUrl;
  pdfLink!: string;
  bookTitle: string = '';
  bookId!: number;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: Authservice
  ) {}

  ngOnInit(): void {
    // ✅ Get book ID from route
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Fetch book details by ID
    this.authService.getBookById(this.bookId).subscribe({
      next: (book:any) => {
        if (book) {
          this.bookTitle = book.title;
          this.pdfLink = book.pdfUrl;
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(book.pdfUrl);
        } else {
          this.errorMessage = 'Book not found.';
        }
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching book:', err);
        this.errorMessage = 'Unable to load book details.';
        this.loading = false;
      }
    });
  }

  // ✅ Open PDF in new tab
  downloadPdf() {
    if (this.pdfLink) {
      window.open(this.pdfLink, '_blank');
    }
  }

  // ✅ Back to book details
  goBack() {
    this.router.navigate(['/book', this.bookId]);
  }
}
