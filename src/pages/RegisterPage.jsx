import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onRegister({ name, email, password }) {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      alert('Registrasi berhasil. Silakan masuk.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Daftar</h1>
        <p>Buat akun untuk bergabung dalam diskusi.</p>
        <RegisterInput register={onRegister} />
        <p className="auth-switch">
          Sudah punya akun?
          {' '}
          <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
