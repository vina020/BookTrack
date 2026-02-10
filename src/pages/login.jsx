import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaBookOpenReader } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Gunakan login dari AuthContext
        login(data.user, data.token); // ← Ini penting!
        
        // Redirect ke homepage
        router.push('/homepage');
      } else {
        setErrors({ email: data.message || 'Login gagal' });
      }
    } catch (error) {
      console.error('Login error:', error);
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
              <span>BookTrack</span>
            </div>
            <h1 className="auth-title">Selamat Datang Kembali</h1>
            <p className="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Masukkan password Anda"
                disabled={loading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" disabled={loading} />
                <span>Ingat saya</span>
              </label>
              <a href="/forgot-password" className="forgot-link">Lupa password?</a>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Belum punya akun? <a href="/regis" className="auth-link">Daftar sekarang</a></p>
          </div>

          <div className="divider">
            <span>atau masuk dengan</span>
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

export default Login;