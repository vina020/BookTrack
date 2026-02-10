"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ReadingContext = createContext();

export function ReadingProvider({ children }) {
    const [currentReading, setCurrentReading] = useState([]);

    // Load from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('currentReading');
            if (saved) {
                try {
                    setCurrentReading(JSON.parse(saved));
                } catch (e) {
                    console.error('Error loading reading data:', e);
                }
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentReading', JSON.stringify(currentReading));
        }
    }, [currentReading]);

    const addToCurrentReading = (book) => {
        setCurrentReading(prev => {
            if (prev.some(b => b.id === book.id)) return prev;
            return [...prev, { 
                ...book, 
                progress: 0,
                startedAt: new Date().toISOString()
            }];
        });
    };

    const isCurrentlyReading = (bookId) => {
        return currentReading.some(b => b.id === bookId);
    };

    const removeFromCurrentReading = (bookId) => {
        setCurrentReading(prev => prev.filter(b => b.id !== bookId));
    };

    const value = {
        currentReading,
        addToCurrentReading,
        isCurrentlyReading,
        removeFromCurrentReading
    };

    return (
        <ReadingContext.Provider value={value}>
            {children}
        </ReadingContext.Provider>
    );
}

export function useReading() {
    const context = useContext(ReadingContext);
    if (!context) {
        throw new Error('useReading must be used within ReadingProvider');
    }
    return context;
}