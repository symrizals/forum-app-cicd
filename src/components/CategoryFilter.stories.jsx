import CategoryFilter from './CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  argTypes: {
    onSelectCategory: { action: 'onSelectCategory' },
  },
};

export const Default = {
  args: {
    categories: ['redux', 'react', 'javascript'],
    selectedCategory: '',
  },
};

export const WithActiveCategory = {
  args: {
    categories: ['redux', 'react', 'javascript'],
    selectedCategory: 'redux',
  },
};
