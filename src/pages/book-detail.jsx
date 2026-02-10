import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBookDetail } from "../services/book.service";
import "../css/bookdetail.css";
import { FaBook } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useReading } from "../context/ReadingContext";

export default function BookDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
    const [isAnimating, setIsAnimating] = useState(false);
    const { addToCurrentReading, isCurrentlyReading } = useReading();

    const isFavorite = (bookId) => {
        return favorites.some(fav => fav.id === bookId);
    };

    const handleAddToFavorites = (e) => {
        e.stopPropagation();
        
        if (!book) return;

        setIsAnimating(true);

        addToFavorites({
        id: book.id || id || 'null',
        title: book.title || 'null',
        author: book.author_name?.[0] || book.author || 'Unknown',
        image: book.image || 'null',
        rating: book.rating || 'N/A',
        subjects: book.subjects || [] || 'null',
        first_publish_year: book.first_publish_year || 'null'
        });

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    const handleRead = () => {
    addToCurrentReading({
        id: book.id || id || 'null',
        title: book.title || 'null',
        author: book.author_name?.[0] || book.author || 'Unknown',
        image: book.image || 'null',
        progress: 0
    });
    router.push('/reading');
    };

    useEffect(() => {
        if (!id) return;

        let isMounted = true;
        
        async function loadBookDetail() {
            setLoading(true);
            console.log("Fetching book with ID:", id);
            const data = await getBookDetail(id);
            console.log("Data received:", data);

            if (isMounted) {
            setBook(data);
            setLoading(false);
        }
    }
        loadBookDetail();

        return () => {
            isMounted = false;
        }
    }, [id]);

    if (loading) {
        return (
            <div className="book-detail-container">
                <p className="loading-text">Loading book details...</p>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="book-detail-container">
                <p className="error-text">Book not found</p>
                <button onClick={() => router.back()} className="back-button">
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div className="book-detail-container">
            {/* Header */}
            <header className="detail-header">
                <div className="header-content">
                    {/* Left - Title & Icon */}
                    <div className="header-title">
                    <button onClick={() => router.back()} style={{
                            background: 'rgba(255,255,255,0.8)',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#2c3e50'
                        }}>
                            ← Back
                        </button>
                        <div className="header-icon"><FaBook/></div>
                        <div className="header-text">
                            <h1>Reading Now</h1>
                            <p className="header-subtitle">Explore your next favorite book</p>
                        </div>
                    </div>
                    
                    {/* Right - User Info */}
                    <a href="/profile" className="user-info" title="Profile">
                        <div className="user-avatar">
                            {typeof window !== 'undefined' && localStorage.getItem('userName') 
                                ? localStorage.getItem('userName').charAt(0).toUpperCase() 
                                : 'U'}
                        </div>
                        <span className="user-name">
                            {typeof window !== 'undefined' && localStorage.getItem('userName') 
                                ? localStorage.getItem('userName') + "'s Library"
                                : "User's Library"}
                        </span>
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <div className="detail-content">
                <div className="container">
                    <div className="detail-grid">
                        {/* Left: Book Cover */}
                        <div className="book-cover-section">
                            {book.image ? (
                                <img src={book.image} alt={book.title} className="book-cover-large" />
                            ) : (
                                <div className="book-cover-placeholder">
                                    {book.title[0]}
                                </div>
                            )}
                            
                            <div className="rating-card">
                                <div className="rating-logo"><FaStar size={25} color="gold"/></div>
                                <div className="rating-stars">
                                    {"⭐".repeat(Math.round(book.rating === "N/A" ? 0 : parseFloat(book.rating)))}
                                </div>
                                <div className="rating-number">{book.rating}</div>
                                <div className="rating-count">
                                    {book.ratingCount ? book.ratingCount.toLocaleString() : '0'} reviews
                                </div>
                            </div>
                        </div>

                        {/* Book Info Section */}
                        <div className="book-info-section">
                            <div className="book-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Title</span>
                                    <span className="meta-value">{book.title}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Author</span>
                                    <span className="meta-value">
                                        {book.author || 'Unknown'}
                                    </span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Published</span>
                                    <span className="meta-value">
                                        {book.first_publish_year || 'N/A'}
                                    </span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Publisher</span>
                                    <span className="meta-value">N/A</span>
                                </div>
                            </div>

                            {/* Synopsis */}
                            <div className="synopsis-section">
                                <h2 className="section-title">Synopsis</h2>
                                <div className="synopsis-text">
                                    {book.description || 'No description available'}
                                </div>
                            </div>

                            {book.subjects && book.subjects.length > 0 && (
                                <div className="subjects-section">
                                    <h3 className="section-title">Subjects</h3>
                                    <div className="subjects-tags">
                                        {book.subjects.map((subject, idx) => (
                                            <span key={idx} className="subject-tag">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="modal-actions">
                                <button 
                                className="button-borrow"
                                onClick={handleRead}
                                >
                                    {isCurrentlyReading(book.id || id) ? 'Continue Reading' : 'Start Reading'}
                                    </button>
                                <button 
                                    className={`button-wishlist ${isFavorite(book.id || id) ? 'is-favorite' : ''} ${isAnimating ? 'animating' : ''}`}
                                    onClick={handleAddToFavorites}
                                    disabled={isFavorite(book.id || id)}
                                >
                                    {isFavorite(book.id || id) ? (
                                        <>
                                            <FaHeart /> Already in Favorites
                                        </>
                                    ) : (
                                        <>
                                            <FaRegHeart /> Add To Favorites
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <div className="container">
                    <h2 className="reviews-title">Reviews</h2>
                    <div className="review-quote">
                        <p className="quote-text">
                            "A powerful story that stays with you long after the last page. 
                            The narrative weaves through time beautifully."
                        </p>
                        <p className="quote-attribution">— Reader Review</p>
                    </div>
                </div>
            </div>
        </div>
    );
}