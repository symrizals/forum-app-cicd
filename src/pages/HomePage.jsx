import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import ThreadList from '../components/ThreadList';
import CategoryFilter from '../components/CategoryFilter';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = useMemo(() => threads.map((thread) => ({
    ...thread,
    ownerName: users.find((user) => user.id === thread.ownerId)?.name ?? 'Pengguna',
  })), [threads, users]);

  const categories = useMemo(
    () => [...new Set(threads.map((thread) => thread.category))],
    [threads],
  );

  const filteredThreads = selectedCategory === ''
    ? threadList
    : threadList.filter((thread) => thread.category === selectedCategory);

  function onUpVote(id) {
    dispatch(asyncUpVoteThread(id));
  }

  function onDownVote(id) {
    dispatch(asyncDownVoteThread(id));
  }

  function onNeutralizeVote(id) {
    dispatch(asyncNeutralizeVoteThread(id));
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1>Diskusi Tersedia</h1>
        <Link to="/threads/new" className="button button--primary">
          <FiPlus aria-hidden="true" />
          {' '}
          Buat Diskusi
        </Link>
      </header>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ThreadList
        threads={filteredThreads}
        authUserId={authUser?.id}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralizeVote={onNeutralizeVote}
      />
    </div>
  );
}

export default HomePage;
