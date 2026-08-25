/**
 * skenario test
 *
 * - CategoryFilter component
 *   - should render nothing when there are no categories
 *   - should render all category chips
 *   - should call onSelectCategory with the category when an inactive chip is clicked
 *   - should call onSelectCategory with an empty string when the active chip is clicked (toggle off)
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render nothing when there are no categories', () => {
    // arrange
    const { container } = render(
      <CategoryFilter categories={[]} selectedCategory="" onSelectCategory={() => {}} />,
    );

    // assert
    expect(container).toBeEmptyDOMElement();
  });

  it('should render all category chips', () => {
    // arrange
    render(
      <CategoryFilter
        categories={['redux', 'react']}
        selectedCategory=""
        onSelectCategory={() => {}}
      />,
    );

    // assert
    expect(screen.getByRole('button', { name: '#redux' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument();
  });

  it('should call onSelectCategory with the category when an inactive chip is clicked', async () => {
    // arrange
    const onSelectCategory = vi.fn();
    render(
      <CategoryFilter
        categories={['redux', 'react']}
        selectedCategory=""
        onSelectCategory={onSelectCategory}
      />,
    );

    // action
    await userEvent.click(screen.getByRole('button', { name: '#redux' }));

    // assert
    expect(onSelectCategory).toHaveBeenCalledWith('redux');
  });

  it('should call onSelectCategory with an empty string when the active chip is clicked (toggle off)', async () => {
    // arrange
    const onSelectCategory = vi.fn();
    render(
      <CategoryFilter
        categories={['redux', 'react']}
        selectedCategory="redux"
        onSelectCategory={onSelectCategory}
      />,
    );

    // action
    await userEvent.click(screen.getByRole('button', { name: '#redux' }));

    // assert
    expect(onSelectCategory).toHaveBeenCalledWith('');
  });
});
