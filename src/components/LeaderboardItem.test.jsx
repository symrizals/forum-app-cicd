/**
 * skenario test
 *
 * - LeaderboardItem component
 *   - should render the rank, user name, and score correctly
 *   - should render the user avatar with a proper alt text
 */

import React from 'react';
import {
  describe, it, expect, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeaderboardItem from './LeaderboardItem';

const fakeUser = {
  name: 'Syamsul Rizal',
  avatar: 'https://example.com/avatar.png',
};

describe('LeaderboardItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the rank, user name, and score correctly', () => {
    // arrange
    render(<LeaderboardItem rank={1} user={fakeUser} score={45} />);

    // assert
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Syamsul Rizal')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('should render the user avatar with a proper alt text', () => {
    // arrange
    render(<LeaderboardItem rank={2} user={fakeUser} score={30} />);

    // assert
    const avatar = screen.getByAltText('Syamsul Rizal');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', fakeUser.avatar);
  });
});
