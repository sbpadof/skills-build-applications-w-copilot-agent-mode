import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard API Endpoint:', apiUrl);
        console.log('Fetched Leaderboard:', results);
      });
  }, [apiUrl]);

  return (
    <div className="mt-4">
      <h2 className="mb-3">Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry._id || idx}>
                  <td>{entry.team_id}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mt-2">Refresh Leaderboard</button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
