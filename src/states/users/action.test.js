/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *   - should call api.register with the correct payload when registering success
 *   - should throw an error when registering failed
 */

import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeRegisterInput = {
  name: 'Syamsul',
  email: 'syamsul@example.com',
  password: 'secret',
};
const fakeErrorResponse = new Error('email is already taken');

describe('asyncRegisterUser thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call api.register with the correct payload when registering success', async () => {
    // arrange
    vi.spyOn(api, 'register').mockResolvedValue({ id: 'user-1', ...fakeRegisterInput });
    const dispatch = vi.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(api.register).toHaveBeenCalledWith(fakeRegisterInput);
  });

  it('should throw an error when registering failed', async () => {
    // arrange
    vi.spyOn(api, 'register').mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();

    // action & assert
    await expect(asyncRegisterUser(fakeRegisterInput)(dispatch)).rejects.toThrow(fakeErrorResponse);
  });
});
