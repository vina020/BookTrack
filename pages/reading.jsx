"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBook, FaClock, FaBookmark, FaChevronRight } from "react-icons/fa";
import { useReading } from "../context/ReadingContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReadingNow() {
    const router = useRouter();
    const { currentReading } = useReading();
    const [wantToRead, setWantToRead] = useState([]); // sementara kosong
    const [loading, setLoading] = useState(false);

    const handleBookClick = (bookId) => {
        router.push(`/book-detail?id=${bookId}`);
    };

    const calculateProgress = (book) => {
        // Calculate reading progress
        return book.progress || 0;
    };

    const getTimeLeft = (book) => {
    if (!book) return "Start reading";
    const progress = book.progress || 0;
    if (progress >= 95) return "Almost done!";
    if (progress >= 70) return "30 minutes left";
    if (progress >= 50) return "1 hour left";
    if (progress >= 30) return "2 hours left";
    return "3+ hours left";
    };

    if (loading) {
        return (
            <div className="reading-now-page">
                <div className="loading-container">
                    <p className="loading-text">Loading your reading list...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="reading-now-page">
            {/* Header */}
            <Navbar/>
            <main className="reading-content">
                <div className="container">
                    {/* Header */}
                    <div className="reading-header">
                        <div className="header-left">
                            <div className="header-icon">
                                <FaBook />
                            </div>
                            <div className="header-text">
                                <h1 className="page-title">Reading Now</h1>
                                <p className="page-subtitle">
                                    <FaClock size={14} /> Today's Reading
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Current Reading Section */}
                    <section className="section">
                        <div className="section-header-single">
                            <h2 className="section-title">Currently Reading</h2>
                        </div>
                        <p className="section-description">
                            Books you're reading right now
                        </p>

                        {currentReading.length === 0 ? (
                            <div className="empty-state-inline">
                                <FaBookmark size={40} color="#ccc" />
                                <p>No books in progress</p>
                                <button 
                                    className="btn-browse"
                                    onClick={() => router.push('/catalog')}
                                >
                                    Browse Catalog
                                </button>
                            </div>
                        ) : (
                            <div className="want-to-read-grid">
                                {currentReading.map((book, index) => (
                                    <div 
                                        key={index}
                                        className="want-to-read-card"
                                        onClick={() => router.push(`/reader?id=${book.id}`)}
                                    >
                                        {book.cover_i ? (
                                            <img 
                                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                                alt={book.title}
                                                className="book-cover"
                                            />
                                        ) : book.image ? (
                                            <img 
                                                src={book.image}
                                                alt={book.title}
                                                className="book-cover"
                                            />
                                        ) : (
                                            <div className="book-cover-placeholder">
                                                {typeof book.title === 'string' ? book.title[0] : 'B'}
                                            </div>
                                        )}
                                        
                                        {/* Reading Badge */}
                                        <div className="reading-badge">
                                            Reading · {book.progress || 0}%
                                        </div>
                                        
                                        <div className="book-overlay">
                                            <h2 className="book-title">
                                                {typeof book.title === 'string' 
                                                    ? book.title 
                                                    : book.title?.join?.(", ") || "Unknown Title"}
                                            </h2>
                                            <p className="book-author">
                                                {typeof book.author_name === 'string'
                                                    ? book.author_name
                                                    : book.author_name?.join?.(", ") || book.author || "Unknown Author"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Divider */}
                    <div className="section-divider"></div>

                    {/* Want to Read Section */}
                    <section className="section">
                        <div className="section-header-single">
                            <h2 className="section-title">Want to Read</h2>
                            <button className="btn-see-all">
                                See All <FaChevronRight size={12} />
                            </button>
                        </div>
                        <p className="section-description">
                            Books you would like to read next.
                        </p>

                        {wantToRead.length === 0 ? (
                            <div className="empty-state-inline">
                                <FaBookmark size={40} color="#ccc" />
                                <p>No books in your reading list</p>
                                <button 
                                    className="btn-browse"
                                    onClick={() => router.push('/catalog')}
                                >
                                    Discover Books
                                </button>
                            </div>
                        ) : (
                            <div className="want-to-read-grid">
                                {wantToRead.slice(0, 6).map((book, index) => (
                                    <div 
                                        key={index}
                                        className="want-to-read-card"
                                        onClick={() => handleBookClick(book.id)}
                                    >
                                        {book.image ? (
                                            <img 
                                                src={book.image} 
                                                alt={book.title}
                                                className="book-cover"
                                            />
                                        ) : (
                                            <div className="book-cover-placeholder">
                                                {book.title?.[0] || 'B'}
                                            </div>
                                        )}
                                        <div className="book-overlay">
                                            <h2 className="book-title">
                                                {book?.title
                                                ? book.title.join(", ")
                                                : "Unknown Title"}
                                                </h2>
                                            <p className="book-author">
                                                {book?.author_name
                                                ? book.author_name.join(", ")
                                                : "Unknown Author"}
                                                </p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    );
}