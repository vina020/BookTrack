"use client";

import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";
import BookDetailModal from "../app/components/BookDetailModal";
import { useRouter } from "next/router";
import { FaHeart, FaClock, FaTimes, FaSearch } from "react-icons/fa";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import CardBook from "../app/components/CardBook";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Favorites() {
    const { favorites, removeFromFavorites } = useFavorites();
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState("recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const router = useRouter();

    const categories = ["All", "Fantasy", "Literature", "Mystery", "Sci-Fi", "Romance"];

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleViewMore = (book) => {
        setIsModalOpen(false);
        router.push(`/book-detail?id=${encodeURIComponent(book.id)}`);
    };

    const handleRemove = (e, bookId) => {
        e.stopPropagation();
        if (confirm("Remove this book from favorites?")) {
            removeFromFavorites(bookId);
        }
    };

    const handleClearAll = () => {
        if (confirm(`Remove all ${favorites.length} books from favorites?`)) {
            favorites.forEach(book => removeFromFavorites(book.id));
        }
    };

    const getFilteredAndSortedFavorites = () => {
        let filtered = [...favorites];

        if (searchQuery) {
            filtered = filtered.filter(book => 
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            filtered = filtered.filter(book => 
                book.subjects?.some(subject => 
                    subject.toLowerCase().includes(selectedCategory.toLowerCase())
                )
            );
        }

        if (sortBy === "title") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "author") {
            filtered.sort((a, b) => a.author.localeCompare(b.author));
        }

        return filtered;
    };

    const filteredFavorites = getFilteredAndSortedFavorites();

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] font-[Poppins,Arial,Helvetica,sans-serif] transition-[background] duration-300">
            <Navbar/>
            
            {/* Hero Section */}
            <section className="relative h-[300px] banner-gradient overflow-hidden max-[1024px]:h-[450px] max-[768px]:h-[500px] min-[600px]:max-[900px]:h-[420px] max-[480px]:h-[480px]">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover opacity-[0.15]"></div>
                
                <div className="relative z-[2] h-full flex flex-col justify-center py-[60px_0_40px]">
                    <div className="max-w-[1200px] mx-auto px-5">
                        <div className="text-center mb-10">
                            <h1 className="text-5xl font-bold text-white m-0 mb-[15px] [text-shadow:0_2px_10px_rgba(0,0,0,0.2)] font-[Georgia,serif] max-[1024px]:text-[40px] max-[768px]:text-[32px] min-[600px]:max-[900px]:text-4xl max-[480px]:text-[28px]">
                                My Favorite Collection
                            </h1>
                            <p className="text-lg text-[rgba(255,255,255,0.95)] m-0 font-light [text-shadow:0_1px_5px_rgba(0,0,0,0.1)] max-[768px]:text-base max-[480px]:text-sm">
                                Discover and explore your carefully curated collection of beloved books
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="py-[40px_0_60px] min-h-[calc(100vh-500px)]">
                <div className="max-w-[1200px] mx-auto px-5">
                    {/* Stats Bar */}
                        {favorites.length > 0 && (
                            <div className="favorites-stats-section">
                                <div className="favorites-stats-container">
                                    
                                    {/* Stats Counter */}
                                    <div className="favorites-stats-counter">
                                        <div className="favorites-count-badge">
                                            <FaHeart size={20} />
                                            {filteredFavorites.length} of {favorites.length} {favorites.length === 1 ? 'Book' : 'Books'}
                                        </div>
                                        {searchQuery && (
                                            <span className="favorites-search-query">
                                                matching "{searchQuery}"
                                            </span>
                                        )}
                                    </div>

                                    {/* Category Tabs */}
                                    <div className="favorites-category-tabs">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                className={`favorites-category-btn ${selectedCategory === category ? 'active' : ''}`}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Sort & Clear */}
                                    <div className="favorites-actions">
                                        <select 
                                            className="favorites-sort-select"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="recent">Recently Added</option>
                                            <option value="title">Title (A-Z)</option>
                                            <option value="author">Author (A-Z)</option>
                                        </select>

                                        <button 
                                            className="favorites-clear-btn"
                                            onClick={handleClearAll}
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Empty State */}
                    {favorites.length === 0 ? (
                        <div className="text-center py-20 px-5 bg-[var(--card-bg)] rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.08)] mt-[30px] max-[480px]:py-[60px_20px]">
                            <div className="text-[80px] mb-5 opacity-30 max-[480px]:text-[60px]">
                                <HeartIcon className="w-20 h-20 text-gray-400 max-[480px]:w-16 max-[480px]:h-16" />
                            </div>
                            <h2 className="text-2xl text-[var(--text-primary)] mb-[15px] font-semibold">No favorites yet</h2>
                            <p className="text-[15px] text-[var(--text-secondary)] mb-[30px] leading-[1.6]">
                                Start building your collection by adding books you love
                            </p>
                            <a 
                                href="/catalog" 
                                className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none py-[14px] px-[35px] rounded-[25px] text-sm font-semibold cursor-pointer transition-all duration-300 no-underline inline-block shadow-[0_5px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(102,126,234,0.5)]"
                            >
                                Browse Catalog
                            </a>
                        </div>
                    ) : filteredFavorites.length === 0 ? (
                        <div className="text-center py-20 px-5 bg-white rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.08)] mt-[30px] max-[480px]:py-[60px_20px]">
                            <div className="text-[80px] mb-5 opacity-30 max-[480px]:text-[60px]">🔍</div>
                            <h2 className="text-2xl text-[#333] mb-[15px] font-semibold">No books found</h2>
                            <p className="text-[15px] text-[#999] mb-[30px] leading-[1.6]">
                                Try adjusting your search or category filter
                            </p>
                            <button 
                                className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none py-[14px] px-[35px] rounded-[25px] text-sm font-semibold cursor-pointer transition-all duration-300 shadow-[0_5px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(102,126,234,0.5)]"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Favorites Grid */}
                            <div className="grid grid-cols-5 gap-6 mt-0 max-[1024px]:grid-cols-4 max-[768px]:grid-cols-3 min-[600px]:max-[900px]:grid-cols-2 max-[480px]:grid-cols-2 max-[480px]:gap-4">
                                {filteredFavorites.map((book) => (
                                    <div key={book.id} className="relative group">
                                        {/* Remove Button - Di luar CardBook biar tetap di pojok */}
                                        <button 
                                            className="absolute top-2.5 right-2.5 bg-[rgba(217,81,64,0.95)] text-white border-none w-8 h-8 rounded-full text-lg cursor-pointer flex items-center justify-center opacity-0 transition-all duration-300 z-10 shadow-[0_2px_8px_rgba(0,0,0,0.2)] group-hover:opacity-100 hover:bg-[#c44434] hover:scale-[1.15]"
                                            onClick={(e) => handleRemove(e, book.id)}
                                            title="Remove from favorites"
                                        >
                                            <FaTimes />
                                        </button>

                                        <CardBook onClick={() => handleBookClick(book)}>
                                            <CardBook.Header image={book.image} />
                                            <CardBook.Body author={book.author} title={book.title} />
                                            
                                            {/* Custom Footer dengan rating + tanggal */}
                                            <div className="py-4 flex flex-col gap-1">
                                            <p className="text-[#d95140] font-bold text-lg">
                                                {book.rating}
                                            </p>

                                            <div className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
                                                <FaClock size={10} />
                                                Added to favorites
                                            </div>
                                            </div>

                                        </CardBook>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Modal */}
            <BookDetailModal
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onViewMore={handleViewMore}
            />
            <Footer/>
        </div>
    );
}