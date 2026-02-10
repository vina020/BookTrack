"use client";
import { useEffect, useState } from "react";
import { getBooks, getBooksByCategory } from "../services/book.service";
import CardBook from "../components/CardBook";
import { bookQuotes } from "../services/quote";
import QuoteCard from "../components/QuoteCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import BookDetailModal from "../components/BookDetailModal";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuote, setCurrentQuote] = useState(null);
    
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [bannerBooks, setBannerBooks] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const { addToFavorites } = useFavorites();
    
    const handleAddFavorite = (book) => {
        addToFavorites({
            id: book.id,
            title: book.title,
            author: book.author,
            image: book.image,
            rating: book.rating,
            subjects: book.subjects || [],
            first_publish_year: book.first_publish_year
        });
    };

    useEffect(() => {
        async function loadBooks() {
            setLoading(true);
            const data = await getBooks();
            setBooks(data);
            
            if (data.length > 0) {
                setBannerBooks(data.slice(0, 3));
            }
            
            setLoading(false);
        }
        loadBooks();

        const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
        setCurrentQuote(randomQuote);
    }, []);

    useEffect(() => {
        if (bannerBooks.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % bannerBooks.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [bannerBooks]);

    useEffect(() => {
        async function loadFeaturedBooks() {
            setLoadingFeatured(true);
            const data = await getBooksByCategory(selectedCategory);
            setFeaturedBooks(data);
            setLoadingFeatured(false);
        }
        loadFeaturedBooks();
    }, [selectedCategory]);

    const getNextQuote = () => {
        const newQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
        setCurrentQuote(newQuote);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleNextBanner = () => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerBooks.length);
    };

    const handlePrevBanner = () => {
        setCurrentBannerIndex((prev) => (prev - 1 + bannerBooks.length) % bannerBooks.length);
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
        router.push(`/book/${book.id}`);
    };

    const categories = ["All", "Fantasy", "Literature", "Mystery", "Sci-Fi", "Romance"];

    const currentBannerBook = bannerBooks[currentBannerIndex];

    return (
        <div className="min-h-screen bg-[#ffffff] dark:bg-[#1a1a1a] font-[Poppins,Arial,Helvetica,sans-serif] transition-colors duration-300">
            <Navbar />
            
            {/* Banner Section */}
            <section className="banner-gradient py-20 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="flex items-center gap-[60px] max-md:flex-col">
                        {/* Banner Image */}
                        <div className="flex-1 relative flex justify-center mt-20">
                            {currentBannerBook?.image ? (
                                <img 
                                    src={currentBannerBook.image} 
                                    alt={currentBannerBook.title}
                                    className="w-[280px] h-[400px] object-cover rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                                />
                            ) : (
                                <div className="relative z-[2]">
                                    <div className="w-[280px] h-[380px] bg-[#f9eac2] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center p-[30px] relative">
                                        <p className="text-lg text-[#c4a574] mb-2.5 font-serif">Author</p>
                                        <h2 className="text-4xl font-serif text-[#c4a574] text-center my-5 leading-tight">Book Title</h2>
                                        <div className="text-[60px] mt-5">📚</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Banner Text */}
                        <div className="flex-1">
                            <p className="text-xs text-[var(--text-secondary)] tracking-[2px] mb-[15px]">FEATURED BOOK</p>
                            <h1 className="text-5xl text-[var(--text-primary)] mb-5 leading-tight font-serif max-md:text-4xl">
                                {currentBannerBook?.title || 'Loading...'}
                            </h1>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-[30px] max-w-[450px]">
                                By {currentBannerBook?.author || 'Unknown Author'}
                            </p>
                            <button 
                                className="bg-[#d95140] text-white border-none py-[15px] px-[35px] text-sm tracking-[1px] cursor-pointer transition-colors duration-300 font-medium hover:bg-[#c44434]"
                                onClick={() => router.push(`/book/${currentBannerBook?.id}`)}
                            >
                                READ MORE
                            </button>
                        </div>
                    </div>
                    
                    {/* Carousel Dots */}
                    <div className="flex justify-center gap-2.5 mt-[30px]">
                        {bannerBooks.map((_, index) => (
                            <button
                                key={index}
                                className={`h-3 border-none cursor-pointer transition-all duration-300 rounded-full ${
                                    index === currentBannerIndex 
                                        ? 'bg-[var(--accent-pink)] w-[30px] rounded-md' 
                                        : 'bg-white/50 w-3'
                                }`}
                                onClick={() => setCurrentBannerIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Release Section */}
            <section className="py-[60px] bg-[var(--bg-primary)]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-14 lg:px-16">
                    {/* Section Header */}
                    <div className="mb-14 text-center">
                        <h2 className="text-4xl font-light text-[var(--text-primary)] mb-[15px] font-serif items-center">
                            New Release Books
                        </h2>
                        <p className="text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed mt-1">
                            Discover the latest additions to our collection
                        </p>
                    </div>
                    
                    {loading && (
                        <p className="text-center text-[var(--text-secondary)] text-base py-10">
                            Loading books...
                        </p>
                    )}
                    
                    {/* Books Grid - Horizontal Scroll */}
                    <div className="overflow-x-auto pb-5 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[#d95140] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb:hover]:bg-[#c44434]">
                    <div className="flex gap-12 mt-10 px-6 scroll-smooth">
                        {books.length > 0 &&
                            books.slice(0, 10).map((book) => (
                                <CardBook 
                                    key={book.id}
                                    onClick={() => handleBookClick(book)}
                                >
                                    <CardBook.Header image={book.image} />
                                    <CardBook.Body author={book.author} title={book.title} />
                                    <CardBook.Footer 
                                        rating={book.rating}
                                        book={book}
                                        handleAddFavorite={handleAddFavorite}
                                    />
                                </CardBook>
                            ))}
                            </div>
                    </div>
                    
                    {/* View All Button */}
                    <div className="mt-12 text-center">
                        <a
                        href="/catalog"
                        className="
                            inline-block
                            bg-transparent
                            text-[var(--btn-outline)]
                            border-2 border-[var(--btn-outline)]
                            py-4 px-12
                            rounded-lg
                            text-sm font-semibold
                            transition-all duration-300
                            hover:bg-[var(--btn-outline)]
                            hover:text-white
                            no-underline
                        "
                        >
                        View All Books
                        </a>

                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <QuoteCard quote={currentQuote} onNext={getNextQuote} />

            {/* Featured Books Section */}
            <section className="py-[60px] bg-[var(--bg-primary)]">
                <div className="max-w-[1200px] mx-auto px-5">
                    {/* Featured Header */}
                    <div className="flex justify-between items-center mb-5 max-md:flex-col max-md:items-start max-md:gap-[15px]">
                        <h2 className="text-4xl font-light text-[var(--text-primary)] mb-0 font-serif">
                            Featured Books
                        </h2>
                        
                        <a 
                            href="/catalog" 
                            className="text-[var(--link-accent)] hover:text-[var(--link-accent)] no-underline text-base font-semibold transition-all duration-300 flex items-center gap-1 hover:text-[#c44434] hover:translate-x-1"
                        >
                            View More →
                        </a>
                    </div>
                    
                    {/* Category Tabs */}
                    <div className="flex justify-center gap-[50px] my-[30px] mx-6 mb-10 flex-wrap">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`py-3 px-[35px] text-sm cursor-pointer transition-all duration-300 rounded-[25px] font-medium tracking-wide border-2 ${
                                    selectedCategory === category
                                        ? 'bg-[#d95140] !text-white !border-[#d95140] font-semibold shadow-[0_4px_12px_rgba(217,81,64,0.3)] -translate-y-0.5 hover:bg-[#c44434] hover:border-[#c44434] hover:shadow-[0_6px_16px_rgba(217,81,64,0.4)] hover:-translate-y-1'
                                        : 'bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#f7cac4] hover:text-[#d95140] hover:bg-[var(--card-bg)]'
                                }`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    
                    {loadingFeatured && (
                        <p className="text-center text-[var(--text-secondary)] text-base py-10">
                            Loading books...
                        </p>
                    )}
                    
{/* Featured Books Grid */}
<div className="grid grid-cols-5 !gap-6 mt-10 max-[1024px]:grid-cols-4 max-[768px]:grid-cols-3 max-[600px]:grid-cols-2 max-[480px]:grid-cols-1">
    {featuredBooks.length > 0 && featuredBooks.slice(0, 10).map((book) => (
        <CardBook 
            key={book.id}
            onClick={() => handleBookClick(book)}
        >
            <CardBook.Header image={book.image} />
            <CardBook.Body author={book.author} title={book.title} />
            <CardBook.Footer 
                rating={book.rating}
                book={book}
                handleAddFavorite={handleAddFavorite}
            />
        </CardBook>
    ))}
</div>
                </div>
            </section>
            
            <Footer />
            
            {/* Modal */}
            <BookDetailModal
                book={selectedBook}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onViewMore={handleViewMore}
                hideViewMore={true}
            />
        </div>
    );
}