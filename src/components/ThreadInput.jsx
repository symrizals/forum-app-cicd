import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === '' || body.trim() === '') {
      alert('Judul dan isi diskusi wajib diisi.');
      return;
    }

    addThread({ title, body, category });
  }

  return (
    <form className="thread-input" onSubmit={handleSubmit}>
      <h2>Buat Diskusi Baru</h2>
      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          type="text"
          placeholder="Judul diskusi"
          value={title}
          onChange={onTitleChange}
          maxLength={80}
        />
        <small>{`${title.length}/80 karakter`}</small>
      </div>
      <div className="form-group">
        <label htmlFor="category">Kategori (opsional)</label>
        <input
          id="category"
          type="text"
          placeholder="Contoh: react, redux"
          value={category}
          onChange={onCategoryChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Isi Diskusi</label>
        <textarea
          id="body"
          placeholder="Tuliskan isi diskusi Anda di sini..."
          value={body}
          onChange={onBodyChange}
          rows={8}
        />
      </div>
      <button type="submit" className="button button--primary">Buat Diskusi</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
