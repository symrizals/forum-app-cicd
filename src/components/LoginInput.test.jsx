/**
 * skenario test
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function with the email and password when the form is submitted
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // action
    await userEvent.type(emailInput, 'syamsul@example.com');

    // assert
    expect(emailInput).toHaveValue('syamsul@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByLabelText('Kata Sandi');

    // action
    await userEvent.type(passwordInput, 'secret123');

    // assert
    expect(passwordInput).toHaveValue('secret123');
  });

  it('should call login function with the email and password when the form is submitted', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    await userEvent.type(screen.getByLabelText('Email'), 'syamsul@example.com');
    await userEvent.type(screen.getByLabelText('Kata Sandi'), 'secret123');

    // action
    await userEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'syamsul@example.com',
      password: 'secret123',
    });
  });
});
