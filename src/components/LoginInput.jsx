import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
          placeholder="Kata sandi"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <button type="submit" className="button button--primary button--block">Masuk</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
