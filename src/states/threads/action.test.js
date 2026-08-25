/**
 * skenario test
 *
 * - asyncAddThread thunk
 *   - should dispatch action correctly when creating thread success
 * - asyncUpVoteThread thunk
 *   - should dispatch the optimistic upvote action when user is authenticated
 *   - should rollback with neutralize action and alert when the API call failed
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import api from '../../utils/api';
import {
  asyncAddThread,
  asyncUpVoteThread,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
} from './action';

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Baru',
  body: 'Isi thread',
  category: 'umum',
  upVotesBy: [],
  downVotesBy: [],
};
const fakeAuthUser = { id: 'user-1' };
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when creating thread success', async () => {
    // arrange
    vi.spyOn(api, 'createThread').mockResolvedValue(fakeThread);
    const dispatch = vi.fn();

    // action
    await asyncAddThread({
      title: fakeThread.title,
      body: fakeThread.body,
      category: fakeThread.category,
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
  });
});

describe('asyncUpVoteThread thunk', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch the optimistic upvote action when user is authenticated', async () => {
    // arrange
    vi.spyOn(api, 'upVoteThread').mockResolvedValue({});
    const dispatch = vi.fn();
    const getState = () => ({ authUser: fakeAuthUser });

    // action
    await asyncUpVoteThread(fakeThread.id)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId: fakeThread.id, userId: fakeAuthUser.id }),
    );
    expect(api.upVoteThread).toHaveBeenCalledWith(fakeThread.id);
  });

  it('should rollback with neutralize action and alert when the API call failed', async () => {
    // arrange
    vi.spyOn(api, 'upVoteThread').mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();
    const getState = () => ({ authUser: fakeAuthUser });

    // action
    await asyncUpVoteThread(fakeThread.id)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId: fakeThread.id, userId: fakeAuthUser.id }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteThreadActionCreator({ threadId: fakeThread.id, userId: fakeAuthUser.id }),
    );
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
