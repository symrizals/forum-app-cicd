import React from 'react';
import PropTypes from 'prop-types';
import VoteButtons from './VoteButtons';
import { postedAt, stripHtml } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUserId = null,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  return (
    <article className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner">
          <img src={owner.avatar} alt={owner.name} className="comment-item__avatar" />
          <strong>{owner.name}</strong>
        </div>
        <span className="comment-item__date">{postedAt(createdAt)}</span>
      </header>
      <p className="comment-item__content">{stripHtml(content)}</p>
      <footer className="comment-item__footer">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
          onNeutralizeVote={() => onNeutralizeVote(id)}
        />
      </footer>
    </article>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default CommentItem;
