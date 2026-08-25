/**
 * skenario test
 *
 * - threadDetailReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the thread detail when given RECEIVE_THREAD_DETAIL action
 *   - should return null when given CLEAR_THREAD_DETAIL action
 *   - should return the thread detail with the new comment prepended when given ADD_COMMENT action
 *   - should return the thread detail with the toggled upvote when given UP_VOTE_THREAD_DETAIL action
 *   - should return the thread detail with the upvoted comment when given UP_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = { id: 'thread-1', comments: [] };
    const action = { type: 'CLEAR_THREAD_DETAIL' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the thread detail with the new comment prepended when given ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [{ id: 'comment-1', content: 'Komentar lama' }],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: { comment: { id: 'comment-2', content: 'Komentar baru' } },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([
      action.payload.comment,
      ...initialState.comments,
    ]);
  });

  it('should return the thread detail with the toggled upvote when given UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: ['user-1'],
      comments: [],
    };
    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: { userId: 'user-1' },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toEqual(['user-1']);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should return the thread detail with the upvoted comment when given UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        { id: 'comment-1', content: 'Komentar', upVotesBy: [], downVotesBy: [] },
      ],
    };
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual(['user-1']);
  });
});
