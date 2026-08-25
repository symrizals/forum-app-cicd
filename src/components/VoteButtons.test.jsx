/**
 * skenario test
 *
 * - VoteButtons component
 *   - should display the up and down vote counts correctly
 *   - should call onUpVote when the like button is clicked and the user has not upvoted
 *   - should call onNeutralizeVote when the like button is clicked and the user has already upvoted
 *   - should call onDownVote when the dislike button is clicked and the user has not downvoted
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import VoteButtons from './VoteButtons';

const noop = () => {};

describe('VoteButtons component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display the up and down vote counts correctly', () => {
    // arrange
    render(
      <VoteButtons
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-9"
        onUpVote={noop}
        onDownVote={noop}
        onNeutralizeVote={noop}
      />,
    );

    // assert
    expect(screen.getByLabelText('Suka')).toHaveTextContent('2');
    expect(screen.getByLabelText('Tidak suka')).toHaveTextContent('1');
  });

  it('should call onUpVote when the like button is clicked and the user has not upvoted', async () => {
    // arrange
    const onUpVote = vi.fn();
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={onUpVote}
        onDownVote={noop}
        onNeutralizeVote={noop}
      />,
    );

    // action
    await userEvent.click(screen.getByLabelText('Suka'));

    // assert
    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onNeutralizeVote when the like button is clicked and the user has already upvoted', async () => {
    // arrange
    const onNeutralizeVote = vi.fn();
    render(
      <VoteButtons
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={noop}
        onDownVote={noop}
        onNeutralizeVote={onNeutralizeVote}
      />,
    );

    // action
    await userEvent.click(screen.getByLabelText('Suka'));

    // assert
    expect(onNeutralizeVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote when the dislike button is clicked and the user has not downvoted', async () => {
    // arrange
    const onDownVote = vi.fn();
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={noop}
        onDownVote={onDownVote}
        onNeutralizeVote={noop}
      />,
    );

    // action
    await userEvent.click(screen.getByLabelText('Tidak suka'));

    // assert
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });
});
