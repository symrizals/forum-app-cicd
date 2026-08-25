/**
 * skenario test
 *
 * - leaderboardsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the leaderboards when given RECEIVE_LEADERBOARDS action
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
          { user: { id: 'user-1', name: 'Syamsul' }, score: 40 },
          { user: { id: 'user-2', name: 'Hania' }, score: 25 },
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
