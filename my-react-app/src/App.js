import React, { useState } from 'react';
import './App.css';

function Bracket({ numTeams }) {
  const [teams, setTeams] = useState(Array(numTeams).fill('').map((_, index) => `Team ${String.fromCharCode(65 + index)}`));
  const [rounds, setRounds] = useState(Math.log2(numTeams));
  const [winners, setWinners] = useState(Array(rounds).fill(''));
  const [champion, setChampion] = useState('');

  // Function to initialize the matchups for each round
  const initializeMatchups = () => {
    const matchups = [];
    let teamsPerRound = numTeams;

    const roundMatchups = [];
    for (let j = 0; j < teamsPerRound; j += 2) {
      roundMatchups.push([teams[j], teams[j + 1]]);
    }
    matchups.push(roundMatchups);
    teamsPerRound /= 2;

    for (let i = 1; i < rounds; i++) {
      const roundMatchups = [];
      for (let j = 0; j < teamsPerRound; j += 2) {
        roundMatchups.push(["Empty", "Empty"]);
      }
      matchups.push(roundMatchups);
      teamsPerRound /= 2;
    }
    return matchups;
  };

  const [matchups, setMatchups] = useState(initializeMatchups());

  const handleTeamClick = (roundIndex, matchIndex, teamIndex) => {
    return () => {
      if (roundIndex === rounds - 1) {
        setChampion(matchups[roundIndex][matchIndex][teamIndex]);
      } else {
        const newMatchups = [...matchups];
        const oldWinner = newMatchups[roundIndex + 1][Math.floor(matchIndex / 2)][matchIndex % 2]
        newMatchups[roundIndex + 1][Math.floor(matchIndex / 2)][matchIndex % 2] = newMatchups[roundIndex][matchIndex][teamIndex];
        if(oldWinner !== "Empty"){
          roundIndex = roundIndex + 1;
          matchIndex = Math.floor(matchIndex / 2);
          matchIndex = matchIndex % 2;
          while(roundIndex !== rounds - 1 && newMatchups[roundIndex + 1][Math.floor(matchIndex / 2)][matchIndex % 2] === oldWinner){
            newMatchups[roundIndex + 1][Math.floor(matchIndex / 2)][matchIndex % 2] = "Empty";
            roundIndex = roundIndex + 1;
            matchIndex = Math.floor(matchIndex / 2);
            matchIndex = matchIndex % 2;
          }
        }
        setMatchups(newMatchups);
      }
    };
  };

  const resetBracket = () => {
    setChampion('');
    setMatchups(initializeMatchups());
  };

  return (
    <div className="bracket">
      {matchups.map((roundMatchups, roundIndex) => (
        <div className="round" key={roundIndex}>
          {roundMatchups.map((matchup, matchIndex) => (
            <div className="match" style={{ marginTop: `${11 * ((roundIndex + 1) * (roundIndex + 1) - 1)}px`, marginBottom: `${11 * ((roundIndex + 1) * (roundIndex + 1) - 1)}px`}} key={matchIndex}>
              {matchup.map((team, teamIndex) => (
                <div className="team" key={teamIndex} onClick={handleTeamClick(roundIndex, matchIndex, teamIndex)}>
                  {team || `Team ${teamIndex + 1}`}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="champion">
        {champion ? `Champion: ${champion}` : 'Click to determine champion'}
      </div>
      <button onClick={resetBracket}>Reset Bracket</button>
    </div>
  );
}

function App() {
  const numTeams = 16; // Change this value to set the number of teams
  return (
    <div className="App">
      <h1>{`${numTeams} Team Bracket`}</h1>
      <Bracket numTeams={numTeams} />
    </div>
  );
}

export default App;
