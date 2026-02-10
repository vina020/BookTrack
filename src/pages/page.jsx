"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../../css/settings.css";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun, FaBell, FaLock, FaUser, FaLanguage } from "react-icons/fa";

export default function Settings() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [emailNotif, setEmailNotif] = useState(false);

    return (
        <>
            <Navbar />
            <div className="settings-container">
                <div className="settings-wrapper">
                    <h1 className="settings-title">Settings</h1>
                    <p className="settings-subtitle">Manage your account preferences</p>

                    {/* Appearance Section */}
                    <div className="settings-section">
                        <div className="section-header">
                            <FaMoon className="section-icon" />
                            <h2>Appearance</h2>
                        </div>
                        
                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">
                                    {isDarkMode ? <FaMoon /> : <FaSun />}
                                    <span>Dark Mode</span>
                                </div>
                                <p className="setting-description">
                                    Switch between light and dark theme
                                </p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="settings-section">
                        <div className="section-header">
                            <FaBell className="section-icon" />
                            <h2>Notifications</h2>
                        </div>
                        
                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">
                                    <span>Push Notifications</span>
                                </div>
                                <p className="setting-description">
                                    Receive notifications about your reading progress
                                </p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <div className="setting-label">
                                    <span>Email Notifications</span>
                                </div>
                                <p className="setting-description">
                                    Get email updates about new books and recommendations
                                </p>
                            </div>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={emailNotif}
                                    onChange={() => setEmailNotif(!emailNotif)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="settings-section">
                        <div className="section-header">
                            <FaUser className="section-icon" />
                            <h2>Account</h2>
                        </div>
                        
                        <div className="setting-item clickable">
                            <div className="setting-info">
                                <div className="setting-label">
                                    <FaUser />
                                    <span>Edit Profile</span>
                                </div>
                                <p className="setting-description">
                                    Update your profile information
                                </p>
                            </div>
                            <span className="arrow">›</span>
                        </div>

                        <div className="setting-item clickable">
                            <div className="setting-info">
                                <div className="setting-label">
                                    <FaLock />
                                    <span>Change Password</span>
                                </div>
                                <p className="setting-description">
                                    Update your password to keep your account secure
                                </p>
                            </div>
                            <span className="arrow">›</span>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="settings-section">
                        <div className="section-header">
                            <FaLanguage className="section-icon" />
                            <h2>Preferences</h2>
                        </div>
                        
                        <div className="setting-item clickable">
                            <div className="setting-info">
                                <div className="setting-label">
                                    <span>Language</span>
                                </div>
                                <p className="setting-description">
                                    English (US)
                                </p>
                            </div>
                            <span className="arrow">›</span>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="settings-section danger-section">
                        <div className="section-header">
                            <h2>Danger Zone</h2>
                        </div>
                        
                        <button className="danger-button">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}