import { FavoritesProvider } from '../context/FavoritesContext';
import '../css/book-detail.css';
import '../css/auth.css';
import { ReadingProvider } from '../context/ReadingContext';
import { AuthProvider } from '../context/AuthContext';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import '../css/globals.css';
import '../css/homepage.css';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
        <AuthProvider>
            <FavoritesProvider>
                <ReadingProvider>
                <Component {...pageProps} />
                </ReadingProvider>
            </FavoritesProvider>
        </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;