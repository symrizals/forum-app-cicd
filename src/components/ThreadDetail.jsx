import React from 'react';
import PropTypes from 'prop-types';
import VoteButtons from './VoteButtons';
import { postedAt, stripHtml } from '../utils';

function ThreadDetail({
  title,
  body,
  category,
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
    <section className="thread-detail">
      <span className="thread-detail__category">
        #
        {category}
      </span>
      <h1 className="thread-detail__title">{title}</h1>
      <div className="thread-detail__owner">
        <img src={owner.avatar} alt={owner.name} className="thread-detail__avatar" />
        <div>
          <strong>{owner.name}</strong>
          <span className="thread-detail__date">{postedAt(createdAt)}</span>
        </div>
      </div>
      <p className="thread-detail__body">{stripHtml(body)}</p>
      <div className="thread-detail__footer">
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralizeVote={onNeutralizeVote}
        />
      </div>
    </section>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
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

export default ThreadDetail;
