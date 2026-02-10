"use client";
import { useState } from "react";
import Navbar from "../app/components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun, FaBell, FaLock, FaUser, FaLanguage } from "react-icons/fa";

export default function Settings() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [emailNotif, setEmailNotif] = useState(false);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[var(--bg-primary)] pt-[100px] px-5 pb-10 transition-colors duration-300 font-['Poppins',Arial,Helvetica,sans-serif]">
                <div className="max-w-[800px] mx-auto">
                    <h1 className="text-[2.5rem] font-bold text-[var(--text-primary)] mb-2">Settings</h1>
                    <p className="text-base text-[var(--text-secondary)] mb-10">Manage your account preferences</p>

                    {/* Appearance Section */}
                    <div className="bg-[var(--card-bg)] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border-color)]">
                            <FaMoon className="text-xl text-[#f7cac4]" />
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">Appearance</h2>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)] last:border-b-0">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-base font-medium text-[var(--text-primary)] mb-1">
                                    {isDarkMode ? <FaMoon className="text-base text-[var(--text-secondary)]" /> : <FaSun className="text-base text-[var(--text-secondary)]" />}
                                    <span>Dark Mode</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] m-0">
                                    Switch between light and dark theme
                                </p>
                            </div>
                            <label className="relative inline-block w-[52px] h-7">
                                <input 
                                    type="checkbox" 
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                    className="opacity-0 w-0 h-0 peer"
                                />
                                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] transition-all duration-300 rounded-[34px] before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full peer-checked:bg-[#f7cac4] peer-checked:before:translate-x-6"></span>
                            </label>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-[var(--card-bg)] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border-color)]">
                            <FaBell className="text-xl text-[#f7cac4]" />
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">Notifications</h2>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)] last:border-b-0">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-base font-medium text-[var(--text-primary)] mb-1">
                                    <span>Push Notifications</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] m-0">
                                    Receive notifications about your reading progress
                                </p>
                            </div>
                            <label className="relative inline-block w-[52px] h-7">
                                <input 
                                    type="checkbox" 
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                    className="opacity-0 w-0 h-0 peer"
                                />
                                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] transition-all duration-300 rounded-[34px] before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full peer-checked:bg-[#f7cac4] peer-checked:before:translate-x-6"></span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)] last:border-b-0">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-base font-medium text-[var(--text-primary)] mb-1">
                                    <span>Email Notifications</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] m-0">
                                    Get email updates about new books and recommendations
                                </p>
                            </div>
                            <label className="relative inline-block w-[52px] h-7">
                                <input 
                                    type="checkbox" 
                                    checked={emailNotif}
                                    onChange={() => setEmailNotif(!emailNotif)}
                                    className="opacity-0 w-0 h-0 peer"
                                />
                                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] transition-all duration-300 rounded-[34px] before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full peer-checked:bg-[#f7cac4] peer-checked:before:translate-x-6"></span>
                            </label>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="bg-[var(--card-bg)] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border-color)]">
                            <FaUser className="text-xl text-[#f7cac4]" />
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">Account</h2>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 px-4 -mx-4 border-b border-[var(--border-color)] last:border-b-0 cursor-pointer transition-colors duration-200 rounded-lg hover:bg-[var(--hover-bg)]">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-base font-medium text-[var(--text-primary)] mb-1">
                                    <FaUser className="text-base text-[var(--text-secondary)]" />
                                    <span>Edit Profile</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] m-0">
                                    Update your profile information
                                </p>
                            </div>
                            <span className="text-2xl text-[var(--text-secondary)] font-light">›</span>
                        </div>

                        <div className="flex items-center justify-between py-4 px-4 -mx-4 border-b border-[var(--border-color)] last:border-b-0 cursor-pointer transition-colors duration-200 rounded-lg hover:bg-[var(--hover-bg)]">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-base font-medium text-[var(--text-primary)] mb-1">
                                    <FaLock className="text-base text-[var(--text-secondary)]" />
                                    <span>Change Password</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] m-0">
                                    Update your password to keep your account secure
                                </p>
                            </div>
                            <span className="text-2xl text-[var(--text-secondary)] font-light">›</span>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="bg-[var(--card-bg)] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border-color)]">
                            <FaLanguage className="text-xl text-[#f7cac4]" />
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">Preferences</h2>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 px-4 -mx-4 border-b border-[var(--border-color)] last:border-b-0 cursor-pointer transition-colors duration-200 rounded-lg hover:bg-[var(--hover-bg)]">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-base font-medium text-[var(--text-primary)] mb-1">
                                    <span>Language</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] m-0">
                                    English (US)
                                </p>
                            </div>
                            <span className="text-2xl text-[var(--text-secondary)] font-light">›</span>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-[var(--card-bg)] rounded-xl p-6 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300 border border-[#fee] dark:border-[#5a2c2c]">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border-color)]">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] m-0">Danger Zone</h2>
                        </div>
                        
                        <button className="w-full p-3 bg-[#fee] text-[#c33] border border-[#ff6b6b] rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-[#fdd] dark:bg-[#4a2020] dark:text-white dark:border-[#ff6b6b] dark:hover:bg-[#5a2828]">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}