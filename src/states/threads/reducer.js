import { ActionType } from './action';

function applyVote(thread, userId, voteType) {
  const upVotedBy = thread.upVotesBy.filter((id) => id !== userId);
  const downVotedBy = thread.downVotesBy.filter((id) => id !== userId);

  if (voteType === 'up') {
    upVotedBy.push(userId);
  } else if (voteType === 'down') {
    downVotedBy.push(userId);
  }

  return {
    ...thread,
    upVotesBy: upVotedBy,
    downVotesBy: downVotedBy,
  };
}

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => (
        thread.id === action.payload.threadId
          ? applyVote(thread, action.payload.userId, 'up')
          : thread
      ));
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => (
        thread.id === action.payload.threadId
          ? applyVote(thread, action.payload.userId, 'down')
          : thread
      ));
    case ActionType.NEUTRALIZE_VOTE_THREAD:
      return threads.map((thread) => (
        thread.id === action.payload.threadId
          ? applyVote(thread, action.payload.userId, 'neutral')
          : thread
      ));
    default:
      return threads;
  }
}

export default threadsReducer;
