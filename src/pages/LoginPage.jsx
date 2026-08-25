import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch {
      // error sudah ditangani di thunk (alert)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Masuk</h1>
        <p>Masuk untuk mulai berdiskusi.</p>
        <LoginInput login={onLogin} />
        <p className="auth-switch">
          Belum punya akun?
          {' '}
          <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
