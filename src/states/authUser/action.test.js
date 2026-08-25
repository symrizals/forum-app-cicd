/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

const fakeToken = 'fake-token';
const fakeAuthUser = {
  id: 'user-1',
  name: 'Syamsul',
  email: 'syamsul@example.com',
};
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    vi.spyOn(api, 'login').mockResolvedValue(fakeToken);
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeAuthUser);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: fakeAuthUser.email, password: 'secret' })(dispatch);

    // assert
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    vi.spyOn(api, 'login').mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();

    // action & assert
    await expect(
      asyncSetAuthUser({ email: fakeAuthUser.email, password: 'wrong' })(dispatch),
    ).rejects.toThrow(fakeErrorResponse);
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
