import { ActionType } from './action';

function applyVote(entity, userId, voteType) {
  const upVotesBy = entity.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = entity.downVotesBy.filter((id) => id !== userId);

  if (voteType === 'up') {
    upVotesBy.push(userId);
  } else if (voteType === 'down') {
    downVotesBy.push(userId);
  }

  return {
    ...entity,
    upVotesBy,
    downVotesBy,
  };
}

function voteComment(comments, commentId, userId, voteType) {
  return comments.map((comment) => (
    comment.id === commentId
      ? applyVote(comment, userId, voteType)
      : comment
  ));
}

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.UP_VOTE_THREAD_DETAIL:
      return applyVote(threadDetail, action.payload.userId, 'up');
    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      return applyVote(threadDetail, action.payload.userId, 'down');
    case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
      return applyVote(threadDetail, action.payload.userId, 'neutral');
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: voteComment(threadDetail.comments, action.payload.commentId, action.payload.userId, 'up'),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: voteComment(threadDetail.comments, action.payload.commentId, action.payload.userId, 'down'),
      };
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: voteComment(threadDetail.comments, action.payload.commentId, action.payload.userId, 'neutral'),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
