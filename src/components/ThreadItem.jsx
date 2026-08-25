import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FiMessageSquare } from 'react-icons/fi';
import VoteButtons from './VoteButtons';
import { postedAt, stripHtml } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  ownerName,
  totalComments,
  upVotesBy,
  downVotesBy,
  authUserId = null,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const navigate = useNavigate();

  function handleUpVote() {
    onUpVote(id);
  }

  function handleDownVote() {
    onDownVote(id);
  }

  function handleNeutralizeVote() {
    onNeutralizeVote(id);
  }

  function goToDetail() {
    navigate(`/threads/${id}`);
  }

  const bodyPreview = stripHtml(body).slice(0, 150);

  return (
    <article className="thread-item">
      <Link to={`/threads/${id}`} className="thread-item__category">
        #
        {category}
      </Link>
      <h3 className="thread-item__title">
        <Link to={`/threads/${id}`}>{title}</Link>
      </h3>
      <div
        className="thread-item__body"
        onClick={goToDetail}
        onKeyDown={(e) => e.key === 'Enter' && goToDetail()}
        role="button"
        tabIndex={0}
      >
        {bodyPreview}
        {stripHtml(body).length > 150 ? '...' : ''}
      </div>
      <div className="thread-item__footer">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          onNeutralizeVote={handleNeutralizeVote}
        />
        <div className="thread-item__meta">
          <span className="thread-item__comments">
            <FiMessageSquare aria-hidden="true" />
            {' '}
            {totalComments}
          </span>
          <span>{postedAt(createdAt)}</span>
          <span>
            Oleh
            {' '}
            <strong>{ownerName}</strong>
          </span>
        </div>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default ThreadItem;
