import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    register({ name, email, password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          placeholder="Nama lengkap"
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Kata Sandi</label>
        <input
          id="password"
          type="password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={onPasswordChange}
          minLength={6}
          required
        />
      </div>
      <button type="submit" className="button button--primary button--block">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
