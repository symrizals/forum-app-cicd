import React from 'react';
import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

function VoteButtons({
  upVotesBy,
  downVotesBy,
  authUserId = null,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  function handleUpVote() {
    if (isUpVoted) {
      onNeutralizeVote();
    } else {
      onUpVote();
    }
  }

  function handleDownVote() {
    if (isDownVoted) {
      onNeutralizeVote();
    } else {
      onDownVote();
    }
  }

  return (
    <div className="vote-buttons">
      <button
        type="button"
        className={`vote-button ${isUpVoted ? 'vote-button--active-up' : ''}`}
        onClick={handleUpVote}
        aria-label="Suka"
      >
        <FiThumbsUp aria-hidden="true" />
        <span>{upVotesBy.length}</span>
      </button>
      <button
        type="button"
        className={`vote-button ${isDownVoted ? 'vote-button--active-down' : ''}`}
        onClick={handleDownVote}
        aria-label="Tidak suka"
      >
        <FiThumbsDown aria-hidden="true" />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default VoteButtons;
