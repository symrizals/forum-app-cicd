/**
 * skenario test
 *
 * - isPreloadReducer function
 *   - should return the initial state (true) when given an unknown action
 *   - should return the isPreload value when given SET_IS_PRELOAD action
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state (true) when given an unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(undefined, action);

    // assert
    expect(nextState).toBe(true);
  });

  it('should return the isPreload value when given SET_IS_PRELOAD action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: { isPreload: false },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toBe(false);
  });
});
