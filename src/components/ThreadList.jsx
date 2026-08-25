import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads,
  authUserId = null,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  if (threads.length === 0) {
    return <p className="empty-state">Belum ada diskusi pada kategori ini.</p>;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          ownerName={thread.ownerName}
          totalComments={thread.totalComments}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralizeVote={onNeutralizeVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default ThreadList;
