import { FavoritesProvider } from '../context/FavoritesContext';
import { ReadingProvider } from '../context/ReadingContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../css/globals.css';

export const metadata = {
    title: 'BookTrack',
    description: 'Track your reading journey',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <AuthProvider>
                        <FavoritesProvider>
                            <ReadingProvider>
                                {children}
                            </ReadingProvider>
                        </FavoritesProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}