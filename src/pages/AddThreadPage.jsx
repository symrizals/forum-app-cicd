import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onAddThread({ title, body, category }) {
    try {
      await dispatch(asyncAddThread({ title, body, category }));
      navigate('/');
    } catch {
      // error sudah ditangani di thunk (alert)
    }
  }

  return (
    <div className="add-thread-page">
      <ThreadInput addThread={onAddThread} />
    </div>
  );
}

export default AddThreadPage;
