import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut, FiAward, FiMessageCircle } from 'react-icons/fi';

function Navigation({ authUser = null, onSignOut }) {
  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <Link to="/">
          <FiMessageCircle aria-hidden="true" />
          {' '}
          Forum Diskusi
        </Link>
      </div>
      <div className="navigation__menu">
        <Link to="/leaderboards" className="navigation__link">
          <FiAward aria-hidden="true" />
          {' '}
          Leaderboard
        </Link>
        {authUser ? (
          <div className="navigation__user">
            <img src={authUser.avatar} alt={authUser.name} className="navigation__avatar" />
            <span>{authUser.name}</span>
            <button type="button" onClick={onSignOut} className="navigation__signout" aria-label="Keluar">
              <FiLogOut aria-hidden="true" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="navigation__link">Masuk</Link>
        )}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
