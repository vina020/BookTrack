"use client";
import { useState } from "react";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { FaBook, FaBullseye, FaMagic, FaMoon, FaUsers, FaCode, FaPalette, FaBookReader } from 'react-icons/fa';

export default function About() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] font-[Poppins,Arial,Helvetica,sans-serif]">
            <Navbar />

        {/* Hero Section */}
        <section className="bg-[linear-gradient(135deg,#f7cac4_0%,#f5e6e4_100%)] dark:bg-[linear-gradient(135deg,#4a3a3a_0%,#3a2f2f_100%)] py-[80px] text-center">
        <div className="max-w-[800px] mx-auto">
            <h1
            className="
                text-[48px]
                font-[300]
                text-[var(--text-primary)]
                mb-[20px]
                font-serif
            "
            >
            About BookTrack
            </h1>

            <p
            className="
                text-[18px]
                text-[var(--text-secondary)]
                leading-[1.6]
            "
            >
            Your gateway to endless knowledge and stories
            </p>
        </div>
        </section>

            {/* Mission Section */}
            <section className="py-20 bg-[var(--bg-primary)] max-md:py-[70px]">
                <div className="max-w-[1200px] max-h-[600px] mx-auto px-5">
                    <div className="flex items-center gap-[80px] max-lg:gap-[60px] max-md:flex-col max-md:text-center">
                        <div className="flex-1">
                            <h2 className="text-[36px] font-light text-[var(--text-primary)] mb-5 font-serif max-lg:text-[32px] max-md:text-[28px]">Our Mission</h2>
                            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-5">
                                BookTrack is dedicated to making reading accessible to everyone. 
                                We believe that books have the power to transform lives, spark 
                                imagination, and connect people across cultures and generations.
                            </p>
                            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] mb-5">
                                Through our digital library platform, we strive to provide a 
                                seamless reading experience that brings together readers and 
                                their favorite books in one convenient place.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center items-center">
                            <div className="w-[280px] h-[280px] bg-gradient-to-br from-[#85aed2] to-[#a8c5dd] rounded-[12px] flex items-center justify-center text-[120px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] max-md:w-[250px] max-md:h-[250px] max-md:text-[100px] max-[480px]:w-[200px] max-[480px]:h-[200px] max-[480px]:text-[80px]">
                                <FaBook color="#f7cac4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-[60px] bg-[var(--bg-secondary)]">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="grid grid-cols-4 gap-[30px] max-lg:grid-cols-2 max-md:gap-5 max-[480px]:grid-cols-1">
                        <div className="text-center py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <h3 className="text-[42px] font-bold text-[#d95140] mb-[10px] max-md:text-[36px] max-[480px]:text-[32px]">10,000+</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] font-medium">Books Available</p>
                        </div>
                        <div className="text-center py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <h3 className="text-[42px] font-bold text-[#d95140] mb-[10px] max-md:text-[36px] max-[480px]:text-[32px]">50,000+</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] font-medium">Active Readers</p>
                        </div>
                        <div className="text-center py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <h3 className="text-[42px] font-bold text-[#d95140] mb-[10px] max-md:text-[36px] max-[480px]:text-[32px]">500+</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] font-medium">Authors</p>
                        </div>
                        <div className="text-center py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <h3 className="text-[42px] font-bold text-[#d95140] mb-[10px] max-md:text-[36px] max-[480px]:text-[32px]">24/7</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] font-medium">Access Anytime</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-[var(--bg-primary)] text-center max-md:py-[60px]">
                <div className="max-w-[1200px] mx-auto px-5">
                    <h2 className="text-[36px] font-light text-[var(--text-primary)] mb-[50px] font-serif max-lg:text-[32px] max-md:text-[28px]">Why Choose BookTrack?</h2>
                    <div className="grid grid-cols-4 gap-[30px] mt-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="text-[48px] mb-5 text-[#f7cac4] flex justify-center"><FaBook/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">Vast Collection</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                                Access thousands of books across multiple genres, from 
                                classic literature to contemporary bestsellers.
                            </p>
                        </div>
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="text-[48px] mb-5 text-[#f7cac4] flex justify-center"><FaBullseye/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">Personalized Experience</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                                Get book recommendations tailored to your reading preferences 
                                and discover new favorites.
                            </p>
                        </div>
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="text-[48px] mb-5 text-[#f7cac4] flex justify-center"><FaMagic/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">Easy to Use</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                                Intuitive interface designed for seamless browsing, reading, 
                                and managing your book collection.
                            </p>
                        </div>
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="text-[48px] mb-5 text-[#f7cac4] flex justify-center"><FaMoon/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">Dark Mode</h3>
                            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">
                                Comfortable reading experience day or night with our 
                                eye-friendly dark mode feature.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-[var(--bg-secondary)] text-center max-md:py-[65px]">
                <div className="max-w-[1200px] mx-auto px-5">
                    <h2 className="text-[36px] font-light text-[var(--text-primary)] mb-5 font-serif max-lg:text-[32px] max-md:text-[28px]">Meet Our Team</h2>
                    <p className="text-[16px] text-[var(--text-secondary)] mb-10">
                        Passionate individuals working to bring books closer to you
                    </p>
                    <div className="grid grid-cols-4 gap-[30px] mt-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="w-[100px] h-[100px] mx-auto mb-5 bg-gradient-to-br from-[#85aed2] to-[#a8c5dd] rounded-full flex items-center justify-center text-[48px] text-[#f7cac4]"><FaUsers/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">John Doe</h3>
                            <p className="text-[14px] text-[#d95140] mb-3 font-medium">Founder & CEO</p>
                            <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">
                                Book enthusiast with 15 years of experience in digital publishing.
                            </p>
                        </div>
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="w-[100px] h-[100px] mx-auto mb-5 bg-gradient-to-br from-[#85aed2] to-[#a8c5dd] rounded-full flex items-center justify-center text-[48px] text-[#f7cac4]"><FaCode/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">Jane Smith</h3>
                            <p className="text-[14px] text-[#d95140] mb-3 font-medium">Head of Technology</p>
                            <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">
                                Leading the tech team to create the best reading experience.
                            </p>
                        </div>
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="w-[100px] h-[100px] mx-auto mb-5 bg-gradient-to-br from-[#85aed2] to-[#a8c5dd] rounded-full flex items-center justify-center text-[48px] text-[#f7cac4]"><FaPalette/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">Mike Johnson</h3>
                            <p className="text-[14px] text-[#d95140] mb-3 font-medium">Chief Designer</p>
                            <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">
                                Crafting beautiful and intuitive user experiences.
                            </p>
                        </div>
                        <div className="py-[30px] px-5 bg-[var(--card-bg)] rounded-[12px] border-[1.5px] border-[var(--border-color)] shadow-[0_2px_12px_var(--shadow)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]">
                            <div className="w-[100px] h-[100px] mx-auto mb-5 bg-gradient-to-br from-[#85aed2] to-[#a8c5dd] rounded-full flex items-center justify-center text-[48px] text-[#f7cac4]"><FaBookReader/></div>
                            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">Sarah Williams</h3>
                            <p className="text-[14px] text-[#d95140] mb-3 font-medium">Content Curator</p>
                            <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">
                                Curating the finest collection of books for our readers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#f7cac4] to-[#f5e6e4] dark:from-[#4a3a3a] dark:to-[#3a2f2f] text-center max-md:py-[60px]">
                <div className="max-w-[700px] mx-auto px-5">
                    <h2 className="text-[36px] font-light text-[var(--text-primary)] mb-5 font-serif max-md:text-[28px]">Start Your Reading Journey Today</h2>
                    <p className="text-[16px] text-[var(--text-secondary)] mb-[30px] leading-[1.6]">
                        Join thousands of readers who have discovered their next favorite book with BookTrack
                    </p>
                    <button 
                        className="bg-[#d95140] text-white border-none py-[15px] px-[35px] text-[14px] tracking-[1px] cursor-pointer transition-colors duration-300 font-medium rounded-lg hover:bg-[#c44434]"
                        onClick={() => window.location.href = '/catalog'}
                    >
                        Explore Books
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}