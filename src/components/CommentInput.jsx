import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();

    if (content.trim() === '') {
      alert('Komentar tidak boleh kosong.');
      return;
    }

    addComment(content);
    setContent('');
  }

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <h3>Beri Komentar</h3>
      <textarea
        placeholder="Tuliskan komentar Anda..."
        value={content}
        onChange={onContentChange}
        rows={4}
      />
      <button type="submit" className="button button--primary">Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
