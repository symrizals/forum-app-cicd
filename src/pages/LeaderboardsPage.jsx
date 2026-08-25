import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboards-page">
      <h1>Klasemen Pengguna Aktif</h1>
      <div className="leaderboards">
        <div className="leaderboards__header">
          <span>Peringkat</span>
          <span>Pengguna</span>
          <span>Skor</span>
        </div>
        {leaderboards.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            rank={index + 1}
            user={item.user}
            score={item.score}
          />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardsPage;
