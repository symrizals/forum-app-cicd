import VoteButtons from './VoteButtons';

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'onUpVote' },
    onDownVote: { action: 'onDownVote' },
    onNeutralizeVote: { action: 'onNeutralizeVote' },
  },
};

export const Default = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: ['user-3'],
    authUserId: 'user-9',
  },
};

export const AlreadyUpVoted = {
  args: {
    upVotesBy: ['user-1'],
    downVotesBy: [],
    authUserId: 'user-1',
  },
};

export const AlreadyDownVoted = {
  args: {
    upVotesBy: [],
    downVotesBy: ['user-1'],
    authUserId: 'user-1',
  },
};
