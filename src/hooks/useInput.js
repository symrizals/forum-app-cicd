import { useState } from 'react';

/**
 * Custom hook untuk mengelola state pada controlled input.
 *
 * @param {string} defaultValue - nilai awal input
 * @returns {[string, function]} pasangan nilai dan handler perubahan
 */
function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  return [value, handleValueChange, setValue];
}

export default useInput;
