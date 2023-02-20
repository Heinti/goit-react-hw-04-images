import { useState } from 'react';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit, isSubmiting }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="SearchForm-button"
          disabled={isSubmiting}
        >
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
};
