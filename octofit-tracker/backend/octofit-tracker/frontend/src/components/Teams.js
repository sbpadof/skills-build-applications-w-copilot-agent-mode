import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API Endpoint:', apiUrl);
        console.log('Fetched Teams:', results);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, [apiUrl]);

  return (
    <div className="mt-4">
      <h2 className="mb-3">Teams</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team._id || idx}>
                  <td>{team.name}</td>
                  <td>{team.members ? team.members.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mt-2">Create Team</button>
        </div>
      </div>
    </div>
  );
};

export default Teams;
