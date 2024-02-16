import React, { useState } from 'react';
import './App.css';

function Bracket({ numTeams }) {
  const [teams, setTeams] = useState(Array(numTeams).fill('').map((_, index) => `Team ${String.fromCharCode(65 + index)}`));
  const [rounds, setRounds] = useState(Math.log2(numTeams));
  const [winners, setWinners] = useState(Array(rounds).fill(''));
  const [champion, setChampion] = useState('');

  const handleTeamClick = (roundIndex, matchIndex, team) => {
    return () => {
      const newTeams = [...teams];
      // Update the selected team name for the next round matchup
      const nextRoundIndex = roundIndex + 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextTeamIndex = matchIndex % 2 === 0 ? 0 : 1;
      newTeams[nextMatchIndex * 2 + nextTeamIndex] = team;
      setTeams(newTeams);
    };
  };

  const handleWinnerClick = (roundIndex, matchIndex, team) => {
    return () => {
      if (teams[matchIndex * 2] && teams[matchIndex * 2 + 1]) {
        const newWinners = [...winners];
        newWinners[roundIndex] = team;
        setWinners(newWinners);
      }
    };
  };

  const handleChampionClick = () => {
    if (winners[0] && winners[1]) {
      const winningTeam = Math.random() < 0.5 ? winners[0] : winners[1];
      setChampion(winningTeam);
    }
  };

  const resetBracket = () => {
    setTeams(Array(numTeams).fill('').map((_, index) => `Team ${String.fromCharCode(65 + index)}`));
    setWinners(Array(rounds).fill(''));
    setChampion('');
  };

  return (
    <div className="bracket">
      {[...Array(rounds)].map((_, roundIndex) => (
        <div className="round" key={roundIndex}>
          {[...Array(Math.pow(2, rounds - roundIndex - 1))].map((_, matchIndex) => (
            <div className="match" key={matchIndex}>
               <div className="team" onClick={handleTeamClick(matchIndex * 2, 'Team A')}>
                {roundIndex === 0 ? (teams[matchIndex * 2] || 'Team A') : 'Empty'}
              </div>
              <div className="team" onClick={handleWinnerClick(roundIndex, matchIndex)}>
                {roundIndex === 0 ? (teams[matchIndex * 2 + 1] || 'Team B') : 'Empty'}
              </div>
              {roundIndex === rounds - 1 && (
                <div className="winner" onClick={handleWinnerClick(roundIndex, matchIndex)}>
                  {winners[roundIndex] ? `Winner: ${winners[roundIndex]}` : 'Click to determine winner'}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="champion" onClick={handleChampionClick}>
        {champion ? `Champion: ${champion}` : 'Click to determine champion'}
      </div>
      <button onClick={resetBracket}>Reset Bracket</button>
    </div>
  );
}

function App() {
  const numTeams = 8; // Change this value to set the number of teams
  return (
    <div className="App">
      <h1>{`${numTeams} Team Bracket`}</h1>
      <Bracket numTeams={numTeams} />
    </div>
  );
}

export default App;
