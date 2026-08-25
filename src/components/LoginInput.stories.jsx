import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
  argTypes: {
    login: { action: 'login' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 360, margin: '0 auto' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  args: {},
};
