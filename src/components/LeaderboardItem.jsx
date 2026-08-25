import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ rank, user, score }) {
  return (
    <div className="leaderboard-item">
      <span className="leaderboard-item__rank">{rank}</span>
      <div className="leaderboard-item__user">
        <img src={user.avatar} alt={user.name} className="leaderboard-item__avatar" />
        <span>{user.name}</span>
      </div>
      <span className="leaderboard-item__score">{score}</span>
    </div>
  );
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
