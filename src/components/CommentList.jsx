import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({
  comments,
  authUserId = null,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  return (
    <section className="comment-list">
      <h3>
        Komentar (
        {comments.length}
        )
      </h3>
      {comments.length === 0 ? (
        <p className="empty-state">Belum ada komentar. Jadilah yang pertama!</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            owner={comment.owner}
            upVotesBy={comment.upVotesBy}
            downVotesBy={comment.downVotesBy}
            authUserId={authUserId}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralizeVote={onNeutralizeVote}
          />
        ))
      )}
    </section>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default CommentList;
