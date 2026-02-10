"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // Load favorites dari localStorage saat pertama kali
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Save ke localStorage setiap kali favorites berubah
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (book) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn || isLoggedIn === 'false') {
            alert('Please login to add books to favorites!');
            window.location.href = '/login';
            return false;
        }

        setFavorites(prev => {
            if (prev.some(fav => fav.id === book.id)) {
                return prev; 
            }
            return [...prev, book];
        });
        return true; 
    };

    const removeFromFavorites = (bookId) => {
        setFavorites(prev => prev.filter(fav => fav.id !== bookId));
    };

    const isFavorite = (bookId) => {
        return favorites.some(fav => fav.id === bookId);
    };

    return (
        <FavoritesContext.Provider value={{ 
            favorites, 
            addToFavorites, 
            removeFromFavorites, 
            isFavorite 
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}