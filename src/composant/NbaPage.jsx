import {useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import {GET_TEAMS} from "../graphql/queries";

function NbaPage() {
  const [teams, setTeams] = useState();
  const { loading, error, data } = useQuery(GET_TEAMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      <h2>Nba</h2>
      {data.teams?.map((team) => (
        <li>{team.name}</li>
      ))}
    </div>
  );
}

export default NbaPage;