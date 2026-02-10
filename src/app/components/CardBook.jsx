import React from "react";
import Link from "next/link";

export default function CardBook({ children, onClick }) {
    return (
        <div 
            className="card-book" 
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </div>
    );

    } 
    CardBook.Header = function CardBookHeader({ image }) {
        return (
            <div className="card-book-header">
                {image ? (
                    <img src={image} alt="Book cover" className="book-image"></img>
                ) : (
                    <div className="book-placeholder">book</div>
                )}
            </div>
        );
    };

    CardBook.Body = function CardBookBody({ author, title}) {
        return (
            <div className="card-book-body">
                <p className="book-author">{author}</p>
                <h3 className="book-title">{title}</h3>
            </div>
        );
    };

    import { useState } from "react";

CardBook.Footer = function CardBookFooter({ rating, book, handleAddFavorite, showFavoriteButton = true }) {
    const [isAnimating, setIsAnimating] = useState(false);
    
    const handleClick = (e) => {
        e.stopPropagation();
        setIsAnimating(true);
        handleAddFavorite(book);
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };
    
    return (
        <div className="card-book-footer">
            <p className="book-rating">{rating}</p>
            {showFavoriteButton && (
                <button 
                    className={`button-favorite ${isAnimating ? 'animating' : ''}`}
                    onClick={handleClick}
                >
                    {isAnimating ? '❤️ Added!' : 'Add to Favorites'}
                </button>
            )}
        </div>
    );
};