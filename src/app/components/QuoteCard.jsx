import "../../css/homepage.css";

export default function QuoteCard({ quote, onNext }) {
    if (!quote) return null;

    return (
        <section className="quote-section">
            <div className="container">
                <div className="quote-content">
                    <div className="quote-image">
                        <div className="author-image">
                            {quote.authorImage && (
                                <img src={quote.authorImage} alt={quote.author} />
                            )}
                        </div>
                        <div className="book-small">
                            {quote.bookCover && (
                                <img src={quote.bookCover} alt={quote.book} />
                            )}
                        </div>
                    </div>
                    <div className="quote-text">
                        <blockquote>"{quote.text}"</blockquote>
                        <p className="quote-author">— {quote.author}, {quote.book}</p>
                        {onNext && (
                            <button className="button-secondary" onClick={onNext}>
                                VIEW MORE
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}