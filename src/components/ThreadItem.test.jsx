/**
 * skenario test
 *
 * - ThreadItem component
 *   - should render the thread title, category, owner, and comment count correctly
 *   - should call onUpVote with the thread id when the like button is clicked
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ThreadItem from './ThreadItem';

const noop = () => {};

const fakeThread = {
  id: 'thread-1',
  title: 'Diskusi React Testing',
  body: '<p>Isi diskusi tentang pengujian komponen React.</p>',
  category: 'react',
  createdAt: '2026-08-26T00:00:00.000Z',
  ownerName: 'Syamsul',
  totalComments: 3,
  upVotesBy: [],
  downVotesBy: [],
};

function renderThreadItem(overrides = {}) {
  const props = {
    id: fakeThread.id,
    title: fakeThread.title,
    body: fakeThread.body,
    category: fakeThread.category,
    createdAt: fakeThread.createdAt,
    ownerName: fakeThread.ownerName,
    totalComments: fakeThread.totalComments,
    upVotesBy: fakeThread.upVotesBy,
    downVotesBy: fakeThread.downVotesBy,
    authUserId: 'user-9',
    onUpVote: noop,
    onDownVote: noop,
    onNeutralizeVote: noop,
    ...overrides,
  };

  return render(
    <MemoryRouter>
      <ThreadItem
        id={props.id}
        title={props.title}
        body={props.body}
        category={props.category}
        createdAt={props.createdAt}
        ownerName={props.ownerName}
        totalComments={props.totalComments}
        upVotesBy={props.upVotesBy}
        downVotesBy={props.downVotesBy}
        authUserId={props.authUserId}
        onUpVote={props.onUpVote}
        onDownVote={props.onDownVote}
        onNeutralizeVote={props.onNeutralizeVote}
      />
    </MemoryRouter>,
  );
}

describe('ThreadItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the thread title, category, owner, and comment count correctly', () => {
    // arrange
    renderThreadItem();

    // assert
    expect(screen.getByText('Diskusi React Testing')).toBeInTheDocument();
    expect(screen.getByText(/react/)).toBeInTheDocument();
    expect(screen.getByText('Syamsul')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should call onUpVote with the thread id when the like button is clicked', async () => {
    // arrange
    const onUpVote = vi.fn();
    renderThreadItem({ onUpVote });

    // action
    await userEvent.click(screen.getByLabelText('Suka'));

    // assert
    expect(onUpVote).toHaveBeenCalledTimes(1);
    expect(onUpVote).toHaveBeenCalledWith('thread-1');
  });
});
