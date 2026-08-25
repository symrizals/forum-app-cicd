/**
 * skenario test
 *
 * - authUserReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the auth user when given SET_AUTH_USER action
 *   - should return null when given UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the auth user when given SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: { id: 'user-1', name: 'Syamsul', email: 'syamsul@example.com' },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = { id: 'user-1', name: 'Syamsul', email: 'syamsul@example.com' };
    const action = { type: 'UNSET_AUTH_USER', payload: { authUser: null } };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });
});
