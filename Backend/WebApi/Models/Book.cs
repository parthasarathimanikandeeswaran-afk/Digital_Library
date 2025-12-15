namespace WebApi.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string PdfUrl { get; set; } = string.Empty;
        public int CategoryId { get; set; }
    }
}
