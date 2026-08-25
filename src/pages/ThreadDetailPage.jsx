import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import ThreadDetail from '../components/ThreadDetail';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';

function ThreadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return <p className="empty-state">Memuat diskusi...</p>;
  }

  function onAddComment(content) {
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk berkomentar.');
      navigate('/login');
      return;
    }
    dispatch(asyncAddComment({ threadId: id, content }));
  }

  return (
    <div className="thread-detail-page">
      <button type="button" className="button button--ghost" onClick={() => navigate('/')}>
        <FiArrowLeft aria-hidden="true" />
        {' '}
        Kembali
      </button>

      <ThreadDetail
        title={threadDetail.title}
        body={threadDetail.body}
        category={threadDetail.category}
        createdAt={threadDetail.createdAt}
        owner={threadDetail.owner}
        upVotesBy={threadDetail.upVotesBy}
        downVotesBy={threadDetail.downVotesBy}
        authUserId={authUser?.id}
        onUpVote={() => dispatch(asyncUpVoteThreadDetail())}
        onDownVote={() => dispatch(asyncDownVoteThreadDetail())}
        onNeutralizeVote={() => dispatch(asyncNeutralizeVoteThreadDetail())}
      />

      {authUser ? (
        <CommentInput addComment={onAddComment} />
      ) : (
        <p className="auth-hint">
          Silakan masuk untuk ikut berdiskusi.
        </p>
      )}

      <CommentList
        comments={threadDetail.comments}
        authUserId={authUser?.id}
        onUpVote={(commentId) => dispatch(asyncUpVoteComment(commentId))}
        onDownVote={(commentId) => dispatch(asyncDownVoteComment(commentId))}
        onNeutralizeVote={(commentId) => dispatch(asyncNeutralizeVoteComment(commentId))}
      />
    </div>
  );
}

export default ThreadDetailPage;
