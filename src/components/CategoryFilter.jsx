import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filter">
      <span className="category-filter__label">Kategori Populer</span>
      <div className="category-filter__list">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip ${selectedCategory === category ? 'category-chip--active' : ''}`}
            onClick={() => onSelectCategory(
              selectedCategory === category ? '' : category,
            )}
          >
            #
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
