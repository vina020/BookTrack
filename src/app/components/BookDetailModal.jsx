import { useEffect } from "react";
import "../../css/book-detail.css";
import { useState } from "react";
import { getRelatedBooks } from "../../services/book.service";
import { useFavorites } from "../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useReading } from "../../context/ReadingContext";
import { useRouter } from "next/router";

export default function BookDetailModal({ book, isOpen, onClose, onViewMore }) {

    const [relatedBooks, setRelatedBooks] = useState([]);
    const [loadingRelated, setLoadingRelated] = useState(false);
    const { addToFavorites, isFavorite } = useFavorites();
    const [isAnimating, setIsAnimating ] = useState(false);
    const { addToCurrentReading, isCurrentlyReading } = useReading();
    const router = useRouter();

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    useEffect(() => {
    if (isOpen && book) {
        loadRelatedBooks();
    }
    }, [isOpen, book]);

    const loadRelatedBooks = async () => {
    setLoadingRelated(true);
    const data = await getRelatedBooks(book.id, book.subjects);
    setRelatedBooks(data);
    setLoadingRelated(false);
    };

    const handleAddToFavorites = (e) => {
        e.stopPropagation();

        setIsAnimating(true);

        addToFavorites(book);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };

    const handleRead = (e) => {
        e.stopPropagation();
        addToCurrentReading(book);
        onClose;
        router.push('/reading');
    };

    if (!isOpen || !book) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* close button */}
                <button className="modal-close" onClick={onClose}>×</button>
                
                {/* book info */}
                <div className="modal-body">
                    {/* book cover (left side) */}
                    <div className="modal-left">
                        <div className="modal-book-cover">
                            {book.image ? (
                                <img src={book.image} alt={book.title} className="modal-book-image"/>
                            ) : (
                                <div className="modal-book-placeholder">{book.title[0]}</div>
                            )}
                        </div>
                    </div>

                    {/* book details (right side) */}
                    <div className="modal-right">
                        <h2 className="modal-book-title">{book.title}</h2>

                        {/* author info */}
                        <div className="modal-author-info">
                            <div className="author-avatar">
                                {book.author[0]}
                            </div>
                            <div className="author-details">
                                <p className="author-name">{book.author}</p>
                                <p className="author-meta">12 Publication | 32,345 Followers</p>
                            </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="modal-rating">
                            <span className="stars">
                                {"⭐".repeat(Math.round(
                                    book.rating && book.rating !== "N/A" 
                                        ? parseFloat(book.rating) 
                                        : 0
                                ))}
                                {" "}
                                {book.rating && book.rating !== "N/A" ? book.rating : "No rating yet"}
                            </span>
                            <span className="rating-count">
                                {book.ratingCount ? book.ratingCount.toLocaleString() : "0"} reviews
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="modal-actions">
                            <button 
                            className="button-borrow"
                            onClick={handleRead}
                            >
                                {isCurrentlyReading(book.id) ? 'Continue Reading' : 'Start Reading'}
                            </button>
                            <button
                            className={`button-wishlist ${isFavorite(book.id) ? 'is-favorite' : ''} ${isAnimating ? 'animating' : ''}`}
                            onClick={handleAddToFavorites}
                            disabled={isFavorite(book.id)}
                            >
                            {isFavorite(book.id) ? (
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
                        
                        {/* About Section */}
                        <div className="modal-about">
                            <h3 className="about-title">About</h3>
                            <p className="about-text">
                                There are still one or two questions left unanswered at the end of this adventure. 
                                Discover more about this captivating story and explore the magical world created by the author.
                            </p>
                        </div>
                        
                        {/* Tags */}
                        <div className="modal-tags">
                            <span className="tag">Fantasy</span>
                            <span className="tag">Adventure</span>
                            <span className="tag">Magic</span>
                        </div>

                        {/* View More Button - TAMBAH className */}
                        <button 
                            className="button-view-more"
                            onClick={() => onViewMore(book)}
                        >
                            View Full Details
                        </button>
                    </div>
                </div>

                {/* You May Also Like */}
                <div className="modal-recommendations">
                    <h3 className="recommendations-title">You may also like</h3>
                    
                    {loadingRelated ? (
                        <p className="loading-text">Loading recommendations...</p>
                    ) : relatedBooks.length > 0 ? (
                        <div className="recommendations-scroll-container">
                            <div className="recommendations-grid">
                                {relatedBooks.map((relatedBook) => (
                                    <div 
                                        key={relatedBook.id} 
                                        className="recommendation-card"
                                        onClick={() => {
                                            onClose();
                                            setTimeout(() => {
                                                onViewMore(relatedBook);
                                            }, 300);
                                        }}
                                    >
                                        <div className="recommendation-image">
                                            {relatedBook.image ? (
                                                <img 
                                                    src={relatedBook.image} 
                                                    alt={relatedBook.title}
                                                    className="recommendation-book-image"
                                                />
                                            ) : (
                                                <div className="recommendation-placeholder">
                                                    {relatedBook.title[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="recommendation-info">
                                            <p className="recommendation-author">{relatedBook.author}</p>
                                            <h3 className="recommendation-title">{relatedBook.title}</h3>
                                            <p className="recommendation-rating">{relatedBook.rating}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="no-recommendations">No related books found</p>
                    )}
                </div>
            </div>
        </div>
    );
}