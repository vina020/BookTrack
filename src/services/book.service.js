import axios from "axios";

export const getBooks = async () => {
   try {
    const res = await axios.get("https://openlibrary.org/search.json?q=bestseller&limit=25");

    const booksWithRating = await Promise.all(
        res.data.docs.map(async (book, index) => {
            const isbn = book.isbn?.[0];
            let rating = "N/A";
            
            if (isbn) {
                try {
                    const googleRes = await axios.get(
                        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
                    );
                    const avgRating = googleRes.data.items?.[0]?.volumeInfo?.averageRating;
                    rating = avgRating ? avgRating.toFixed(1) : "N/A";
                } catch (err) {
                    // Ignore error, keep N/A
                }
            }
            
            return {
                id: book.key || index,
                title: book.title || "Unknown Title",
                author: book.author_name?.[0] || "Unknown Author",
                rating: rating !== "N/A" ? `⭐ ${rating}` : "⭐ N/A",
                image: book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : undefined,
            };
        })
    );
    
    return booksWithRating;
   } catch (error) {
    console.error(error);
    return [];
   }
};

export const getBooksByCategory = async (category) => {
    try {
        const categoryMap = {
            "All": "bestseller",
            "Fantasy": "fantasy",
            "Literature": "literature",
            "Mystery": "mystery",
            "Sci-Fi": "science fiction",
            "Romance": "romance"
        };
        
        const query = categoryMap[category] || "bestseller";
        
        const res = await axios.get(`https://openlibrary.org/search.json?subject=${query}&limit=25`);

        const booksWithRating = await Promise.all(
            res.data.docs.map(async (book, index) => {
                const isbn = book.isbn?.[0];
                let rating = "N/A";
                
                if (isbn) {
                    try {
                        const googleRes = await axios.get(
                            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
                        );
                        const avgRating = googleRes.data.items?.[0]?.volumeInfo?.averageRating;
                        rating = avgRating ? avgRating.toFixed(1) : "N/A";
                    } catch (err) {
                        // Ignore error
                    }
                }
                
                return {
                    id: book.key || index,
                    title: book.title || "Unknown Title",
                    author: book.author_name?.[0] || "Unknown Author",
                    rating: rating !== "N/A" ? `⭐ ${rating}` : "⭐ N/A",
                    image: book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : undefined,
                };
            })
        );
        
        return booksWithRating;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const searchBooks = async (query) => {
    try {
        const res = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10`);
        
        const booksWithRating = await Promise.all(
            res.data.docs.map(async (book, index) => {
                const isbn = book.isbn?.[0];
                let rating = "N/A";
                
                if (isbn) {
                    try {
                        const googleRes = await axios.get(
                            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
                        );
                        const avgRating = googleRes.data.items?.[0]?.volumeInfo?.averageRating;
                        rating = avgRating ? avgRating.toFixed(1) : "N/A";
                    } catch (err) {
                        // Ignore error
                    }
                }
                
                return {
                    id: book.key || index,
                    title: book.title || "Unknown Title",
                    author: book.author_name?.[0] || "Unknown Author",
                    rating: rating !== "N/A" ? `⭐ ${rating}` : "⭐ N/A",
                    image: book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : undefined,
                };
            })
        );
        
        return booksWithRating;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getBookDetail = async (bookId) => {
    try {
        const olRes = await axios.get(`https://openlibrary.org${bookId}.json`);

        // Fetch author name
        let authorName = "Unknown Author";
        if (olRes.data.authors?.[0]?.author?.key) {
            try {
                const authorRes = await axios.get(`https://openlibrary.org${olRes.data.authors[0].author.key}.json`);
                authorName = authorRes.data.name || "Unknown Author";
            } catch (err) {
                // ignore
            }
        }

        const isbn = olRes.data.isbn_13?.[0] || olRes.data.isbn_10?.[0];

        let googleData = null;
        if (isbn) {
            try {
                const googleRes = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
                );
                googleData = googleRes.data.items?.[0]?.volumeInfo;
            } catch (err) {
                // ignore
            }
        }

        // Coba dapetin cover dari search API
        let coverImage = undefined;
        try {
            const searchRes = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(olRes.data.title)}&limit=1`);
            const coverI = searchRes.data.docs[0]?.cover_i;
            if (coverI) {
                coverImage = `https://covers.openlibrary.org/b/id/${coverI}-L.jpg`;
            }
        } catch (err) {
            // ignore
        }

        const result = {
            id: bookId,
            title: olRes.data.title || "Unknown Title",
            author: authorName,
            publisher: olRes.data.publishers?.[0] || "Unknown Publisher",
            first_publish_year: olRes.data.first_publish_year || "Unknown",
            description: olRes.data.description?.value || olRes.data.description || "No description available",
            rating: googleData?.averageRating ? googleData.averageRating.toFixed(1) : "N/A",
            ratingCount: googleData?.ratingsCount || 0,
            pageCount: olRes.data.number_of_pages || "N/A",
            subjects: olRes.data.subjects?.slice(0, 5) || [],
            image: coverImage || (olRes.data.covers?.[0] && olRes.data.covers[0] > 0
                ? `https://covers.openlibrary.org/b/id/${olRes.data.covers[0]}-L.jpg`
                : undefined),
        };

        return result;
    } catch (error) {
        console.error("Error fetching book detail:", error.message);
        return null;
    }
};

export const getRelatedBooks = async (bookId, subjects) => {
    try {
        const searchSubject = subjects?.[0] || "fiction";
        
        const res = await axios.get(
            `https://openlibrary.org/search.json?subject=${searchSubject}&limit=6`
        );

        const booksWithRating = await Promise.all(
            res.data.docs
                .filter(book => book.key !== bookId)
                .slice(0, 5)
                .map(async (book, index) => {
                    const isbn = book.isbn?.[0];
                    let rating = "N/A";
                    
                    if (isbn) {
                        try {
                            const googleRes = await axios.get(
                                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
                            );
                            const avgRating = googleRes.data.items?.[0]?.volumeInfo?.averageRating;
                            rating = avgRating ? avgRating.toFixed(1) : "N/A";
                        } catch (err) {
                            // Ignore error
                        }
                    }
                    
                    return {
                        id: book.key || index,
                        title: book.title || "Unknown Title",
                        author: book.author_name?.[0] || "Unknown Author",
                        rating: rating !== "N/A" ? `⭐ ${rating}` : "⭐ N/A",
                        image: book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                            : undefined,
                    };
                })
        );
        
        return booksWithRating;
    } catch (error) {
        console.error("Error fetching related books:", error);
        return [];
    }
};