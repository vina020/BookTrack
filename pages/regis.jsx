import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaBookOpenReader } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Nama minimal 3 karakter';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Ganti dengan endpoint API Anda
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Redirect ke login atau langsung login
          router.push('/login');
        } else {
          setErrors({ email: data.message || 'Registrasi gagal' });
        }
      } catch (error) {
        console.error('Register error:', error);
        setErrors({ email: 'Terjadi kesalahan, coba lagi' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <span className="logo-icon"><FaBookOpenReader color='#f7cac4'/></span>
              <span>BookStore</span>
            </div>
            <h1 className="auth-title">Buat Akun Baru</h1>
            <p className="auth-subtitle">Bergabunglah dengan komunitas pembaca kami</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Nama Lengkap</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Masukkan nama lengkap Anda"
                disabled={loading}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="nama@email.com"
                disabled={loading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Minimal 6 karakter"
                disabled={loading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Ulangi password Anda"
                disabled={loading}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" required disabled={loading} />
                <span>Saya setuju dengan <a href="/terms" className="auth-link">Syarat & Ketentuan</a></span>
              </label>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Sudah punya akun? <a href="/login" className="auth-link">Masuk di sini</a></p>
          </div>

          <div className="divider">
            <span>atau daftar dengan</span>
          </div>

          <div className="social-login">
            <button className="btn-social google" type="button" disabled={loading}>
              <span className="social-icon">G</span>
              Google
            </button>
            <button className="btn-social facebook" type="button" disabled={loading}>
              <span className="social-icon">f</span>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;