"use client";

import { useEffect, useState } from "react";
import { getBooksByCategory, searchBooks } from "../services/book.service";
import BookDetailModal from "../components/BookDetailModal";
import CardBook from "../components/CardBook";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Fantasy", "Literature", "Mystery", "Sci-Fi", "Romance"];

  useEffect(() => {
    loadBooks(activeCategory);
  }, [activeCategory]);

  const loadBooks = async (category) => {
    setLoading(true);
    const data = await getBooksByCategory(category);
    setBooks(data);
    setLoading(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    const data = await searchBooks(searchQuery);
    setBooks(data);
    setLoading(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleViewMore = (book) => {
    window.location.href = `/book-detail?id=${encodeURIComponent(book.id)}`;
  };

  return (
    <div className="min-h-screen bg-white font-[Poppins,Arial,Helvetica,sans-serif] transition-[background] duration-300">
      <Navbar isLoggedIn={true} userName="Mitha"/>

      {/* Main Content */}
      <main className="py-[60px] min-h-[calc(100vh-200px)]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-light text-[var(--text-primary)] mb-[15px] font-serif">
              Book Catalog
            </h1>
            <p className="text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.6] text-base">
              Explore our collection of books across different genres
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <form onSubmit={handleSearch} className="flex gap-3 !bg-transparent !border-0 !p-0 !shadow-none">
              <input
                type="text"
                placeholder="Search books by title, author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-[50px] my-[30px] mx-6 mb-10 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`py-3 px-[35px] text-sm cursor-pointer transition-all duration-300 rounded-[25px] font-medium tracking-[0.5px] border-2 ${
                  activeCategory === category
                    ? 'bg-[#d95140] text-white border-[#d95140] font-semibold shadow-[0_4px_12px_rgba(217,81,64,0.3)] -translate-y-0.5 hover:bg-[#c44434] hover:border-[#c44434] hover:shadow-[0_6px_16px_rgba(217,81,64,0.4)] hover:-translate-y-1'
                    : 'bg-white border-[#e0e0e0] text-[#666] hover:border-[#f7cac4] hover:text-[#d95140] hover:bg-[#fff9f8]'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* divider */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent my-[30px]"></div>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-[#999] text-base py-[60px]">
              Loading books...
            </p>
          )}

          {/* Books Grid */}
          {!loading && (
            <div className="grid grid-cols-5 !gap-6 mt-10 max-[1024px]:grid-cols-4 max-[768px]:grid-cols-3 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
              {books.length > 0 ? (
                books.map((book) => (
                  <CardBook 
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                  >
                    <CardBook.Header image={book.image} />
                    <CardBook.Body author={book.author} title={book.title} />
                    <CardBook.Footer 
                      rating={book.rating}
                      book={book}
                      handleAddFavorite={() => {}}
                      showFavoriteButton={false}
                    />
                  </CardBook>
                ))
              ) : (
                <p className="text-center text-[#666] text-lg py-[60px] col-span-full">
                  No books found in this category
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onViewMore={handleViewMore}
      />
      
      <Footer/>
    </div>
  );
}