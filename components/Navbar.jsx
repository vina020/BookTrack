import { useState, useEffect } from "react";
import { FaHome, FaBookOpen, FaBook, FaHeart } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading, logout } = useAuth(); // Ambil user dari context
    const [mounted, setMounted] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    console.log("Current pathname:", pathname);

    const handleLogout = () => {
        logout();
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || loading) {
        return (
            <header className="header-main">
                <div className="container">
                    <div className="header-content">
                        <a href="/homepage" className="logo">
                            <div className="logo-icon">
                                <FaBookOpenReader color='#f7cac4'/>
                            </div>
                            <span className="logo-text">BOOKS</span>
                        </a>
                        {/* Navigation Menu */}
                        <nav className="nav-icons">
                            <a href="/homepage" className={`nav-icon-link ${pathname === '/homepage' ? 'active' : ''}`} title="Home">
                                <span className="icon"><FaHome/></span>
                                <span className="nav-label"></span>
                            </a>
                            <a href="/catalog" className={`nav-icon-link ${pathname === '/catalog' ? 'active' : ''}`} title="Catalog">
                                <span className="icon"><FaBookOpen/></span>
                                <span className="nav-label"></span>
                            </a>
                            <a href="/reading" className={`nav-icon-link ${pathname === '/reading' ? 'active' : ''}`} title="Reading List">
                                <span className="icon"><FaBook/></span>
                                <span className="nav-label"></span>
                            </a>
                            <a href="/favorites" className={`nav-icon-link ${pathname === '/favorites' ? 'active' : ''}`} title="Favorites">
                                <span className="icon"><FaHeart/></span>
                                <span className="nav-label"></span>
                            </a>
                        </nav>
                        <div className="header-right">
                            <div className="auth-links">
                                <a href="/login" className="auth-link">Login</a>
                                <span className="divider">|</span>
                                <a href="/regis" className="auth-link">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    // Dapatkan inisial dari nama user
    const getUserInitial = () => {
        if (user?.name) {
            return user.name[0].toUpperCase();
        }
        if (user?.fullName) {
            return user.fullName[0].toUpperCase();
        }
        if (user?.email) {
            return user.email[0].toUpperCase();
        }
        return 'U'; // Default
    };

    return (
        <header className="header-main">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <a href="/homepage" className="logo">
                        <div className="logo-icon">
                            <FaBookOpenReader color='#f7cac4'/>
                        </div>
                        <span className="logo-text">BOOKTRACK</span>
                    </a>

                    {/* Navigation Menu */}
                        <nav className="nav-icons">
                            <a href="/homepage" className={`nav-icon-link ${pathname === '/homepage' ? 'active' : ''}`} title="Home">
                                <span className="icon"><FaHome/></span>
                                <span className="nav-label"></span>
                            </a>
                            <a href="/catalog" className={`nav-icon-link ${pathname === '/catalog' ? 'active' : ''}`} title="Catalog">
                                <span className="icon"><FaBookOpen/></span>
                                <span className="nav-label"></span>
                            </a>
                            <a href="/reading" className={`nav-icon-link ${pathname === '/reading' ? 'active' : ''}`} title="Reading List">
                                <span className="icon"><FaBook/></span>
                                <span className="nav-label"></span>
                            </a>
                            <a href="/favorites" className={`nav-icon-link ${pathname === '/favorites' ? 'active' : ''}`} title="Favorites">
                                <span className="icon"><FaHeart/></span>
                                <span className="nav-label"></span>
                            </a>
                        </nav>

                    {/* Ubah bagian header-right */}
                    <div className="header-right">
                        {user ? (
                        <div className="user-menu">
                            <button 
                                onClick={toggleDropdown} 
                                className="user-profile-icon" 
                                title="Profile"
                            >
                                <div className="profile-avatar">
                                    {getUserInitial()}
                                </div>
                            </button>
                            
                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <a href="/settings" className="dropdown-item">
                                        Setting
                                    </a>
                                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        ) : (
                            <div className="auth-links">
                                <a href="/login" className="auth-link">Login</a>
                                <span className="divider">|</span>
                                <a href="/regis" className="auth-link">Register</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}