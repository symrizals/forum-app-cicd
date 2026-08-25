/**
 * skenario test
 *
 * - threadsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the threads when given RECEIVE_THREADS action
 *   - should return the threads with the new thread prepended when given ADD_THREAD action
 *   - should return the threads with the toggled upvote when given UP_VOTE_THREAD action
 *   - should return the threads with the toggled downvote when given DOWN_VOTE_THREAD action
 *   - should return the threads with the neutralized vote when given NEUTRALIZE_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread Pertama', upVotesBy: [], downVotesBy: [] },
          { id: 'thread-2', title: 'Thread Kedua', upVotesBy: [], downVotesBy: [] },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread prepended when given ADD_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread Pertama', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: { id: 'thread-2', title: 'Thread Kedua', upVotesBy: [], downVotesBy: [] },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled upvote when given UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread Pertama', upVotesBy: [], downVotesBy: ['user-1'] },
    ];
    const action = {
      type: 'UP_VOTE_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toEqual(['user-1']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should return the threads with the toggled downvote when given DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread Pertama', upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].downVotesBy).toEqual(['user-1']);
    expect(nextState[0].upVotesBy).toEqual([]);
  });

  it('should return the threads with the neutralized vote when given NEUTRALIZE_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread Pertama', upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual([]);
  });
});
